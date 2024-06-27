
import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { AnalyticsControllers } from './analytics.controller';
const router = express.Router();

router.get('/users', auth(USER_ROLE.admin), AnalyticsControllers.getUsersAnalytics)
router.get('/courses', auth(USER_ROLE.admin), AnalyticsControllers.getCoursesAnalytics)
router.get('/orders', auth(USER_ROLE.admin), AnalyticsControllers.getOrdersAnalytics)


export const AnalyticsRoutes = router;