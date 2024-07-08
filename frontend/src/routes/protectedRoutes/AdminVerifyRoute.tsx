import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

interface ProtectedRouteProps {
  element: React.ComponentType;
}

const AdminVerifyRoute: React.FC<ProtectedRouteProps> = ({
  element: Component,
}) => {
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.adminAuth.admin);

  console.log(token,'admintoken');
  

  useEffect(() => {
    if (token) {
      navigate('/admin/home');
    }
  }, [token, navigate]);

  if (token) {
    return null;
  }

  return <Component />;
};

export default AdminVerifyRoute;
