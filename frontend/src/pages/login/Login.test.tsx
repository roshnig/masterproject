import {
  mockNavigate,
  renderWithProviders,
  screen,
} from "../../tests/test-utils";
import userEvent from "@testing-library/user-event";
import Login from "./Login";

describe("Login tests", () => {
  it("renders login page when unauthenticated", async () => {
    const comp = renderWithProviders(<Login />, {
      route: "/login",
      auth: { isAuthenticated: false },
    });
    expect(comp).toBeTruthy();

    const loginBtn = screen.getByLabelText("Login Button");
    expect(loginBtn).toBeTruthy();

    await userEvent.click(loginBtn);
    expect(window.location.pathname).toBe("/");
  });

  it("navigates to home page if already authenticated", async () => {
    renderWithProviders(<Login />, {
      route: "/login",
      auth: { isAuthenticated: true },
    });

    expect(window.location.pathname).not.toBe("/login");
    expect(screen.findByLabelText("toggle theme button")).toBeTruthy();
  });

  it("navigates to signup page when btn clicked", async () => {
    renderWithProviders(<Login />, {
      route: "/login",
      auth: { isAuthenticated: false },
    });

    const signupBtn = screen.getByLabelText("SignUp Button");
    expect(signupBtn).toBeTruthy();

    await userEvent.click(signupBtn);
    expect(mockNavigate).toHaveBeenCalledWith("/signup");
  });
});
