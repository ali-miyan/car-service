import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInitialToken } from "../../helpers/getToken";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const AdminVerifyRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = getInitialToken("admintoken");

  console.log(token, "admintoken");

  useEffect(() => {
    if (token) {
      navigate("/admin/home");
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return <Component />;
};

export default AdminVerifyRoute;
