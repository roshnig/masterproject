import {
  renderWithProviders,
  screen,
  fireEvent,
  mockNavigate,
  waitFor,
} from "../../../tests/test-utils";

import ICSidebar from "./ICSidebar";

describe("ICSidebar Test", () => {
  it("renders icsidebar", () => {
    const comp = renderWithProviders(<ICSidebar />, { route: "/" });
    expect(comp).toBeTruthy();
  });

  it("renders sidebar items", () => {
    renderWithProviders(<ICSidebar />);
    expect(screen.getByText("Products")).toBeInTheDocument();
    expect(screen.getByText("Sales")).toBeInTheDocument();
    expect(screen.getByText("Inventory")).toBeInTheDocument();
  });

  it("navigates to selected path when item is clicked", async () => {
    renderWithProviders(<ICSidebar />);
    const menuItem = screen.getByText("Products");
    fireEvent.click(menuItem);
    waitFor(() => expect(mockNavigate).toHaveBeenCalledWith("/products"));
  });
});
