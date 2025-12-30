import { render, screen } from "@testing-library/react";
import Sales from "./Sales";
import { TestWrapper } from "@/tests/mocks/testWrapper";

describe("Sales page", () => {
  it("renders Sales page", () => {
    const comp = render(
      <TestWrapper route='/sales'>
        <Sales />
      </TestWrapper>,
    );
    expect(comp).toBeTruthy();
    expect(screen.getByText("Sales page!")).toBeInTheDocument();
  });
});

// import { renderWithProviders, screen } from "../../tests/test-utils";
// import Sales from "./Sales";

// describe("Sales page", () => {
//   it("renders Sales page", () => {
//     const comp = renderWithProviders(<Sales />, {
//       route: "/sales",
//       auth: { isAuthenticated: true },
//     });
//     expect(comp).toBeTruthy();
//     expect(screen.getByText("Sales page!")).toBeInTheDocument();
//   });
// });
