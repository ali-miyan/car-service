import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const CompanyVerifyRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.companyAuth.company);

  useEffect(() => {
    if (token) {
      navigate('/company/login');
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return <Component />;
};

export default CompanyVerifyRoute;
