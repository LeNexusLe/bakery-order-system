import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token) return <Navigate to="/login" replace />;

  if (role && userRole !== role) {
    return <Navigate to={userRole === "ADMIN" ? "/admin" : "/client"} replace />;
  }

  return children;
}
