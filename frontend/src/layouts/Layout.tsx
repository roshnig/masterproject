import React from "react";
import Header from "../components/layout/appbar/header/Header";
import { Outlet } from "react-router";
import Footer from "../components/layout/footer/Footer";

const Layout: React.FC = () => {
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

export default Layout;
