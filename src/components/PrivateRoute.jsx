// src/routes/PrivateRoute.jsx
import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
  const user = true;

  // if (loading) return <div className="text-center mt-10">Loading...</div>;

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}
