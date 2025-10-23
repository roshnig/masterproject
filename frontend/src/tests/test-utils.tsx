import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import { MemoryRouter, type MemoryRouterProps } from "react-router";
//import {AppThemeProvider} from '../context/ThemeContext';

//Mock react-router useNavigate function so components which are using react-router can mock it.
export const mockNavigate = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual<any>("react-router");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

//custom render function for tests
interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
  route?: string; //initial route for memory router
  memoryRouterProps?: Omit<MemoryRouterProps, "children">;
  //mode?: "light" | "dark"; //theme mode for testing
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    route = "/",
    memoryRouterProps,
    // mode,
    ...options
  }: RenderWithProvidersOptions = {},
) => {
  return render(ui, {
    wrapper: ({ children }) => (
      // <AppThemeProvider>
      <MemoryRouter initialEntries={[route]} {...memoryRouterProps}>
        {children}
      </MemoryRouter>
      // </AppThemeProvider>
    ),
    ...options,
  });
};

//Re-export everything from react testing library
export * from "@testing-library/react";
