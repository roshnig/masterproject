import { styled } from "@mui/material/styles";

import MuiDrawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import { drawerWidth, closedMixin, openedMixin } from "./DrawerStyles";
import { SidebarItems as menuItems } from "./SidebarItems";
import { useLocation, useNavigate } from "react-router";
import { Tooltip } from "@mui/material";
import { createElement } from "react";
import styles from "./Sidebar.module.scss";

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  variants: [
    {
      props: ({ open }) => open,
      style: {
        ...openedMixin(theme),
        "& .MuiDrawer-paper": openedMixin(theme),
      },
    },
    {
      props: ({ open }) => !open,
      style: {
        ...closedMixin(theme),
        "& .MuiDrawer-paper": closedMixin(theme),
      },
    },
  ],
}));

interface SidebarProps {
  open: boolean;
  handleDrawerClose: () => void;
}

const Sidebar = ({ open, handleDrawerClose }: SidebarProps) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <Drawer variant='permanent' open={open} data-testid='drawer'>
      <DrawerHeader>
        <Tooltip title='Close Menu' placement='bottom'>
          <IconButton onClick={handleDrawerClose} aria-label='close drawer'>
            <ChevronLeftIcon className={styles.iconColor} />
          </IconButton>
        </Tooltip>
      </DrawerHeader>
      <Divider />
      <List>
        {menuItems.map((item) => {
          const active = pathname === item.path;
          return (
            <ListItem
              key={item.path}
              disablePadding
              sx={{ display: "block", paddingBottom: 1 }}
            >
              <Tooltip title={!open ? item.label : ""} placement='right'>
                <ListItemButton
                  selected={active}
                  onClick={() => navigate(item.path)}
                  sx={{
                    justifyContent: open ? "initial" : "center",
                    px: 2.5,
                    "&.Mui-selected": {
                      backgroundColor: "var(--primary-selected)",
                    },
                  }}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 2 : "auto",
                      justifyContent: "center",
                      color: "white",
                    }}
                  >
                    {createElement(item.icon)}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    sx={{ opacity: open ? 1 : 0 }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default Sidebar;
