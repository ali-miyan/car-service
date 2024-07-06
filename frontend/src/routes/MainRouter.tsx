import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import CompanyRoutes from "./CompanyRoutes";
import { FormProvider } from "../context/RegisterContext";
import { LocationProvider } from "../context/MapContext";

const Router = () => {
  return (
    <BrowserRouter>
      <FormProvider>
        <LocationProvider>
          <Routes>
            <Route path="/*" element={<UserRoutes />} />
            <Route path="/admin/*" element={<AdminRoutes />} />
            <Route path="/company/*" element={<CompanyRoutes />} />
          </Routes>
        </LocationProvider>
      </FormProvider>
    </BrowserRouter>
  );
};

export default Router;
