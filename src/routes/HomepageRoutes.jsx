import { lazy } from 'react';

const Homepage = lazy(() => import('src/views/homepage'));
const NotFound = lazy(() => import('src/views/not-found'));

const HomepageRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <Homepage />,
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ],
};

export default HomepageRoutes;
