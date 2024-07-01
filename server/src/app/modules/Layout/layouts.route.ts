import express from 'express';
import auth from '../../middleware/auth';
import { USER_ROLE } from '../User/user.constant';
import { LayoutControllers } from './layouts.controller';
import validateRequest from '../../middleware/validationRequest';
import { layoutsValidation } from './layouts.validation';
const router = express.Router();


router.post('/create', auth(USER_ROLE.admin), validateRequest(layoutsValidation.createLayoutZodSchema), LayoutControllers.createLayout)
router.put('/update', auth(USER_ROLE.admin), validateRequest(layoutsValidation.updateLayoutZodSchema), LayoutControllers.editLayout)
router.get('/get-layout', validateRequest(layoutsValidation.getLayoutZodSchema), LayoutControllers.getLayout)


export const LayoutRoutes = router;