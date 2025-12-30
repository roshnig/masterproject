import userEvent from "@testing-library/user-event";
import ProtectedLayout from "./ProtectedLayout";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { TestWrapper } from "@/tests/mocks/testWrapper";
import * as router from "react-router";

describe("Protected Layout Test", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders layout", () => {
    const layout = render(
      <TestWrapper route='/'>
        <ProtectedLayout />
      </TestWrapper>,
    );
    expect(layout).toBeTruthy();
  });

  it("opens and closes sidebar", async () => {
    render(
      <TestWrapper route='/'>
        <ProtectedLayout />
      </TestWrapper>,
    );
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
    const spy = vi.spyOn(router, "useNavigate");
    const navigateMock = vi.fn();
    spy.mockReturnValue(navigateMock);

    render(
      <TestWrapper route='/'>
        <ProtectedLayout />
      </TestWrapper>,
    );
    const item = screen.getByLabelText("Inventory");
    expect(item).toBeInTheDocument();

    await userEvent.click(item);
    expect(navigateMock).toHaveBeenCalledWith("/inventory");
  });
});

// import userEvent from "@testing-library/user-event";
// import {
//   renderWithProviders,
//   screen,
//   fireEvent,
//   waitFor,
//   mockNavigate,
// } from "../tests/test-utils";

// import ProtectedLayout from "./ProtectedLayout";

// describe("Protected Layout Test", () => {
//   it("renders layout", () => {
//     const layout = renderWithProviders(<ProtectedLayout />, { route: "/" });
//     expect(layout).toBeTruthy();
//   });

//   it("opens and closes sidebar", async () => {
//     renderWithProviders(<ProtectedLayout />, { route: "/" });
//     const drawer = screen.getByTestId("drawer");
//     const openMenuBtn = screen.getByLabelText("open drawer");

//     const drawerWidth = getComputedStyle(drawer).width;

//     fireEvent.click(openMenuBtn);
//     await waitFor(() => {
//       expect(getComputedStyle(drawer).width).not.toBe(drawerWidth);
//     });

//     const closeMenuBtn = screen.getByLabelText("close drawer");
//     fireEvent.click(closeMenuBtn);
//     await waitFor(() => {
//       expect(getComputedStyle(drawer).width).toBe(drawerWidth);
//     });
//   });

//   it("navigates to a path when menu item is clicked in sidebar", async () => {
//     renderWithProviders(<ProtectedLayout />, { route: "/" });
//     const item = screen.getByLabelText("Inventory");
//     expect(item).toBeInTheDocument();

//     userEvent.click(item);

//     await waitFor(() => {
//       (expect(mockNavigate).toHaveBeenCalledWith("/inventory"), 2000);
//     });
//   });
// });
