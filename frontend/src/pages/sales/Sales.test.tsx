import { renderWithProviders, screen } from "../../tests/test-utils";
import Sales from "./Sales";

describe("Sales page", () => {
  it("renders Sales page", () => {
    const comp = renderWithProviders(<Sales />, {
      route: "/sales",
      auth: { isAuthenticated: true },
    });
    expect(comp).toBeTruthy();
    expect(screen.getByText("Sales page!")).toBeInTheDocument();
  });
});
