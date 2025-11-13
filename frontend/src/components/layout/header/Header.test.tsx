import userEvent from "@testing-library/user-event";
import {
  renderWithProviders,
  screen,
  fireEvent,
} from "../../../tests/test-utils";
import Header from "./Header";

describe("Header Test", () => {
  it("renders Header", () => {
    const header = renderWithProviders(
      <Header open={false} handleDrawerOpen={vi.fn()} />,
      { route: "/" },
    );
    expect(header).toBeTruthy();
  });

  it("renders Header links", () => {
    renderWithProviders(<Header open={false} handleDrawerOpen={vi.fn()} />);
    expect(screen.getByLabelText("open drawer")).toBeTruthy();
    expect(screen.getByTestId("org-logo")).toBeInTheDocument();
    expect(screen.getByTestId("user-img")).toBeInTheDocument();
  });

  it("switches theme", async () => {
    renderWithProviders(<Header open={false} handleDrawerOpen={vi.fn()} />);
    const themeBtn = screen.getByLabelText("toggle theme button");
    expect(themeBtn).toBeInTheDocument();
    fireEvent.mouseOver(themeBtn);
    expect(await screen.findByText("Toggle Dark Mode")).toBeInTheDocument();

    // Initially light mode
    const root = document.querySelector("[data-theme]");
    expect(root).toHaveAttribute("data-theme", "light");

    expect(themeBtn.querySelector("svg")).toBeTruthy(); // icon exists

    fireEvent.click(themeBtn);

    // After toggle → dark mode
    expect(root).toHaveAttribute("data-theme", "dark");
  });

  it("opens sidebar when menu icon is clicked", async () => {
    const handleDrawerOpen = vi.fn();
    renderWithProviders(
      <Header open={false} handleDrawerOpen={handleDrawerOpen} />,
    );
    const menuBtn = screen.getByLabelText("open drawer");
    expect(menuBtn).toBeInTheDocument();

    fireEvent.mouseOver(menuBtn);
    expect(await screen.findByText("Open Menu")).toBeInTheDocument();

    fireEvent.click(menuBtn);
    expect(handleDrawerOpen).toHaveBeenCalled();

    //expect(screen.queryByLabelText("open drawer")).not.toBeInTheDocument();
  });

  it("logout when user menu logout is clicked", async () => {
    renderWithProviders(<Header open={false} handleDrawerOpen={vi.fn()} />);
    const userImg = screen.getByTestId("user-img");
    expect(userImg).toBeInTheDocument();

    await userEvent.click(screen.getByLabelText("user menu"));

    const logoutItem = await screen.findByText(/logout/i);
    expect(logoutItem).toBeVisible();
    userEvent.click(logoutItem);
  });
});
