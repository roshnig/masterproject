import Box from "@mui/material/Box";
import { useState } from "react";
import Header from "./header/Header";
import Sidebar from "./sidebar/Sidebar";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router";

export default function MiniDrawer() {
  //const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <Header open={open} handleDrawerOpen={handleDrawerOpen} />
      <Sidebar open={open} handleDrawerClose={handleDrawerClose} />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}
