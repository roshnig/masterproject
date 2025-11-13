import { renderWithProviders } from "../tests/test-utils";

import PublicLayout from "./PublicLayout";

describe("Public Layout Test", () => {
  it("renders public layout", () => {
    const layout = renderWithProviders(<PublicLayout />, {
      route: "/login",
      auth: { isAuthenticated: false },
    });
    expect(layout).toBeTruthy();
  });
});
