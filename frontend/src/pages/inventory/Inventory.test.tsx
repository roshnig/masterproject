import { renderWithProviders, screen } from "../../tests/test-utils";
import Inventory from "./Inventory";

describe("Inventory page", () => {
  it("renders Inventory page", () => {
    const comp = renderWithProviders(<Inventory />, {
      route: "/inventory",
      auth: { isAuthenticated: true },
    });
    expect(comp).toBeTruthy();
    expect(screen.getByText("Inventory page!")).toBeInTheDocument();
  });
});
