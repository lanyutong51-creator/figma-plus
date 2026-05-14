// Figma Component Resize Audit
// Run through use_figma after loading figma:figma-use.
// Returns a JSON summary for resize contract decisions.

(async () => {
const MAX_ITEMS = 240;

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

function sizeOf(node) {
  return {
    width: "width" in node ? Math.round(node.width) : null,
    height: "height" in node ? Math.round(node.height) : null,
  };
}

function shortNode(node) {
  return {
    id: node.id,
    name: node.name,
    type: node.type,
    page: getPageName(node),
    ...sizeOf(node),
  };
}

function childResizeSignals(node) {
  const signals = [];
  if (!("children" in node) || !node.children) return signals;
  for (const child of node.children) {
    const base = {
      id: child.id,
      name: child.name,
      type: child.type,
      ...sizeOf(child),
      constraints: "constraints" in child ? child.constraints : null,
      layoutAlign: "layoutAlign" in child ? child.layoutAlign : null,
      layoutGrow: "layoutGrow" in child ? child.layoutGrow : null,
      textAutoResize: child.type === "TEXT" ? child.textAutoResize : null,
    };
    if (child.type === "TEXT" && child.textAutoResize === "NONE") {
      signals.push({ ...base, signal: "fixed-text" });
    }
    if ("constraints" in child && child.constraints) {
      const c = child.constraints;
      if (c.horizontal === "MIN" && c.vertical === "MIN") {
        signals.push({ ...base, signal: "min-min-absolute-child" });
      }
      if (c.horizontal === "SCALE" || c.vertical === "SCALE") {
        signals.push({ ...base, signal: "scale-constraint" });
      }
    }
  }
  return signals.slice(0, 40);
}

function inferContract(node) {
  const name = node.name.toLowerCase();
  const w = "width" in node ? node.width : 0;
  const h = "height" in node ? node.height : 0;
  const ratio = h ? w / h : 0;

  if (/icon|logo|mark|token|piece|cell|dot|badge|符号|图标|棋子|格子|状态点/i.test(node.name)) {
    return { contract: "fixed-size", confidence: "medium", reason: "Name suggests semantic small object." };
  }
  if (/avatar|thumbnail|image|media|photo|cover|头像|缩略图|图片|封面/i.test(node.name)) {
    return { contract: "fixed-aspect", confidence: "medium", reason: "Name suggests media or aspect-ratio object." };
  }
  if (/button|tab|chip|input|search|nav|toolbar|row|按钮|标签|输入|搜索|导航|工具栏|行/i.test(node.name)) {
    return { contract: "horizontal", confidence: "medium", reason: "Name suggests horizontally stretchable control or row." };
  }
  if (/log|comment|list|feed|text panel|日志|评论|列表|文本面板/i.test(node.name)) {
    return { contract: "vertical", confidence: "low", reason: "Name suggests vertically growing content." };
  }
  if (/card|panel|container|shell|empty|modal|section|卡片|面板|容器|空状态|弹窗|区域/i.test(node.name)) {
    return { contract: "full", confidence: "medium", reason: "Name suggests container-like component." };
  }
  if (w <= 64 && h <= 64 && Math.abs(ratio - 1) < 0.25) {
    return { contract: "fixed-size", confidence: "low", reason: "Small near-square component." };
  }
  return { contract: "unclear", confidence: "low", reason: "No strong name or geometry signal." };
}

function variantGeometry(componentSet) {
  const variants = ("children" in componentSet ? componentSet.children : []).filter((child) => child.type === "COMPONENT");
  const sizes = new Map();
  for (const variant of variants) {
    const key = `${Math.round(variant.width)}x${Math.round(variant.height)}`;
    sizes.set(key, (sizes.get(key) || 0) + 1);
  }
  const propNames = Object.keys(componentSet.variantGroupProperties || {});
  const hasSizeProp = propNames.some((name) => /size|尺寸|大小/i.test(name));
  return {
    variantCount: variants.length,
    sizes: Array.from(sizes.entries()).map(([size, count]) => ({ size, count })),
    hasSizeProperty: hasSizeProp,
    sizeRisk: sizes.size > 1 && !hasSizeProp,
  };
}

const components = [];
const componentSets = [];
const instances = [];

for (const page of figma.root.children) {
  walk(page, (node) => {
    if (node.type === "COMPONENT") components.push(node);
    if (node.type === "COMPONENT_SET") componentSets.push(node);
    if (node.type === "INSTANCE") instances.push(node);
  });
}

const instanceByMain = new Map();
for (const instance of instances) {
  const main = instance.mainComponent;
  const key = main ? main.id : "missing-main";
  if (!instanceByMain.has(key)) instanceByMain.set(key, []);
  instanceByMain.get(key).push(instance);
}

function instanceSizeSummary(component) {
  const related = instanceByMain.get(component.id) || [];
  const source = sizeOf(component);
  const sizes = new Map();
  for (const instance of related) {
    const key = `${Math.round(instance.width)}x${Math.round(instance.height)}`;
    sizes.set(key, (sizes.get(key) || 0) + 1);
  }
  const differing = Array.from(sizes.keys()).filter((size) => size !== `${source.width}x${source.height}`);
  return {
    instanceCount: related.length,
    sourceSize: source,
    instanceSizes: Array.from(sizes.entries()).map(([size, count]) => ({ size, count })),
    hasDifferingInstanceSizes: differing.length > 0,
    examples: related.slice(0, 10).map(shortNode),
  };
}

const componentSummaries = components.slice(0, MAX_ITEMS).map((component) => ({
  ...shortNode(component),
  inferredContract: inferContract(component),
  childSignals: childResizeSignals(component),
  instances: instanceSizeSummary(component),
}));

const componentSetSummaries = componentSets.slice(0, MAX_ITEMS).map((set) => ({
  ...shortNode(set),
  inferredContract: inferContract(set),
  variantGeometry: variantGeometry(set),
  childSignals: childResizeSignals(set),
}));

return {
  fileName: figma.root.name,
  counts: {
    components: components.length,
    componentSets: componentSets.length,
    instances: instances.length,
  },
  components: componentSummaries,
  componentSets: componentSetSummaries,
  notes: [
    "Inferred contracts are heuristic. Confirm intended resize behavior before editing source components.",
    "Differing instance sizes can be legitimate for stretchable components; compare against the intended contract.",
  ],
  generatedAt: new Date().toISOString(),
};
})()
