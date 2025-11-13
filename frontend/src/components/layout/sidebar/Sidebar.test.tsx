import {
  renderWithProviders,
  screen,
  fireEvent,
  mockNavigate,
} from "../../../tests/test-utils";

import Sidebar from "./Sidebar";

const mockFuncs = {
  handleDrawerClose: vi.fn(),
};

describe("Sidebar Test", () => {
  it("renders Sidebar", () => {
    const sidebar = renderWithProviders(
      <Sidebar open={false} handleDrawerClose={mockFuncs.handleDrawerClose} />,
      { route: "/" },
    );
    expect(sidebar).toBeTruthy();
  });

  it("navigates to selected route when a menu item is clicked", () => {
    renderWithProviders(
      <Sidebar open={false} handleDrawerClose={mockFuncs.handleDrawerClose} />,
    );
    const menuItem = screen.getByText("Products");
    fireEvent.click(menuItem);
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });

  it("shows tooltips when collapsed", async () => {
    renderWithProviders(
      <Sidebar open={false} handleDrawerClose={mockFuncs.handleDrawerClose} />,
    );
    const menuItem = screen.getByLabelText("Products");
    fireEvent.mouseOver(menuItem);
    expect(await screen.findByText("Products")).toBeInTheDocument();
  });

  it(" closes sidebar when menu icon clicked", async () => {
    // const spy = vi.spyOn(mockFuncs, "handleDrawerClose");
    const handleDrawerClose = vi.fn();
    renderWithProviders(
      // <Sidebar open={true} handleDrawerClose={mockFuncs.handleDrawerClose()} />,
      <Sidebar open={true} handleDrawerClose={handleDrawerClose} />,
    );
    const menuBtn = screen.getByLabelText("close drawer");
    expect(menuBtn).toBeInTheDocument();

    fireEvent.mouseOver(menuBtn);
    expect(await screen.findByText("Close Menu")).toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(handleDrawerClose).toHaveBeenCalled();
    // expect(spy).toHaveBeenCalledOnce();

    //expect(screen.queryByLabelText("open drawer")).not.toBeInTheDocument();
  });
});
