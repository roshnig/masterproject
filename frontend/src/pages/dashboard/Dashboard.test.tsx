import { renderWithProviders, screen } from "../../tests/test-utils";
import Dashboard from "./Dashboard";

describe("Dashboard page", () => {
  it("renders Dashboard page", () => {
    const comp = renderWithProviders(<Dashboard />, {
      route: "/dashboard",
      auth: { isAuthenticated: true },
    });
    expect(comp).toBeTruthy();
    expect(screen.getByText("Dashboard page!")).toBeInTheDocument();
  });
});
