import React from "react";
import Header from "./header/Header";
import { Outlet } from "react-router";
import Footer from "../footer/Footer";

const AppLayout: React.FC = () => {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default AppLayout;
