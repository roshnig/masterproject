import { render, screen } from "@testing-library/react";
import Dashboard from "./Dashboard";
import { TestWrapper } from "@/tests/mocks/testWrapper";

describe("Dashboard page", () => {
  it("renders Dashboard page", () => {
    const comp = render(
      <TestWrapper route='/'>
        <Dashboard />
      </TestWrapper>,
    );
    expect(comp).toBeTruthy();
    expect(screen.getByText("Dashboard page!")).toBeInTheDocument();
  });
});
