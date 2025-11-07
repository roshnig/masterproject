import { createContext, type ReactNode, useMemo, useState } from "react";
import {
  createTheme,
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from "@mui/material";
import { IcTheme } from "@ukic/react";
import { lightColors, darkColors } from "../styles/colors";

interface ThemeContextType {
  mode: "light" | "dark";
  toggleMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleMode: () => {},
});

interface AppThemeProviderProps {
  children: ReactNode;
  initialMode?: "light" | "dark"; // <-- optional prop for testing
}

export const AppThemeProvider = ({
  children,
  initialMode,
}: AppThemeProviderProps) => {
  const [mode, setMode] = useState<"light" | "dark">(initialMode || "light");

  const toggleMode = () =>
    setMode((prev) => (prev === "light" ? "dark" : "light"));

  const theme = useMemo(() => {
    const colors = mode === "light" ? lightColors : darkColors;
    return createTheme({
      palette: {
        mode,
        primary: { main: colors.primary },
        secondary: { main: colors.secondary },
        background: {
          default: colors.background,
          paper: colors.surface,
        },
        text: {
          primary: colors.textPrimary,
          secondary: colors.textSecondary,
        },
        // tonalOffset: 0, //tonal offset shifts the luminance in dark mode. by default it is 0.2
        // tonalOffset: {
        //   light: 0.1,
        //   dark: 0.9,
        // },
      },
      typography: {
        fontFamily: "Roboto, 'Open Sans', sans-serif",
      },
    });
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, toggleMode }}>
      <div data-theme={mode}>
        <IcTheme>
          <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
          </MuiThemeProvider>
        </IcTheme>
      </div>
    </ThemeContext.Provider>
  );
};

// import { createContext, useMemo, useState, type ReactNode } from "react";
// import {
//   createTheme,
//   ThemeProvider as MuiThemeProvider,
//   CssBaseline,
// } from "@mui/material";

// interface ThemeContextType {
//   mode: "light" | "dark";
//   toggleMode: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   mode: "light",
//   toggleMode: () => {},
// });

// const lightTheme = createTheme({
//   palette: {
//     mode: "light",
//     primary: {
//       main: "#0066cc", // custom blue
//     },
//     secondary: {
//       main: "#ff4081", // pink accent
//     },
//     background: {
//       default: "#f5f5f5", // page background
//       paper: "#ffffff", // card background
//     },
//     text: {
//       primary: "#0d0d0d",
//       secondary: "#333333",
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, 'Open Sans', sans-serif",
//   },
// });

// const darkTheme = createTheme({
//   palette: {
//     mode: "dark",
//     primary: {
//       main: "#90caf9", // lighter blue for contrast
//     },
//     secondary: {
//       main: "#f48fb1", // softer pink
//     },
//     background: {
//       default: "#121212", // dark surface
//       paper: "#1d1d1d",
//     },
//     text: {
//       primary: "#ffffff",
//       secondary: "#bdbdbd",
//     },
//   },
//   typography: {
//     fontFamily: "Roboto, 'Open Sans', sans-serif",
//   },
// });

// export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [mode, setMode] = useState<"light" | "dark">("light");
//   const toggleMode = () =>
//     setMode((prev) => (prev === "light" ? "dark" : "light"));

//   const theme = useMemo(
//     () => (mode === "light" ? lightTheme : darkTheme),
//     [mode],
//   );

//   return (
//     <ThemeContext.Provider value={{ mode, toggleMode }}>
//       {/* Sync UKIC with same theme (see below) */}
//       <div data-theme={mode}>
//         <MuiThemeProvider theme={theme}>
//           <CssBaseline />
//           {children}
//         </MuiThemeProvider>
//       </div>
//     </ThemeContext.Provider>
//   );
// };

// import { createContext, useState, useMemo, type ReactNode } from "react";
// import {
//   ThemeProvider as MuiThemeProvider,
//   createTheme,
//   CssBaseline,
// } from "@mui/material";

// interface ThemeContextType {
//   mode: "light" | "dark";
//   toggleMode: () => void;
// }

// export const ThemeContext = createContext<ThemeContextType>({
//   mode: "light",
//   toggleMode: () => {},
// });

// export const AppThemeProvider = ({ children }: { children: ReactNode }) => {
//   const [mode, setMode] = useState<"light" | "dark">("light");
//   const toggleMode = () =>
//     setMode((prev) => (prev === "light" ? "dark" : "light"));

//   // createTheme() with default MUI palettes — no overrides needed
//   const theme = useMemo(
//     () =>
//       createTheme({
//         palette: {
//           mode,
//         },
//       }),
//     [mode],
//   );

//   return (
//     <ThemeContext.Provider value={{ mode, toggleMode }}>
//       {/* For UKIC theme sync — optional */}
//       <div data-theme={mode}>
//         <MuiThemeProvider theme={theme}>
//           <CssBaseline />{" "}
//           {/* This line ensures global background/text colors switch */}
//           {children}
//         </MuiThemeProvider>
//       </div>
//     </ThemeContext.Provider>
//   );
// };
