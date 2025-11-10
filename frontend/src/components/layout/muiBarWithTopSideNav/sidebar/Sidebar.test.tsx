import {
  renderWithProviders,
  screen,
  fireEvent,
  mockNavigate,
} from "../../../../tests/test-utils";

import Sidebar from "./Sidebar";

describe("Sidebar Test", () => {
  it("renders Sidebar", () => {
    const sidebar = renderWithProviders(
      <Sidebar open={false} handleDrawerClose={vi.fn()} />,
      { route: "/" },
    );
    expect(sidebar).toBeTruthy();
  });

  it("navigates to selected route when a menu item is clicked", () => {
    renderWithProviders(<Sidebar open={false} handleDrawerClose={vi.fn()} />);
    const menuItem = screen.getByText("Products");
    fireEvent.click(menuItem);
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("shows tooltips when collapsed", async () => {
    renderWithProviders(<Sidebar open={false} handleDrawerClose={vi.fn()} />);
    const menuItem = screen.getByLabelText("Products");
    fireEvent.mouseOver(menuItem);
    expect(await screen.findByText("Products")).toBeInTheDocument();
  });

  it("shows closes sidebar when menu icon clicked", async () => {
    const handleDrawerClose = vi.fn();
    renderWithProviders(
      <Sidebar open={true} handleDrawerClose={handleDrawerClose} />,
    );
    const menuBtn = screen.getByLabelText("close drawer");
    expect(menuBtn).toBeInTheDocument();

    fireEvent.mouseOver(menuBtn);
    expect(await screen.findByText("Close Menu")).toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(handleDrawerClose).toHaveBeenCalled();

    //expect(screen.queryByLabelText("open drawer")).not.toBeInTheDocument();
  });
});
