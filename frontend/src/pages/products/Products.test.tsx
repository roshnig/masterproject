import { render, screen } from "@testing-library/react";
import Products from "./Products";
import { TestWrapper } from "@/tests/mocks/testWrapper";

describe("Products page", () => {
  it("renders Products page", () => {
    const comp = render(
      <TestWrapper route='/products'>
        <Products />
      </TestWrapper>,
    );
    expect(comp).toBeTruthy();
    expect(screen.getByText("Products page!")).toBeInTheDocument();
  });
});

// import { renderWithProviders, screen } from "../../tests/test-utils";
// import Products from "./Products";

// describe("Products page", () => {
//   it("renders Products page", () => {
//     const comp = renderWithProviders(<Products />, {
//       route: "/products",
//       auth: { isAuthenticated: true },
//     });
//     expect(comp).toBeTruthy();
//     expect(screen.getByText("Products page!")).toBeInTheDocument();
//   });
// });
