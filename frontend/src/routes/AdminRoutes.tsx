import { Route, Routes } from "react-router-dom";
import Login from "../components/admin/Login";

const AdminRoutes = () => (
  <>
    <Routes>
      <Route path="login" element={<Login />} />
    </Routes>
  </>
);

export default AdminRoutes;
