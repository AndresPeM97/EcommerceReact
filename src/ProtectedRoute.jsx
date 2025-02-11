import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token"); // O sessionStorage
  return token ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
