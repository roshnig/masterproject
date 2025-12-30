import { render } from "@testing-library/react";
import PublicLayout from "./PublicLayout";
import { TestWrapper } from "@/tests/mocks/testWrapper";

describe("Public Layout Test", () => {
  it("renders public layout", () => {
    const layout = render(
      <TestWrapper route='/login'>
        <PublicLayout />
      </TestWrapper>,
    );
    expect(layout).toBeTruthy();
  });
});

// import { renderWithProviders } from "../tests/test-utils";

// import PublicLayout from "./PublicLayout";

// describe("Public Layout Test", () => {
//   it("renders public layout", () => {
//     const layout = renderWithProviders(<PublicLayout />, {
//       route: "/login",
//       auth: { isAuthenticated: false },
//     });
//     expect(layout).toBeTruthy();
//   });
// });
