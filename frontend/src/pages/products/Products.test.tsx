import { renderWithProviders, screen } from "../../tests/test-utils";
import Products from "./Products";

describe("Products page", () => {
  it("renders Products page", () => {
    const comp = renderWithProviders(<Products />, {
      route: "/products",
      auth: { isAuthenticated: true },
    });
    expect(comp).toBeTruthy();
    expect(screen.getByText("Products page!")).toBeInTheDocument();
  });
});
