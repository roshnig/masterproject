import React from "react";

vi.mock("@ukic/react", async (importOriginal) => {
  const actual: any = await importOriginal();
  return {
    ...actual,
    IcSideNavigation: ({ children, appTitle, ...props }: any) => (
      <div data-testid='ic-side-navigation' {...props}>
        {children}
      </div>
    ),
    IcNavigationItem: ({ label, children, slot, ...props }: any) => {
      const iconChild = React.Children.toArray(children).filter(
        (child: any) => child.props?.slot === "icon",
      );
      const suffixChild = React.Children.toArray(children).filter(
        (child: any) => child.props?.slot === "suffix",
      );
      return (
        <div data-testid='ic-navigation-item' {...props}>
          {iconChild.length > 0 && (
            <span data-testid='icon-slot'>{iconChild}</span>
          )}
          <span>{label}</span>
          {suffixChild.length > 0 && (
            <span data-testid='suffix-slot'>{suffixChild}</span>
          )}
        </div>
      );
    },
  };
});
