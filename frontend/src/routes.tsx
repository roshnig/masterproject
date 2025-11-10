import { Route, Routes } from "react-router";
import { lazy, Suspense } from "react";

import NotFound from "./pages/NotFound";

import Loader from "./components/ui/loader/Loader";
import ICSidebar from "./components/layout/ukicSidebar/ICSidebar";
import AppLayout from "./components/layout/appbar/AppLayout"; // just topbar
import Layout from "./components/layout/muiBarWithTopSideNav/Layout"; //mui layout with sidebar and topbar

import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Products = lazy(() => import("./pages/products/Products"));
const Sales = lazy(() => import("./pages/sales/Sales"));
const Inventory = lazy(() => import("./pages/inventory/Inventory"));

const AppRoutes = () => {
  return (
    <Routes>
      {/* We can have multiple route layouts here */}

      {/* <Route element={<AppLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
      </Route> */}

      {/* <Route path='/' element={<Layout />}> */}
      <Route path='/' element={<ICSidebar />}>
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path='/products'
          element={
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path='/sales'
          element={
            <Suspense fallback={<Loader />}>
              <Sales />
            </Suspense>
          }
        />
        <Route
          path='/inventory'
          element={
            <Suspense fallback={<Loader />}>
              <Inventory />
            </Suspense>
          }
        />
      </Route>

      {/* <Route element={<AdminLayout}>
           Admin routes will go here if you want role specific routes
        </Route> */}

      {/* FallbackRoute 404*/}
      <Route path='*' element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
