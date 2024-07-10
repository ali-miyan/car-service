import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getInitialToken } from "../../helpers/getToken";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const AdminProtectedRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = getInitialToken("admintoken");

  console.log(token, "tokentokentoken");

  useEffect(() => {
    if (!token) {
      navigate("/admin/login");
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  return <Component />;
};

export default AdminProtectedRoute;
