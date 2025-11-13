import { renderWithProviders, screen } from "../tests/test-utils";
import NotFound from "./NotFound";

describe("NotFound routing", () => {
  it("renders NotFound when route not found", async () => {
    const app = renderWithProviders(<NotFound />, {
      route: "/ggoginvvbbjh",
      auth: { isAuthenticated: true },
    });
    expect(
      await screen.findByText(/Requested page not found!/i),
    ).toBeInTheDocument();
  });
});
