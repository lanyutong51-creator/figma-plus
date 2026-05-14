// Figma File Inventory
// Run through use_figma after loading figma:figma-use.
// Returns a JSON summary for file governance decisions.

(async () => {
const MAX_TOP_LEVEL_NODES = 80;
const MAX_PAGE_COMPONENTS = 120;

function nodeKind(node) {
  return node.type || "UNKNOWN";
}

function shortNode(node) {
  return {
    id: node.id,
    name: node.name,
    type: nodeKind(node),
    visible: "visible" in node ? node.visible : true,
    width: "width" in node ? Math.round(node.width) : null,
    height: "height" in node ? Math.round(node.height) : null,
    childCount: "children" in node && node.children ? node.children.length : 0,
  };
}

function walk(node, visit) {
  visit(node);
  if ("children" in node && node.children) {
    for (const child of node.children) walk(child, visit);
  }
}

function namingSignals(name) {
  const lower = name.toLowerCase();
  const signals = [];
  const checks = [
    ["notes", ["note", "notes", "workflow", "说明", "备注", "规则"]],
    ["baseline", ["baseline", "editable", "source", "主界面", "基准", "正式"]],
    ["components", ["component", "components", "组件", "foundation", "tokens"]],
    ["snapshots", ["snapshot", "snapshots", "capture", "截图", "快照"]],
    ["references", ["reference", "references", "ref", "参考"]],
    ["exploration", ["explore", "exploration", "draft", "草稿", "探索", "方案"]],
    ["archive", ["archive", "archived", "归档", "历史", "old"]],
    ["index", ["index", "索引", "目录"]],
  ];
  for (const [signal, terms] of checks) {
    if (terms.some((term) => lower.includes(term.toLowerCase()))) signals.push(signal);
  }
  return signals;
}

function pageSummary(page) {
  const topLevel = page.children || [];
  const counts = {};
  const componentNames = [];
  const componentSetNames = [];
  const sections = [];
  const looseNodes = [];
  const rootFrames = [];
  let totalNodes = 0;
  let invisibleNodes = 0;
  let zeroSizeNodes = 0;

  for (const node of topLevel) {
    counts[nodeKind(node)] = (counts[nodeKind(node)] || 0) + 1;
    if (node.type === "SECTION") sections.push(shortNode(node));
    if (node.type === "FRAME" || node.type === "COMPONENT" || node.type === "COMPONENT_SET") {
      rootFrames.push(shortNode(node));
    } else if (node.type !== "SECTION") {
      looseNodes.push(shortNode(node));
    }
  }

  walk(page, (node) => {
    totalNodes += 1;
    if ("visible" in node && node.visible === false) invisibleNodes += 1;
    if ("width" in node && "height" in node && (node.width === 0 || node.height === 0)) zeroSizeNodes += 1;
    if (node.type === "COMPONENT" && componentNames.length < MAX_PAGE_COMPONENTS) {
      componentNames.push(node.name);
    }
    if (node.type === "COMPONENT_SET" && componentSetNames.length < MAX_PAGE_COMPONENTS) {
      componentSetNames.push(node.name);
    }
  });

  return {
    id: page.id,
    name: page.name,
    namingSignals: namingSignals(page.name),
    topLevelCount: topLevel.length,
    topLevelCountsByType: counts,
    topLevelPreview: topLevel.slice(0, MAX_TOP_LEVEL_NODES).map(shortNode),
    sections,
    rootFrames: rootFrames.slice(0, MAX_TOP_LEVEL_NODES),
    looseNodes: looseNodes.slice(0, MAX_TOP_LEVEL_NODES),
    totalNodes,
    invisibleNodes,
    zeroSizeNodes,
    componentCount: componentNames.length,
    componentSetCount: componentSetNames.length,
    componentNamesPreview: componentNames.slice(0, 40),
    componentSetNamesPreview: componentSetNames.slice(0, 40),
  };
}

async function collectVariables() {
  if (!figma.variables || !figma.variables.getLocalVariableCollectionsAsync) {
    return { supported: false, collections: [] };
  }
  const collections = await figma.variables.getLocalVariableCollectionsAsync();
  return {
    supported: true,
    collections: collections.map((collection) => ({
      id: collection.id,
      name: collection.name,
      modeCount: collection.modes.length,
      variableIds: collection.variableIds.length,
    })),
  };
}

async function collectStyles() {
  const styleTypes = [
    ["paint", figma.getLocalPaintStylesAsync],
    ["text", figma.getLocalTextStylesAsync],
    ["effect", figma.getLocalEffectStylesAsync],
    ["grid", figma.getLocalGridStylesAsync],
  ];
  const result = {};
  for (const [key, getter] of styleTypes) {
    if (typeof getter === "function") {
      const styles = await getter.call(figma);
      result[key] = styles.map((style) => ({ id: style.id, name: style.name })).slice(0, 120);
      result[`${key}Count`] = styles.length;
    }
  }
  return result;
}

const pages = figma.root.children.map(pageSummary);
const variables = await collectVariables();
const styles = await collectStyles();

const summary = {
  fileName: figma.root.name,
  pageCount: figma.root.children.length,
  pages,
  styles,
  variables,
  generatedAt: new Date().toISOString(),
};

return summary;
})()
