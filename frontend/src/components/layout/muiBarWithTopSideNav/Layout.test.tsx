import {
  renderWithProviders,
  screen,
  fireEvent,
  waitFor,
} from "../../../tests/test-utils";

import Layout from "./Layout";

describe("Layout Test", () => {
  it("renders layout", () => {
    const layout = renderWithProviders(<Layout />, { route: "/" });
    expect(layout).toBeTruthy();
  });

  it("opens and closes sidebar", async () => {
    renderWithProviders(<Layout />, { route: "/" });
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
});
