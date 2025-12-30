import { TestWrapper } from "@/tests/mocks/testWrapper";
import Inventory from "./Inventory";
import { render, screen } from "@testing-library/react";

describe("Inventory page", () => {
  it("renders Inventory page", () => {
    const comp = render(
      <TestWrapper route='/inventory'>
        <Inventory />
      </TestWrapper>,
    );

    expect(comp).toBeTruthy();
    expect(screen.getByText("Inventory page!")).toBeInTheDocument();
  });
});

// import { renderWithProviders, screen } from "../../tests/test-utils";
// import Inventory from "./Inventory";

// describe("Inventory page", () => {
//   it("renders Inventory page", () => {
//     const comp = renderWithProviders(<Inventory />, {
//       route: "/inventory",
//       auth: { isAuthenticated: true },
//     });
//     expect(comp).toBeTruthy();
//     expect(screen.getByText("Inventory page!")).toBeInTheDocument();
//   });
// });
