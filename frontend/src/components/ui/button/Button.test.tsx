import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button test", () => {
  it("should render component", () => {
    render(<Button label='Click' />);
    expect(true).toBeTruthy();
  });

  it("should respond to click", () => {
    const handleClick = vi.fn();
    render(<Button label='Click' onClick={handleClick} />);
    const btn = screen.getByText("Click");
    fireEvent.click(btn);
    expect(handleClick).toHaveBeenCalledOnce();
  });
});
