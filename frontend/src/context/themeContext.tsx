import {
  createContext,
  type FC,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { ThemeProvider as MuiThemeProvider, CssBaseline } from "@mui/material";
import { buildMuiTheme } from "../theme/muiTheme";

type Theme = "light" | "dark";
interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const ThemeProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const systemPref = window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";

  const initialTheme = (localStorage.getItem("theme") as Theme) || systemPref;
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const [muiTheme, setMuiTheme] = useState(buildMuiTheme());

  useEffect(() => {
    localStorage.setItem("theme", theme);
    document.documentElement.setAttribute("data-theme", theme);
    setMuiTheme(buildMuiTheme());
  }, [theme]);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <MuiThemeProvider theme={muiTheme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const themeContext = useContext(ThemeContext);
  if (!themeContext) {
    throw new Error("useTheme must be used within an ThemeProvider");
  }
  return themeContext;
};
