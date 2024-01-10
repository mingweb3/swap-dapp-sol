import * as React from 'react'
import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom'

import { HomePage } from './pages/Home/Loadable'
import { ErrorPage } from './pages/Error/Loadable'
import { SwapPage } from './pages/Swap/Loadable'

import { PATHS } from '@/constants/paths'
import { RootLayout } from './components/RootLayout'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Outlet />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: PATHS.HOME,
        element: <HomePage />
      },
      {
        path: PATHS.SWAP,
        element: <RootLayout />,
        children: [
          {
            path: '',
            element: <SwapPage />
          }
        ]
      }
    ]
  }
])

export const App: React.FC = () => {
  return <RouterProvider router={router} />
}
