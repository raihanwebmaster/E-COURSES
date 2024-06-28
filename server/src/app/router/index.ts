import { Router } from 'express';
import { AuthRoutes } from '../modules/Auth/auth.route';
import { UserRoutes } from '../modules/User/user.route';
import { CourseRoutes } from '../modules/Course/course.route';
import { OrderRoutes } from '../modules/Order/order.route';
import { NotificationRoutes } from '../modules/Notification/notification.route';
import { AnalyticsRoutes } from '../modules/Analytics/analytics.route';
import { LayoutRoutes } from '../modules/Layout/layouts.route';

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
  {
    path: '/notifications',
    route: NotificationRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
  {
    path: '/layouts',
    route: LayoutRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
