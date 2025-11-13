//import { useContext } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Container,
} from "@mui/material";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";
//import { ThemeContext } from "../../../providers/themeContext";

const Appbar = () => {
  //  const { mode, toggleMode } = useContext(ThemeContext);
  return (
    <AppBar position='static'>
      <Container maxWidth='xl'>
        <Toolbar disableGutters>
          <Box>
            <img
              src='./org-logo.jpg'
              alt='org logo'
              data-testid='org-logo'
              width='38'
              height='38'
              style={{ marginTop: "10px", objectFit: "contain" }}
            />
          </Box>
          <Typography
            variant='h6'
            noWrap
            style={{ flexGrow: 1 }}
            sx={{
              marginLeft: 3,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
            }}
          >
            MY APP
          </Typography>

          {/* <IconButton
            color='inherit'
            onClick={toggleMode}
            data-testid='theme-toggle'
          >
            {mode === "light" ? <DarkModeIcon /> : <LightModeIcon />}
          </IconButton> */}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Appbar;
