import { Route, Routes } from "react-router-dom";
import Login from "../components/admin/Login";
import AdminVerifyRoute from "./protectedRoutes/AdminVerifyRoute";
import AdminProtectedRoute from "./protectedRoutes/AdminProtectedRoute";
import Dashboard from "../components/admin/Home";

const AdminRoutes = () => (
  <>
    <Routes>
      <Route path="login" element={<AdminVerifyRoute element={Login} />} />
      <Route path="home" element={<AdminProtectedRoute element={Dashboard} />} />
    </Routes>
  </>
);

export default AdminRoutes;
