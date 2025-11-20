import fs from "fs";
import path from "path";

/**
 * Extract all CSS variable declarations from an SCSS/CSS file.
 */
export function extractCssVars(filePath: string): Record<string, string> {
  const file = fs.readFileSync(path.resolve(filePath), "utf8");

  //* Matches things like: --primary-main: #2196f3; from styles/colors.scss file
  const regex = /--([\w-]+)\s*:\s*([^;]+);/g;

  const vars: Record<string, string> = {};
  let match;

  while ((match = regex.exec(file)) !== null) {
    const name = `--${match[1]}`;
    const value = match[2].trim();
    vars[name] = value;
  }

  return vars;
}
