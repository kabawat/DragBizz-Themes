// Small builders for section setting definitions.
export const text = (id, label, value, maxLength = 120) => ({
  id,
  type: "text",
  label,
  maxLength,
  default: value,
});

export const textarea = (id, label, value, maxLength = 400) => ({
  id,
  type: "textarea",
  label,
  maxLength,
  default: value,
});

export const url = (id, label, value) => ({
  id,
  type: "url",
  label,
  default: value,
});

export const image = (id, label, value) => ({
  id,
  type: "image",
  label,
  default: value,
});

export const checkbox = (id, label, value) => ({
  id,
  type: "checkbox",
  label,
  default: value,
});

export const number = (id, label, value, min, max) => ({
  id,
  type: "number",
  label,
  min,
  max,
  default: value,
});

// `labels` names the options in the editor; the stored value is the option itself.
export const select = (id, label, options, value, labels) => ({
  id,
  type: "select",
  label,
  options,
  default: value,
  ...(labels && { labels }),
});

export const color = (id, label) => ({
  id,
  type: "color",
  label,
  default: "",
});

// A menu link can sit inside the main link before it, which then opens a dropdown.
export const menuLevel = select("level", "Show as", ["main", "sub"], "main", {
  main: "Main menu link",
  sub: "Inside the link above (dropdown)",
});

export const linkFields = [
  text("label", "Label", "Link", 60),
  url("link", "Link", "/"),
];
