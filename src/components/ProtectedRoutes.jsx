import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes = () => {
  // La función getUser() devuelve el usuario si está logueado o null si no lo está.
  const usuario = sessionStorage.getItem('authToken');
  if (!usuario) {
    return <Navigate to="/login" />;
  }
  return <Outlet />;
};

export default ProtectedRoutes;