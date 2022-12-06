import { lazy } from 'react';

type Router = {
  path: string;
  component: any;
  children?: Router[];
};

const routers: Router[] = [
  {
    path: '/',
    component: lazy(() => import('@/pages/Home')),
  },
  {
    path: '/login',
    component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '/register',
    component: lazy(() => import('@/pages/Login')),
  },
  {
    path: '/about',
    component: lazy(() => import('@/pages/About')),
  },
  {
    path: '/test',
    component: lazy(() => import('@/pages/TestClass')),
  },
];

export default routers;
