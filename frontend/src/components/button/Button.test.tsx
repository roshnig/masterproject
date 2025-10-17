import { render } from "@testing-library/react";
import Button from "./Button";

describe("Button test", () => {
  it("should render component", () => {
    render(<Button />);
    expect(true).toBeTruthy();
  });
});
