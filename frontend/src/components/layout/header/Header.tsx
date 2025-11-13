import Box from "@mui/material/Box";
import MuiAppBar, {
  type AppBarProps as MuiAppBarProps,
} from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  LightMode as LightModeIcon,
  DarkMode as DarkModeIcon,
} from "@mui/icons-material";

import { drawerWidth } from "../sidebar/DrawerStyles";
import { styled } from "@mui/material/styles";
import { Avatar, Menu, MenuItem, Tooltip } from "@mui/material";
import { Link } from "react-router";
import { ThemeContext } from "../../../providers/themeContext";
import { useContext, useState } from "react";
import { useAuth } from "../../../context/AuthContext";

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

interface HeaderProps {
  open: boolean;
  handleDrawerOpen: () => void;
}

const Header = ({ open, handleDrawerOpen }: HeaderProps) => {
  const { handleLogout } = useAuth();
  const { mode, toggleMode } = useContext(ThemeContext);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    handleLogout();
    setAnchorElUser(null);
  };

  return (
    <AppBar position='fixed' open={open}>
      <Toolbar>
        <Tooltip title='Open Menu' placement='bottom'>
          <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            sx={[
              {
                marginRight: 5,
              },
              open && { display: "none" },
            ]}
          >
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Tooltip title='Back To Home' placement='bottom'>
              <Link to='/' style={{ color: "white" }}>
                <img
                  src='./org-logo.jpg'
                  alt='org logo'
                  data-testid='org-logo'
                  width='38'
                  height='38'
                  style={{ marginTop: "8px", objectFit: "contain" }}
                />
              </Link>
            </Tooltip>
          </Box>
          <Typography variant='h6' noWrap component='div'>
            My ORG
          </Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
            <Tooltip
              title={
                mode === "light" ? "Toggle Dark Mode" : "Toggle Light Mode"
              }
              placement='bottom'
            >
              <IconButton
                color='inherit'
                aria-label='toggle theme button'
                onClick={toggleMode}
              >
                {mode === "light" ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title='Open settings'>
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0 }}
                  aria-label='user menu'
                  color='inherit'
                >
                  <Avatar alt='user' src='./user.jpg' data-testid='user-img' />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id='menu-appbar'
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"logout"} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>Logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
export default Header;
