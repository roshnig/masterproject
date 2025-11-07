import { renderWithProviders } from "./tests/test-utils";
import App from "./App";

describe("App routing", () => {
  it("renders Home page by default", () => {
    const app = renderWithProviders(<App />, {
      route: "/",
    });

    expect(app).toBeTruthy();
  });
});
