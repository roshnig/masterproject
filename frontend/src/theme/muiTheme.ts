import { createTheme } from "@mui/material/styles";

//fetches color as per whatever current theme is applied in document
export const getColor = (cssVar: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(cssVar).trim();

/** here we are creating mui theme using color variables defined in colors.scss file. we are doing this so
 * we will have a single file of truth for colors used in whole app. Then we can use same colors in ukic component
 * as well as here in mui theme. That is the reason we are not defining direct color names here instead we
 * are using color variable names. It will automatically read color for light/dark theme as per current
 * data-theme applied in document.
 */
export function buildMuiTheme() {
  return createTheme({
    palette: {
      primary: {
        light: getColor("--primary-light"),
        main: getColor("--primary-main"),
        dark: getColor("--primary-dark"),
        contrastText: getColor("--primary-contrastText"),
      },
      secondary: {
        light: getColor("--secondary-light"),
        main: getColor("--secondary-main"),
        dark: getColor("--secondary-dark"),
        contrastText: getColor("--secondary-contrastText"),
      },
      success: {
        light: getColor("--success-light"),
        main: getColor("--success-main"),
        dark: getColor("--success-dark"),
        contrastText: getColor("--success-contrastText"),
      },
      error: {
        light: getColor("--error-light"),
        main: getColor("--error-main"),
        dark: getColor("--error-dark"),
        contrastText: getColor("--error-contrastText"),
      },
      warning: {
        light: getColor("--warning-light"),
        main: getColor("--warning-main"),
        dark: getColor("--warning-dark"),
        contrastText: getColor("--warning-contrastText"),
      },
      info: {
        light: getColor("--info-light"),
        main: getColor("--info-main"),
        dark: getColor("--info-dark"),
        contrastText: getColor("--info-contrastText"),
      },
      background: {
        default: getColor("--background"),
        paper: getColor("--background"),
      },
      text: {
        primary: getColor("--text-primary"),
        secondary: getColor("--text-secondary"),
        disabled: getColor("--text-disabled"),
      },
      action: {
        active: getColor("--action-active"),
        hover: getColor("--action-hover"),
        selected: getColor("--action-selected"),
        disabled: getColor("--action-disabled"),
        disabledBackground: getColor("--action-disabledBackground"),
        focus: getColor("--action-focus"),
      },
    },
    components: {
       MuiFilledInput: {
        styleOverrides: {
          root: {
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5,
            overflow:"hidden"
          }
        }
      },
      // MuiTextField: {
      //  styleOverrides: {
      //   root: {
      //     "--TextField-brandBorderColor": "#888",
      //     "--TextField-brandBorderHoverColor": "#fff",
      //     "--TextField-brandBorderFocusedColor": "#90caf9",

      //     "& label": {
      //       color: "#bbb"
      //     },

      //     "& input": {
      //       color: "#fff"
      //     },

      //     "& label.Mui-focused": {
      //       color: "#90caf9"
      //     }
      //   }
      // }
    //},
    //   MuiOutlinedInput: {
    //   styleOverrides: {
    //     notchedOutline: {
    //       borderColor: "#888"
    //     }
    //   }
    // }
    }
  });
}
