// TopBar.tsx
import { useContext } from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
import { ThemeContext } from "../../../../providers/themeContext";

const Header = () => {
  const { mode, toggleMode } = useContext(ThemeContext);

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' style={{ flexGrow: 1 }}>
          My App
        </Typography>

        <IconButton
          color='inherit'
          onClick={toggleMode}
          data-testid='theme-toggle'
        >
          {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>
        {/* <Link to='/login'>Login</Link> */}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
