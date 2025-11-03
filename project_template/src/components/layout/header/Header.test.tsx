//import { render } from "@testing-library/react"; //test will fail as we are using react-router for this component
import { renderWithProviders } from "../../../tests/test-utils"; // use this render which has memory router
import Header from "./Header";

describe("Header test", () => {
  it("should render Header component", () => {
    // render(<Header />);  //will fail as this components need BrowserProvider
    renderWithProviders(<Header />); //will pass, using MemoryRouter
    expect(true).toBeTruthy();
  });
});
