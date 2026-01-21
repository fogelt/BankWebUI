import { Navigate, Outlet } from 'react-router-dom';
import { paths } from '@/config/paths';

export const ProtectedRoute = () => {
  const token = sessionStorage.getItem("bank_token");

  if (!token) {
    return <Navigate to={paths.login.path} replace />;
  }

  return <Outlet />;
};