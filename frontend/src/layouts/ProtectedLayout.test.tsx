import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
  fireEvent,
  waitFor,
  mockNavigate,
} from "../tests/test-utils";

import ProtectedLayout from "./ProtectedLayout";

describe("Protected Layout Test", () => {
  it("renders layout", () => {
    const layout = renderWithProviders(<ProtectedLayout />, { route: "/" });
    expect(layout).toBeTruthy();
  });

  it("opens and closes sidebar", async () => {
    renderWithProviders(<ProtectedLayout />, { route: "/" });
    const drawer = screen.getByTestId("drawer");
    const openMenuBtn = screen.getByLabelText("open drawer");

    const drawerWidth = getComputedStyle(drawer).width;

    fireEvent.click(openMenuBtn);
    await waitFor(() => {
      expect(getComputedStyle(drawer).width).not.toBe(drawerWidth);
    });

    const closeMenuBtn = screen.getByLabelText("close drawer");
    fireEvent.click(closeMenuBtn);
    await waitFor(() => {
      expect(getComputedStyle(drawer).width).toBe(drawerWidth);
    });
  });

  it("navigates to a path when menu item is clicked in sidebar", async () => {
    renderWithProviders(<ProtectedLayout />, { route: "/" });
    const item = screen.getByLabelText("Inventory");
    expect(item).toBeInTheDocument();

    userEvent.click(item);

    await waitFor(() => {
      (expect(mockNavigate).toHaveBeenCalledWith("/inventory"), 2000);
    });
  });
});
