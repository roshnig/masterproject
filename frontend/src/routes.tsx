import { Route, Routes } from "react-router";
import Layout from "./layouts/Layout";
import NotFound from "./pages/NotFound";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";

const AppRoutes = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
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
