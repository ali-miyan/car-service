import { Route, Routes } from "react-router-dom";
import Register1 from "../pages/companyPages/Register1";
import Register2 from "../pages/companyPages/Register2";
import Register3 from "../pages/companyPages/Register3";
import Login from "../components/company/LoginPage";
import CompanyVerifyRoute from "./protectedRoutes/CompanyVerifyRoute";

const CompanyRoutes = () => (
  <Routes>
    <Route path="register-1" element={<CompanyVerifyRoute element={Register1} />} />
    <Route path="register-2" element={<CompanyVerifyRoute element={Register2} />} />
    <Route path="register-3" element={<CompanyVerifyRoute element={Register3} />} />
    <Route path="login" element={<Login />} />
  </Routes>
);

export default CompanyRoutes;
