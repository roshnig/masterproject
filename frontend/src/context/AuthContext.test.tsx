import { render } from "@testing-library/react";
import { AuthProvider, useAuth } from "./AuthContext";

function TestComponent() {
  useAuth();
  return <div>Mock component</div>;
}

test("useAuthContext throws when used outside AuthProvider", () => {
  expect(() => render(<TestComponent />)).toThrow(
    "useAuth must be used within an AuthProvider",
  );
});

test("useAuthContext does not throw when inside AuthProvider", () => {
  expect(() =>
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>,
    ),
  ).not.toThrow();
});
