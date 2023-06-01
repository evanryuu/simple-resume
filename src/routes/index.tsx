import { createBrowserRouter } from 'react-router-dom'

import Layout from '@/layouts'
import About from '@/pages/about'
import Home from '@/pages/home'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/home',
        element: <Home />,
      },
      {
        path: '/about',
        element: <About />,
      },
    ],
  },

])

export default router
