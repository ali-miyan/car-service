import { Route, Routes } from "react-router-dom";
import Register1 from "../pages/companyPages/Register1";
import Register2 from "../pages/companyPages/Register2";
import Register3 from "../pages/companyPages/Register3";
import Login from "../pages/companyPages/CompanyLogin";
import Home from "../pages/companyPages/Home";
import Services from "../pages/companyPages/ServicesPage";
import AddServices from "../pages/companyPages/AddServicesPage";
import CompanyVerifyRoute from "./protectedRoutes/CompanyVerifyRoute";
import CompanyProtectedRoute from "./protectedRoutes/CompanyProtectedRoute";

const CompanyRoutes = () => (
  <Routes>
    <Route path="register-1" element={<CompanyVerifyRoute element={Register1} />} />
    <Route path="register-2" element={<CompanyVerifyRoute element={Register2} />} />
    <Route path="register-3" element={<CompanyVerifyRoute element={Register3} />} />
    <Route path="login" element={<CompanyVerifyRoute element={Login} />} />
    <Route path="home" element={<CompanyProtectedRoute element={Home} />} />
    <Route path="services" element={<CompanyProtectedRoute element={Services} />} />
    <Route path="add-services" element={<CompanyProtectedRoute element={AddServices} />} />
  </Routes>
);

export default CompanyRoutes;
