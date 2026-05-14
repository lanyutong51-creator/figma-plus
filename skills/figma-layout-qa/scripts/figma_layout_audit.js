// Paste this script into use_figma after replacing __ROOT_NODE_ID__ with the node to audit.
// It returns a structured list of layout risks: clipped text, overflow, invisible nodes,
// zero-size nodes, and suspicious auto-layout omissions.

(async () => {
const ROOT_NODE_ID = "__ROOT_NODE_ID__";

function rectOf(node) {
  if (!("width" in node) || !("height" in node)) return null;
  return { x: node.x || 0, y: node.y || 0, width: node.width || 0, height: node.height || 0 };
}

function hasChildren(node) {
  return "children" in node && Array.isArray(node.children);
}

function isContainer(node) {
  return ["FRAME", "COMPONENT", "COMPONENT_SET", "INSTANCE", "GROUP", "SECTION"].includes(node.type);
}

function isLayoutContainer(node) {
  return ["FRAME", "COMPONENT", "INSTANCE"].includes(node.type);
}

function alphaFromPaints(paints) {
  if (!Array.isArray(paints) || paints.length === 0) return 1;
  const visible = paints.filter((paint) => paint.visible !== false);
  if (visible.length === 0) return 0;
  return Math.max(...visible.map((paint) => paint.opacity == null ? 1 : paint.opacity));
}

function addIssue(issues, priority, type, node, message, suggestion, extra = {}) {
  issues.push({
    priority,
    type,
    nodeId: node.id,
    nodeName: node.name,
    nodeType: node.type,
    message,
    suggestion,
    ...extra,
  });
}

function collect(node, out = []) {
  out.push(node);
  if (hasChildren(node)) {
    for (const child of node.children) collect(child, out);
  }
  return out;
}

function likelyStackName(name) {
  return /(row|column|stack|list|card|toolbar|tabs?|table|grid|items?|menu|form|section|panel)/i.test(name || "");
}

function isInsideInstance(node) {
  let parent = node.parent;
  while (parent) {
    if (parent.type === "INSTANCE") return true;
    parent = parent.parent;
  }
  return false;
}

async function measureText(node) {
  if (isInsideInstance(node)) {
    return { skipped: "inside-instance" };
  }
  try {
    const parent = node.parent && "appendChild" in node.parent ? node.parent : null;
    if (!parent) return { error: "No safe parent available for text measurement clone." };
    const clone = node.clone();
    parent.appendChild(clone);
    clone.x = (node.x || 0) + 10000;
    clone.y = node.y || 0;
    clone.visible = false;
    clone.textAutoResize = "WIDTH_AND_HEIGHT";
    const measured = { width: clone.width, height: clone.height };
    clone.remove();
    return measured;
  } catch (error) {
    return { error: String(error && error.message ? error.message : error) };
  }
}

async function audit(root) {
  const issues = [];
  const nodes = collect(root);

  for (const node of nodes) {
    const rect = rectOf(node);

    if (rect && (rect.width <= 0 || rect.height <= 0)) {
      addIssue(issues, "blocker", "zero-size-node", node, "Node has zero or negative size.", "Resize or remove the node if it is accidental.", { rect });
    }

    if ("visible" in node && node.visible === false) {
      addIssue(issues, "major", "hidden-node", node, "Node is hidden.", "Make it visible if it should appear in the delivered design.");
    }

    if ("opacity" in node && node.opacity === 0) {
      addIssue(issues, "major", "transparent-node", node, "Node opacity is 0.", "Restore opacity if this content should be visible.");
    }

    if ("fills" in node && alphaFromPaints(node.fills) === 0 && node.type !== "FRAME") {
      addIssue(issues, "minor", "transparent-fill", node, "Node has no visible fill paint.", "Confirm this is intentional or apply the expected fill.");
    }

    if (node.type === "TEXT") {
      const measured = await measureText(node);
      if (!measured.error && !measured.skipped) {
        const widthDelta = measured.width - node.width;
        const heightDelta = measured.height - node.height;
        const fixed = node.textAutoResize === "NONE";
        const heightOnly = node.textAutoResize === "HEIGHT";

        if ((fixed || heightOnly) && heightDelta > 1) {
          addIssue(
            issues,
            "blocker",
            "clipped-text-height",
            node,
            `Text needs about ${Math.ceil(measured.height)}px height but node is ${Math.ceil(node.height)}px tall.`,
            "Set textAutoResize to HEIGHT, or increase the parent/container height so all lines render.",
            { measured, current: { width: node.width, height: node.height }, textAutoResize: node.textAutoResize }
          );
        }

        if (fixed && widthDelta > 1) {
          addIssue(
            issues,
            "major",
            "clipped-text-width",
            node,
            `Text needs about ${Math.ceil(measured.width)}px width but node is ${Math.ceil(node.width)}px wide.`,
            "Set textAutoResize to WIDTH_AND_HEIGHT for short labels, or increase width / allow wrapping intentionally.",
            { measured, current: { width: node.width, height: node.height }, textAutoResize: node.textAutoResize }
          );
        }
      } else if (node.textAutoResize === "NONE") {
        addIssue(issues, "minor", "unmeasured-fixed-text", node, "Fixed-size text could not be measured automatically.", "Inspect this node manually in the screenshot.", { measurementError: measured.error });
      }
    }

    if (hasChildren(node) && "clipsContent" in node) {
      for (const child of node.children) {
        const childRect = rectOf(child);
        const parentRect = rectOf(node);
        if (!childRect || !parentRect) continue;
        const overflow =
          childRect.x < -0.5 ||
          childRect.y < -0.5 ||
          childRect.x + childRect.width > parentRect.width + 0.5 ||
          childRect.y + childRect.height > parentRect.height + 0.5;

        if (overflow) {
          addIssue(
            issues,
            node.clipsContent ? "blocker" : "major",
            node.clipsContent ? "child-clipped-by-parent" : "child-overflows-parent",
            child,
            `Child extends outside parent "${node.name}".`,
            node.clipsContent ? "Resize/reposition the child or parent, or disable clipsContent if overflow is intentional." : "Confirm overflow is intentional or resize/reposition for clean layout.",
            {
              parentId: node.id,
              parentName: node.name,
              parentClipsContent: node.clipsContent,
              childRect,
              parentRect,
            }
          );
        }
      }
    }

    if (isLayoutContainer(node) && hasChildren(node) && node.children.length > 1 && node.layoutMode === "NONE" && likelyStackName(node.name)) {
      addIssue(
        issues,
        "minor",
        "suspicious-missing-auto-layout",
        node,
        "Container name suggests repeated/stacked UI but layoutMode is NONE.",
        "Use auto-layout if this is a row, column, list, card, toolbar, table, or form."
      );
    }
  }

  const counts = issues.reduce((acc, issue) => {
    acc[issue.priority] = (acc[issue.priority] || 0) + 1;
    return acc;
  }, { blocker: 0, major: 0, minor: 0 });

  return {
    root: { id: root.id, name: root.name, type: root.type },
    nodeCount: nodes.length,
    counts,
    issues,
  };
}

  const root = await figma.getNodeByIdAsync(ROOT_NODE_ID);
  if (!root) {
    throw new Error(`Could not find Figma node: ${ROOT_NODE_ID}`);
  }

  return await audit(root);
})()
