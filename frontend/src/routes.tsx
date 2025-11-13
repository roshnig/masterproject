import { Navigate, Route, Routes } from "react-router";
import { lazy, Suspense, type ReactNode } from "react";
import { useAuth } from "./context/AuthContext";

import ICSidebar from "./components/layout/ukicSidebar/ICSidebar";

import ProtectedLayout from "./layouts/ProtectedLayout";
import PublicLayout from "./layouts/PublicLayout";
import type { JSX } from "@emotion/react/jsx-runtime";

import Login from "./pages/login/Login";
import NotFound from "./pages/NotFound";
import Loader from "./components/ui/loader/Loader";
import SignUp from "./pages/signup/SignUp";
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Products = lazy(() => import("./pages/products/Products"));
const Sales = lazy(() => import("./pages/sales/Sales"));
const Inventory = lazy(() => import("./pages/inventory/Inventory"));

export const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to='/login' replace />;
};

export const PublicRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to='/' replace /> : children;
};

const AppRoutes = () => {
  return (
    <Routes>
      {/* We can have multiple route layouts here */}
      <Route
        path=''
        element={
          <PublicRoute>
            <PublicLayout />
          </PublicRoute>
        }
      >
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
      </Route>

      <Route
        path='/'
        element={
          <ProtectedRoute>
            <ProtectedLayout />
          </ProtectedRoute>
        }
      >
        <Route
          index
          element={
            <Suspense fallback={<Loader />}>
              <Dashboard />
            </Suspense>
          }
        />
        <Route
          path='products'
          element={
            <Suspense fallback={<Loader />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path='sales'
          element={
            <Suspense fallback={<Loader />}>
              <Sales />
            </Suspense>
          }
        />
        <Route
          path='inventory'
          element={
            <Suspense fallback={<Loader />}>
              <Inventory />
            </Suspense>
          }
        />
        <Route path='*' element={<NotFound />} />
      </Route>

      {/* <Route element={<AdminLayout}>
           Admin routes will go here if you want role specific routes
        </Route> */}

      {/* FallbackRoute 404*/}
      {/* <Route path='*' element={<NotFound />} /> */}
    </Routes>
  );
};

export default AppRoutes;
