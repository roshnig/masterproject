import App from "./App";
import { render } from "@testing-library/react";
import { TestWrapper } from "./tests/mocks/testWrapper";

describe("App routing", () => {
  it("renders app when unauthenticated", () => {
    const app = render(
      <TestWrapper route='/login'>
        <App />
      </TestWrapper>,
    );
    expect(app).toBeTruthy();
  });

  it("renders app when authenticated", () => {
    const app = render(
      <TestWrapper route='/framework'>
        <App />
      </TestWrapper>,
    );
    expect(app).toBeTruthy();
  });
});

// import { renderWithProviders } from "./tests/test-utils";
// import App from "./App";

// describe("App routing", () => {
//   it("renders app when unauthenticated", () => {
//     const app = renderWithProviders(<App />, {
//       route: "/login",
//       auth: { isAuthenticated: false },
//     });
//     expect(app).toBeTruthy();
//   });

//   it("renders app when authenticated", () => {
//     const app = renderWithProviders(<App />, {
//       route: "/",
//       auth: { isAuthenticated: true },
//     });
//     expect(app).toBeTruthy();
//   });

//   it("navigates to dashboard page if user is already authenticated", () => {
//     renderWithProviders(<App />, {
//       route: "/login",
//       auth: { isAuthenticated: true },
//     });
//     expect(window.location.pathname).not.toBe("/login");
//     expect(window.location.pathname).toBe("/");
//   });
// });
