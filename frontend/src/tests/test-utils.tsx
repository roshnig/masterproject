import { type ReactElement } from "react";
import { render, type RenderOptions } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  type MemoryRouterProps,
  type RouteObject,
} from "react-router";
import { ThemeProvider } from "../context/themeContext";
import "./mocks/ukic-mock";
import { ProtectedRoute, PublicRoute } from "../routes";
import { AuthProvider } from "../context/AuthContext";

//Mock react-router useNavigate function so components which are using react-router can mock it.
export const mockNavigate = vi.fn();
export const mockHandleLogout = vi.fn();

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
  theme?: "light" | "dark"; //theme mode for testing
  auth?: { isAuthenticated: boolean; handleLogout?: () => Promise<void> }; //add other authContext if required
}

export const renderWithProviders = (
  ui: ReactElement,
  {
    route = "/",
    memoryRouterProps,
    theme = "light",
    auth = { isAuthenticated: true, handleLogout: mockHandleLogout },
    ...options
  }: RenderWithProvidersOptions = {},
) => {
  const routes: RouteObject[] = [
    {
      path: route,
      element: auth.isAuthenticated ? (
        <ProtectedRoute>{ui}</ProtectedRoute>
      ) : (
        ui
      ),
    },
    { path: "/login", element: <PublicRoute>{ui}</PublicRoute> },
    { path: "/signup", element: <PublicRoute>{ui}</PublicRoute> },
  ];

  localStorage.setItem("theme", theme);
  document.documentElement.setAttribute("data-theme", "dark");

  const router = createMemoryRouter(routes, {
    initialEntries: [route],
    ...options,
  });

  return render(
    <AuthProvider {...auth}>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>,
  );
};

//Re-export everything from react testing library
export * from "@testing-library/react";

/* if don't want to test navigation then use this */
// import { type ReactElement } from "react";
// import { render, type RenderOptions } from "@testing-library/react";
// import { MemoryRouter, type MemoryRouterProps } from "react-router";
// import { AppThemeProvider } from "../providers/themeContext";
// import "./mocks/ukic-mock";

// //Mock react-router useNavigate function so components which are using react-router can mock it.
// export const mockNavigate = vi.fn();
// vi.mock("react-router", async () => {
//   const actual = await vi.importActual("react-router");
//   return {
//     ...actual,
//     useNavigate: () => mockNavigate,
//     useLocation: () => vi.fn(),
//   };
// });

// //custom render function for tests
// interface RenderWithProvidersOptions extends Omit<RenderOptions, "wrapper"> {
//   route?: string; //initial route for memory router
//   memoryRouterProps?: Omit<MemoryRouterProps, "children">;
//   mode?: "light" | "dark"; //theme mode for testing
// }

// export const renderWithProviders = (
//   ui: ReactElement,
//   {
//     route = "/",
//     memoryRouterProps,
//     mode,
//     ...options
//   }: RenderWithProvidersOptions = {},
// ) => {
//   return render(ui, {
//     wrapper: ({ children }) => (
//       <AppThemeProvider initialMode={mode}>
//         <MemoryRouter initialEntries={[route]} {...memoryRouterProps}>
//           {children}
//         </MemoryRouter>
//       </AppThemeProvider>
//     ),
//     ...options,
//   });
// };

// //Re-export everything from react testing library
// export * from "@testing-library/react";
