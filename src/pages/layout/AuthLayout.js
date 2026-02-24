import React from 'react';
import useAuthStore from '../../store/useAuthStore';
import { Navigate, Outlet } from 'react-router-dom';

const AuthLayout = () => {

  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)
  
  if (!isAuthenticated) {
    return <Navigate to={ "/" } replace />
  }

  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AuthLayout;