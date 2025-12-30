import { ThemeContext } from "@/context/themeContext";
import { ThemeProvider as MuiThemeProvider, createTheme } from "@mui/material";
import { useMemo, useState, type ReactNode } from "react";

type ThemeMode = "light" | "dark";

export function ThemeTestWrapper({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<ThemeMode>("light");

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const muiTheme = useMemo(
    () =>
      createTheme({
        palette: { mode },
      }),
    [mode],
  );

  return (
    <ThemeContext.Provider value={{ theme: mode, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>{children}</MuiThemeProvider>
    </ThemeContext.Provider>
  );
}
