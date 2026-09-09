export const enabled = (item) => Boolean(item?.enabled);

export const visible = (items = []) => items.filter((item) => enabled(item));

export const hasValue = (value) => typeof value === "string" && value.trim().length > 0;

export const hasSource = (item, key = "src") => enabled(item) && hasValue(item?.[key]);

export const byId = (items = [], id) => items.find((item) => item.id === id);

export const first = (items = []) => items.find((item) => enabled(item));

export function el(tag, options = {}, children = []) {
  const node = document.createElement(tag);
  const {
    className,
    text,
    attrs = {},
    dataset = {},
    style,
    on = {},
  } = options;

  if (className) node.className = className;
  if (text !== undefined && text !== null) node.textContent = text;
  Object.entries(attrs).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== false) node.setAttribute(key, String(value));
  });
  Object.entries(dataset).forEach(([key, value]) => {
    if (value !== undefined && value !== null) node.dataset[key] = String(value);
  });
  if (style) Object.assign(node.style, style);
  Object.entries(on).forEach(([event, handler]) => node.addEventListener(event, handler));

  const childList = Array.isArray(children) ? children : [children];
  childList.filter(Boolean).forEach((child) => node.append(child));
  return node;
}

export function applyTextStyle(node, style = {}) {
  ["fontSize", "fontFamily", "color", "fontWeight", "lineHeight", "letterSpacing", "textTransform"].forEach((property) => {
    if (hasValue(style[property])) node.style[property] = style[property];
  });
  return node;
}

export function textElement(tag, text, className, style) {
  return applyTextStyle(el(tag, { className, text }), style);
}

export function announce(message) {
  const region = document.querySelector("#live-region");
  if (region) region.textContent = message;
}

export function makeId(prefix = "ui") {
  return `${prefix}-${crypto.getRandomValues(new Uint32Array(1))[0].toString(36)}`;
}

export function scrollToTarget(target) {
  let id; try{id=decodeURIComponent(target.slice(1))}catch{return}
  const node = document.getElementById(id);
  if (node) node.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
}

export function isInternalTarget(value) {
  return hasValue(value) && value.startsWith("#");
}
