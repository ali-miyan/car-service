import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminRoutes from "./AdminRoutes";
import UserRoutes from "./UserRoutes";
import CompanyRoutes from "./CompanyRoutes";
import { FormProvider } from "../context/RegisterContext";

const Router = () => {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route path="/*" element={<UserRoutes />} />
          <Route path="/admin/*" element={<AdminRoutes />} />
          <Route path="/company/*" element={<CompanyRoutes />} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
};

export default Router;
