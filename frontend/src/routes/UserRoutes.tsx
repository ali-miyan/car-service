import { Route, Routes } from "react-router-dom";
import Home from "../pages/userPages/Home";
import Profile from "../pages/userPages/UserProfile";
import Protect from "./protectedRoutes/UserProtectedRoute";
import Verify from "./protectedRoutes/UserVerifyRoute";
import ForBusiness from "../pages/userPages/ForBusinessPage";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Verify element={Home} />} />
    <Route path="/home" element={<Protect element={Home} />} />
    <Route path="/profile" element={<Protect element={Profile} />} />
    <Route path="/for-business" element={<ForBusiness />} />
  </Routes>
);

export default UserRoutes;
