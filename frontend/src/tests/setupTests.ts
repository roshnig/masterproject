import { afterEach, vi } from "vitest";
import { cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import path from "path";
import { extractCssVars } from "../utils/extractCssVars";

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

beforeAll(() => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: (query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }),
  });

  //inject CSS variables before mui theme is created.
  const colorsPath = path.resolve("src/styles/_colors.scss");
  const cssVars = extractCssVars(colorsPath);

  function applyCssVars(vars: Record<string, string>) {
    const style = document.documentElement.style;
    for (const [key, value] of Object.entries(vars)) {
      style.setProperty(key, value);
    }
  }
  applyCssVars(cssVars);

  /**
   * If you don't want to use above extractCssVars function, then you need to add colors manually
   * OPTION 1- add line 28-37 (using fs system to read -colors.scss file and converting each color in this format -
   * document.documentElement.style.setProperty('--primary-main', "#64b5f6" )
   * )
   * OPTION 2- manually add colors in below cssVars. uncomment lines 50-83. so whenever, you add a new color in
   * buildMuiTheme function inside theme/muiTheme.ts file, you need to add that color here manually.
   * if you will not add that color then all your tests will fail.
   */

  // const root = document.documentElement.style;

  // const cssVars = {
  //   "--primary-light": "#64b5f6",
  //   "--primary-main": "#2196f3",
  //   "--primary-dark": "#1976d2",

  //   "--secondary-light": "#adb5bd",
  //   "--secondary-main": "#6c757d",
  //   "--secondary-dark": "#495057",

  //   "--success-light": "#81c784",
  //   "--success-main": "#4caf50",
  //   "--success-dark": "#388e3c",

  //   "--error-light": "#e57373",
  //   "--error-main": "#f44336",
  //   "--error-dark": "#d32f2f",

  //   "--warning-light": "#ffd54f",
  //   "--warning-main": "#ffc107",
  //   "--warning-dark": "#ffa000",

  //   "--info-light": "#64b5f6",
  //   "--info-main": "#2196f3",
  //   "--info-dark": "#1976d2",

  //   "--background": "#ffffff",
  //   "--text": "#000000",
  // };

  // Object.entries(cssVars).forEach(([key, val]) => {
  //   root.setProperty(key, val);
  // });
});
