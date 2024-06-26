import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { OrderRoutes } from '../modules/Order/order.route';

const router = Router();

const modulesRoutes = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/courses',
    route: CourseRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
