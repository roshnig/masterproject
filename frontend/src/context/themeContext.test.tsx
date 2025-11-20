import { render } from "@testing-library/react";
import { ThemeProvider, useTheme } from "./themeContext";

function TestComponent() {
  useTheme();
  return <div>Mock component</div>;
}

test("useTheme Context throws when used outside ThemeProvider", () => {
  expect(() => render(<TestComponent />)).toThrow(
    "useTheme must be used within an ThemeProvider",
  );
});

test("useTheme Context does not throw when inside ThemeProvider", () => {
  expect(() =>
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>,
    ),
  ).not.toThrow();
});
