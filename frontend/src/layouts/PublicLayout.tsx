import React from "react";

import { Outlet } from "react-router";
import Appbar from "@components/layout/appbar/Appbar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
//import Footer from "../components/layout/footer/Footer";

const PublicLayout: React.FC = () => {
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Appbar />
      <Box component='main' sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <Outlet />
      </Box>
      {/* <Footer /> */}
    </Box>
  );
};

export default PublicLayout;
