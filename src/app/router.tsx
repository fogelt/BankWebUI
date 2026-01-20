import { QueryClient, useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { paths } from '@/config/paths'

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
      HydrateFallback: () => (
        <div className="flex h-screen items-center justify-center">
          <span className="text-[10px] uppercase tracking-widest text-stone-400">
            Laddar...
          </span>
        </div>
      ),
      children: [
        { path: paths.login.path, lazy: () => import('./routes/app/login').then(convert(queryClient)) },
      ],
    }
  ]);

export const AppRouter = () => {
  const queryClient = useQueryClient();
  const router = useMemo(() => createAppRouter(queryClient), [queryClient]);
  return <RouterProvider router={router} />;
};