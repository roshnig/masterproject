import { renderWithProviders, screen } from "../../tests/test-utils";
import SignUp from "./SignUp";

describe("SignUp page", () => {
  it("renders SignUp page", () => {
    const comp = renderWithProviders(<SignUp />, {
      route: "/signup",
      auth: { isAuthenticated: false },
    });
    expect(comp).toBeTruthy();
  });
});
