import { getTheme } from "../themes/index.js";
import { validateDocument } from "./validate.js";

// The body of GET /public/theme, which Core sends and the Catalog app reads:
// { data: { document, preview: null | { name } } }. Returns a list of problems.
export function checkPublicThemeResponse(body) {
  const data = body?.data;
  if (!data || typeof data !== "object") return ["data is missing"];
  const problems = [];
  if (data.preview !== null && typeof data.preview?.name !== "string") {
    problems.push("preview must be null or { name }");
  }
  const theme = getTheme(data.document?.theme);
  if (!theme) {
    problems.push("document.theme must name a known theme");
  } else {
    for (const { path, message } of validateDocument(data.document, theme)
      .errors) {
      problems.push(`document.${path} ${message}`);
    }
  }
  return problems;
}
