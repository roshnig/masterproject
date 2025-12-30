import { screen, render } from "@testing-library/react";
import Appbar from "./Appbar";

describe("App component", () => {
  it("should render Appbar component", () => {
    const comp = render(<Appbar />);
    expect(comp).toBeTruthy();

    expect(screen.getByText("MY APP")).toBeTruthy();
  });
});

// //import { render } from "@testing-library/react"; //test will fail as we are using react-router for this component
// import { renderWithProviders } from "../../../tests/test-utils"; // use this render which has memory router
// import Appbar from "./Appbar";

// describe("Appbar test", () => {
//   it("should render Appbar component", () => {
//     // render(<Appbar />);  //will fail as this components need BrowserProvider
//     renderWithProviders(<Appbar />); //will pass, using MemoryRouter
//     expect(true).toBeTruthy();
//   });
// });

// import { fireEvent, screen } from "@testing-library/react";
// import { renderWithProviders } from "../../../tests/test-utils"; // use this render which has memory router
// import Appbar from "./Appbar";

// describe("App component", () => {
//   it("should render Appbar component", () => {
//     renderWithProviders(<Appbar />); //will pass, using MemoryRouter
//     expect(true).toBeTruthy();
//   });

//   // it("toggles between light and dark mode", () => {
//   //   renderWithProviders(<Appbar />, { mode: "light" });

//   //   // Initially light mode
//   //   const root = document.querySelector("[data-theme]");
//   //   expect(root).toHaveAttribute("data-theme", "light");

//   //   const toggleButton = screen.getByTestId("theme-toggle");
//   //   expect(toggleButton.querySelector("svg")).toBeTruthy(); // icon exists

//   //   fireEvent.click(toggleButton);

//   //   // After toggle → dark mode
//   //   expect(root).toHaveAttribute("data-theme", "dark");
//   // });
// });
