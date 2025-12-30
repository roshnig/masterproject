import userEvent from "@testing-library/user-event";
import Login from "./Login";
import { render, screen, waitFor } from "@testing-library/react";
import { TestWrapper } from "@/tests/mocks/testWrapper";
import { fetchAuthSession, signIn } from "aws-amplify/auth";

vi.mock("@aws-amplify/auth");

describe("Login tests", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders login page when unauthenticated", async () => {
    const comp = render(
      <TestWrapper route='/login'>
        <Login />
      </TestWrapper>,
    );

    expect(comp).toBeTruthy();
  });

  it("navigates to home page after login", async () => {
    (signIn as any).mockResolvedValue({
      isSignedIn: true,
      nextStep: { signInStep: "DONE" },
    });
    render(
      <TestWrapper route='/login'>
        <Login />
      </TestWrapper>,
    );

    await userEvent.type(screen.getByLabelText(/email/i), "test@example.com");
    await userEvent.type(screen.getByLabelText(/password/i), "TestPassword");

    const loginBtn = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginBtn);

    await waitFor(() => {
      expect(signIn).toHaveBeenCalledWith({
        username: "test@example.com",
        password: "TestPassword",
      });
      expect(window.location.pathname).toBe("/");
    });
    expect(window.location.pathname).not.toBe("/login");
  });

  it("shows error on invalid login", async () => {
    (signIn as any).mockRejectedValue({
      name: "NotAuthorizedException",
      message: "Incorrect username or password",
    });
    render(
      <TestWrapper route='/login'>
        <Login />
      </TestWrapper>,
    );

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "invalid@example.com",
    );
    await userEvent.type(screen.getByLabelText(/password/i), "invalidPassword");

    const loginBtn = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginBtn);
    expect(await screen.findByText("Invalid credentials")).toBeInTheDocument();
  });

  it("throws default error message on invalid login", async () => {
    (signIn as any).mockRejectedValue(new Error("Unknown error"));
    render(
      <TestWrapper route='/login'>
        <Login />
      </TestWrapper>,
    );

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "invalid@example.com",
    );
    await userEvent.type(screen.getByLabelText(/password/i), "invalidPassword");

    const loginBtn = screen.getByRole("button", { name: /login/i });
    await userEvent.click(loginBtn);
    expect(
      await screen.findByText("Unable to log you in at this time"),
    ).toBeInTheDocument();
  });

  it("navigates to home page if already authenticated", async () => {
    (fetchAuthSession as any).mockResolvedValue({
      tokens: {
        idToken: { token: "fake-id-token" },
        accessToken: { token: "fake-access-token" },
      },
    });
    render(
      <TestWrapper route='/login'>
        <Login />
      </TestWrapper>,
    );

    await waitFor(() => {
      expect(window.location.pathname).toBe("/");
      expect(window.location.pathname).not.toBe("/login");
    });
  });
});

// import {
//   mockNavigate,
//   renderWithProviders,
//   screen,
// } from "../../tests/test-utils";
// import userEvent from "@testing-library/user-event";
// import Login from "./Login";

// vi.mock("@aws-amplify/auth");

// describe("Login tests", () => {
//   it("renders login page when unauthenticated", async () => {
//     const comp = renderWithProviders(<Login />, {
//       route: "/login",
//       auth: { isAuthenticated: false },
//     });
//     expect(comp).toBeTruthy();

//     const loginBtn = screen.getByLabelText("Login Button");
//     expect(loginBtn).toBeTruthy();

//     await userEvent.click(loginBtn);
//     expect(window.location.pathname).toBe("/");
//   });

//   it("navigates to home page if already authenticated", async () => {
//     renderWithProviders(<Login />, {
//       route: "/login",
//       auth: { isAuthenticated: true },
//     });

//     expect(window.location.pathname).not.toBe("/login");
//     //expect(screen.findByLabelText("toggle theme button")).toBeTruthy();
//   });

//   it("navigates to signup page when btn clicked", async () => {
//     renderWithProviders(<Login />, {
//       route: "/login",
//       auth: { isAuthenticated: false },
//     });

//     const signupBtn = screen.getByLabelText("SignUp Button");
//     expect(signupBtn).toBeTruthy();

//     await userEvent.click(signupBtn);
//     expect(mockNavigate).toHaveBeenCalledWith("/signup");
//   });
// });
