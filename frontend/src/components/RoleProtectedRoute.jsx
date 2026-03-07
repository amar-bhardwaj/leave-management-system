import { Navigate } from "react-router-dom";

function RoleProtectedRoute({ children, role }) {

  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  // If user is not logged in
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // If role is required and does not match
  if (role && userRole !== role) {
    return <Navigate to="/login" replace />;
  }

  // Allow access
  return children;
}

export default RoleProtectedRoute;