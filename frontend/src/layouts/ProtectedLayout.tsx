import Box from "@mui/material/Box";
import { useState } from "react";
import Toolbar from "@mui/material/Toolbar";
import { Outlet } from "react-router";
import Header from "../components/layout/header/Header";
import Sidebar from "../components/layout/sidebar/Sidebar";
//import SideNavigation from "../components/layout/ukicSidebar/ICSidebar";

export default function ProtectedLayout() {
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

    // <Box sx={{ display: "flex" }}>
    //   <SideNavigation />
    //   <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
    //     <Toolbar />
    //     <Outlet />
    //   </Box>
    // </Box>
  );
}
