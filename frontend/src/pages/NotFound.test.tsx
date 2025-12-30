import { render, screen } from "@testing-library/react";
import NotFound from "./NotFound";
import { TestWrapper } from "@/tests/mocks/testWrapper";

describe("NotFound routing", () => {
  it("renders NotFound when route not found", async () => {
    render(
      <TestWrapper route='xyz'>
        <NotFound />
      </TestWrapper>,
    );
    expect(
      await screen.findByText(/Requested page not found!/i),
    ).toBeInTheDocument();
  });
});

// import { renderWithProviders, screen } from "../tests/test-utils";
// import NotFound from "./NotFound";

// describe("NotFound routing", () => {
//   it("renders NotFound when route not found", async () => {
//     renderWithProviders(<NotFound />, {
//       route: "/ggoginvvbbjh",
//       auth: { isAuthenticated: true },
//     });
//     expect(
//       await screen.findByText(/Requested page not found!/i),
//     ).toBeInTheDocument();
//   });
// });
