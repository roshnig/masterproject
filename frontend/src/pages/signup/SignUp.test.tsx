import { render } from "@testing-library/react";
import SignUp from "./SignUp";
import { TestWrapper } from "@/tests/mocks/testWrapper";

describe("SignUp page", () => {
  it("renders SignUp page", () => {
    const comp = render(
      <TestWrapper route='/signup'>
        <SignUp />
      </TestWrapper>,
    );
    expect(comp).toBeTruthy();
  });
});

// import { renderWithProviders, screen } from "../../tests/test-utils";
// import SignUp from "./SignUp";

// describe("SignUp page", () => {
//   it("renders SignUp page", () => {
//     const comp = renderWithProviders(<SignUp />, {
//       route: "/signup",
//       auth: { isAuthenticated: false },
//     });
//     expect(comp).toBeTruthy();
//   });
// });
