import { Route, Routes } from "react-router-dom";
import Home from "../pages/userPages/Home";
import ChangePassword from "../pages/userPages/ChangePassword";
import NewPasswordPage from "../pages/userPages/NewPasswordPage";
import Profile from "../pages/userPages/UserProfile";
import Protect from "./protectedRoutes/UserProtectedRoute";
import Verify from "./protectedRoutes/UserVerifyRoute";
import ForBusiness from "../pages/userPages/ForBusinessPage";
import Services from "../pages/userPages/ServicePage";
import AboutCompany from "../pages/userPages/AboutCompany";
import SelectedService from "../pages/userPages/SelectedServicePage";
import SetSpot from "../pages/userPages/SetSpotPage";
import ShedulePage from "../pages/userPages/ShedulePage";
import AtHome from "../pages/userPages/AtHome";
import AtServiceCenter from "../pages/userPages/AtServiceCenter";
import CheckoutPage from "../pages/userPages/CheckoutPage";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Verify element={Home} />} />
    <Route path="/home" element={<Protect element={Home} />} />
    <Route path="/services" element={<Services />} />
    <Route path="/profile" element={<Protect element={Profile} />} />
    <Route path="/for-business" element={<ForBusiness />} />
    <Route path="/change-password" element={<Verify element={ChangePassword} />} />
    <Route path="/reset-password/:token" element={<Verify element={NewPasswordPage} />} />
    <Route path="/about-company/:id" element={<AboutCompany />} />
    <Route path="/selected-service/:id" element={<SelectedService />} />
    <Route path="/set-spot/:id" element={<SetSpot />} />
    <Route path="/service-shedule/:id" element={<ShedulePage />} />
    <Route path="/service-at-home/:id" element={<AtHome />} />
    <Route path="/service-at-center/:id" element={<AtServiceCenter />} />
    <Route path="/checkout/:id" element={<CheckoutPage />} />
  </Routes>
);

export default UserRoutes;
