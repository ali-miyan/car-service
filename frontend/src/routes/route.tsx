import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/userPages/Home";
import Register1 from "../pages/companyPages/Register1";
import Register2 from "../pages/companyPages/Register2";
import Register3 from "../pages/companyPages/Register3";
import { FormProvider } from "../context/RegisterContext";

const Router = () => {
  return (
    <BrowserRouter>
      <FormProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register-1" element={<Register1 />} />
          <Route path="/register-2" element={<Register2 />} />
          <Route path="/register-3" element={<Register3 />} />
        </Routes>
      </FormProvider>
    </BrowserRouter>
  );
};

export default Router;
