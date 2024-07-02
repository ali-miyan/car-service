import { Route, Routes } from "react-router-dom";
import Register1 from "../pages/companyPages/Register1";
import Register2 from "../pages/companyPages/Register2";
import Register3 from "../pages/companyPages/Register3";

const CompanyRoutes = () => (
  <Routes>
    <Route path="register-1" element={<Register1 />} />
    <Route path="register-2" element={<Register2 />} />
    <Route path="register-3" element={<Register3 />} />
  </Routes>
);

export default CompanyRoutes;
