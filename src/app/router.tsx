import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import { paths } from '@/config/paths'
import { ProtectedRoute } from '@/components/auth/protected-route';

import {
  default as AppRoot,
  ErrorBoundary as AppRootErrorBoundary,
} from './routes/app/root';

const convert = (queryClient: QueryClient) => (m: any) => {
  const { clientLoader, clientAction, default: Component, ...rest } = m;
  return {
    ...rest,
    loader: clientLoader?.(queryClient),
    action: clientAction?.(queryClient),
    Component,
  };
};

export const createAppRouter = (queryClient: QueryClient) =>
  createBrowserRouter([
    {
      path: '/',
      element: <AppRoot />,
      ErrorBoundary: AppRootErrorBoundary,
      children: [
        { path: paths.login.path, lazy: () => import('./routes/auth/login').then(convert(queryClient)) },
        { path: paths.register.path, lazy: () => import('./routes/app/register').then(convert(queryClient)) },
        {
          element: <ProtectedRoute />, // All children here require login
          children: [
            {
              path: paths.dashboard.path, lazy: () => import('./routes/app/dashboard').then(convert(queryClient))
            },
          ]
        },
        {
          path: '/',
          element: <Navigate to={paths.dashboard.path} replace />,
        }
      ],
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};