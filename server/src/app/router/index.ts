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
    path: '/course',
    route: CourseRoutes,
  },
  {
    path: '/order',
    route: OrderRoutes,
  },
  {
    path: '/notification',
    route: NotificationRoutes,
  },
  {
    path: '/analytics',
    route: AnalyticsRoutes,
  },
  {
    path: '/layout',
    route: LayoutRoutes,
  },
];
modulesRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
