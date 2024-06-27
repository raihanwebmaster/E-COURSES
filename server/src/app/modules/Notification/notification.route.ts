import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { NotificationControllers } from './notification.controller';

const router = express.Router();

router.get("/", auth(USER_ROLE.admin), NotificationControllers.getNotifications)


export const NotificationRoutes = router;