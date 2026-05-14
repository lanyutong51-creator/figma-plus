// Figma Component Integrity Audit
// Run through use_figma after loading figma:figma-use.
// Returns a JSON summary for source-instance linkage and variant integrity decisions.

(async () => {
const MAX_ITEMS = 200;

function shortNode(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    page: getPageName(node),
    width: "width" in node ? Math.round(node.width) : null,
    height: "height" in node ? Math.round(node.height) : null,
    childCount: "children" in node && node.children ? node.children.length : 0,
  };
}

function getPage(node) {
  let current = node;
  while (current && current.type !== "PAGE") current = current.parent;
  return current || null;
}

function getPageName(node) {
  const page = getPage(node);
  return page ? page.name : null;
}

function walk(node, visit) {
  visit(node);
  if ("children" in node && node.children) {
    for (const child of node.children) walk(child, visit);
  }
}

function pageSignals(name) {
  const lower = name.toLowerCase();
  return {
    componentPage: ["component", "components", "组件", "foundation"].some((s) => lower.includes(s)),
    baselinePage: ["baseline", "editable", "design", "screen", "主界面", "正式", "设计"].some((s) => lower.includes(s)),
    archivePage: ["archive", "old", "history", "归档", "历史"].some((s) => lower.includes(s)),
  };
}

function variantInfo(componentSet) {
  const groupProps = componentSet.variantGroupProperties || {};
  const children = "children" in componentSet ? componentSet.children.filter((child) => child.type === "COMPONENT") : [];
  return {
    groupProperties: groupProps,
    variants: children.map((child) => ({
      id: child.id,
      name: child.name,
      width: Math.round(child.width),
      height: Math.round(child.height),
      variantProperties: child.variantProperties || {},
    })),
  };
}

function isWeakVariantName(value) {
  return /^(property\s*\d+|variant|type|类型|属性\s*\d*)$/i.test(value || "");
}

function variantFindings(componentSet) {
  const info = variantInfo(componentSet);
  const findings = [];
  const propNames = Object.keys(info.groupProperties);
  if (propNames.length === 0) {
    findings.push({ priority: "P1", type: "missing-variant-properties", message: "Component set has no variantGroupProperties." });
  }
  for (const name of propNames) {
    if (isWeakVariantName(name)) {
      findings.push({ priority: "P2", type: "weak-variant-property-name", message: `Weak variant property name: ${name}` });
    }
  }
  const variantPropValues = info.variants.flatMap((variant) => Object.entries(variant.variantProperties || {}));
  for (const [name, value] of variantPropValues) {
    if (isWeakVariantName(name) || /^(variant\s*\d+|default\s*\d*|\d+)$/i.test(String(value))) {
      findings.push({ priority: "P2", type: "weak-variant-value", message: `Weak variant property/value: ${name}=${value}` });
    }
  }
  const sizes = new Set(info.variants.map((variant) => `${variant.width}x${variant.height}`));
  const hasSizeDimension = propNames.some((name) => /size|尺寸|大小/i.test(name));
  if (sizes.size > 1 && !hasSizeDimension) {
    findings.push({ priority: "P2", type: "inconsistent-variant-geometry", message: "Variants have different dimensions but no explicit size dimension." });
  }
  const hasStateDimension = propNames.some((name) => /state|状态|status|selected|active/i.test(name));
  const stateNameSignals = info.variants.some((variant) => /hover|pressed|selected|active|disabled|error|focus|默认|悬停|按下|选中|禁用|错误|聚焦/i.test(variant.name));
  if (stateNameSignals && !hasStateDimension) {
    findings.push({ priority: "P2", type: "state-signals-without-state-property", message: "Variant names mention states but no state property exists." });
  }
  return findings;
}

function signature(node) {
  const parts = [];
  const maxChildren = 12;
  if (!("children" in node) || !node.children) return `${node.type}:${Math.round(node.width || 0)}x${Math.round(node.height || 0)}:leaf`;
  for (const child of node.children.slice(0, maxChildren)) {
    parts.push(`${child.type}:${Math.round(child.width || 0)}x${Math.round(child.height || 0)}`);
  }
  return `${node.type}:${Math.round(node.width || 0)}x${Math.round(node.height || 0)}:${parts.join("|")}`;
}

const pages = figma.root.children.map((page) => ({
  id: page.id,
  name: page.name,
  signals: pageSignals(page.name),
}));

const components = [];
const componentSets = [];
const instances = [];
const repeatedCandidatesBySignature = new Map();

for (const page of figma.root.children) {
  walk(page, (node) => {
    if (node.type === "COMPONENT") components.push(node);
    if (node.type === "COMPONENT_SET") componentSets.push(node);
    if (node.type === "INSTANCE") instances.push(node);
    if ((node.type === "FRAME" || node.type === "GROUP") && "width" in node && "height" in node) {
      if (node.width >= 16 && node.height >= 16 && node.children && node.children.length > 0) {
        const sig = signature(node);
        if (!repeatedCandidatesBySignature.has(sig)) repeatedCandidatesBySignature.set(sig, []);
        repeatedCandidatesBySignature.get(sig).push(node);
      }
    }
  });
}

const componentById = new Map(components.map((component) => [component.id, component]));
const instancesSummary = instances.slice(0, MAX_ITEMS).map((instance) => {
  const main = instance.mainComponent;
  return {
    ...shortNode(instance),
    mainComponent: main ? { id: main.id, name: main.name, page: getPageName(main) } : null,
  };
});

const repeatedCandidates = Array.from(repeatedCandidatesBySignature.entries())
  .filter(([, nodes]) => nodes.length >= 3)
  .slice(0, 80)
  .map(([sig, nodes]) => ({
    signature: sig,
    count: nodes.length,
    pages: Array.from(new Set(nodes.map(getPageName))),
    examples: nodes.slice(0, 8).map(shortNode),
  }));

const componentSetsSummary = componentSets.slice(0, MAX_ITEMS).map((set) => ({
  ...shortNode(set),
  variantInfo: variantInfo(set),
  findings: variantFindings(set),
}));

const sourcePages = pages.filter((page) => page.signals.componentPage);
const designPages = pages.filter((page) => page.signals.baselinePage);

return {
  fileName: figma.root.name,
  pageCount: pages.length,
  pages,
  sourcePages,
  designPages,
  counts: {
    components: components.length,
    componentSets: componentSets.length,
    instances: instances.length,
    repeatedNonInstanceCandidateGroups: repeatedCandidates.length,
  },
  components: components.slice(0, MAX_ITEMS).map(shortNode),
  componentSets: componentSetsSummary,
  instances: instancesSummary,
  repeatedCandidates,
  notes: [
    "Repeated non-instance candidates are heuristic signals based on rough dimensions and child structure.",
    "Confirm visually before replacing detached copies with instances.",
  ],
  generatedAt: new Date().toISOString(),
};
})()
