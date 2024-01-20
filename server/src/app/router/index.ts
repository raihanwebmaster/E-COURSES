import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
