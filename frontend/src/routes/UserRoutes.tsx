import { Route, Routes } from "react-router-dom";
import Home from "../pages/userPages/Home";

const UserRoutes = () => (
  <Routes>
    <Route path="/" element={<Home />} />
  </Routes>
);

export default UserRoutes;
