import { Navigate } from "react-router-dom";

export default function RequireAuth({ children, role }) {
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  if (!token || !userRole) return <Navigate to="/login" replace />;

  if (role && userRole !== role) {
    if (userRole === "ADMIN") return <Navigate to="/admin" replace />;
    if (userRole === "CLIENT") return <Navigate to="/client" replace />;
    return <Navigate to="/login" replace />;
  }

  return children;
}
