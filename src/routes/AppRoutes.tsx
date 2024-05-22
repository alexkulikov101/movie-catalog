import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { Layout } from 'components/Layout'
import { Movies } from 'features/movies'

export function AppRoutes() {
  const routes = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Movies />,
        },
      ],
    },
    {
      path: '*',
      element: <div>Page not found</div>,
    },
  ])
  return <RouterProvider router={routes} />
}
