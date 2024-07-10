import { Route, Routes } from "react-router-dom";
import Login from "../pages/adminPages/LoginPage";
import AdminVerifyRoute from "./protectedRoutes/AdminVerifyRoute";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";
import Dashboard from "../pages/adminPages/HomePage";
import ServicesList from "../pages/adminPages/ServicePage";
import AddService from "../pages/adminPages/AddService";

const AdminRoutes = () => (
  <>
    <Routes>
      <Route path="login" element={<AdminVerifyRoute element={Login} />} />
      <Route path="home" element={<AdminProtectedRoute element={Dashboard} />} />
      <Route path="services" element={<AdminProtectedRoute element={ServicesList} />} />
      <Route path="add-service" element={<AdminProtectedRoute element={AddService} />} />
    </Routes>
  </>
);

export default AdminRoutes;
