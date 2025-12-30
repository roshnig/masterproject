import type { ReactNode } from "react";
import { AuthTestWrapper } from "./authwrapper";
import { RouterTestWrapper } from "./routerWrapper";
//import { ThemeProvider } from "@/context/themeContext";
import { ThemeTestWrapper } from "./themeWrapper";

//I think we shold use original themeprovider here instead of testthemewrapper. may be after that we won't require to generate
// mui colour pallete before tests in setupTests.tsx - applyCssVars - but not sure (not tested yet)

export function TestWrapper({
  children,
  route = "/",
}: {
  children: ReactNode;
  route?: string;
}) {
  return (
    <AuthTestWrapper>
      {/* <ThemeProvider> */}
      <ThemeTestWrapper>
        <RouterTestWrapper initialPath={route}>{children}</RouterTestWrapper>
      </ThemeTestWrapper>
      {/* </ThemeProvider> */}
    </AuthTestWrapper>
  );
}

// Now we can use this test wrapper whereever we want and don't need test-utils.tsx file anymore
