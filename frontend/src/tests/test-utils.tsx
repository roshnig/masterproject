import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router";
import { AppThemeProvider } from "../providers/themeContext";
import "./mocks/ukic-mock";

//Mock react-router useNavigate function so components which are using react-router can mock it.
export const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => vi.fn(),
  };
});

//custom render function for tests
interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string; //initial route for memory router
  memoryRouterProps?: Omit<MemoryRouterProps, "children">;
  mode?: "light" | "dark"; //theme mode for testing
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    route = "/",
    memoryRouterProps,
    mode,
    ...options
  }: RenderWithProvidersOptions = {},
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      <AppThemeProvider initialMode={mode}>
        <MemoryRouter initialEntries={[route]} {...memoryRouterProps}>
          {children}
        </MemoryRouter>
      </AppThemeProvider>
    ),
    ...options,
  });
};

//Re-export everything from react testing library
export * from "@testing-library/react";
