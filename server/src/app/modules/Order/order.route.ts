import express from 'express';
import auth from '../../middleware/auth';
import validateRequest from '../../middleware/validationRequest';
import { USER_ROLE } from '../User/user.constant';
import { OderControllers } from './order.controller';
import { OrderValidation } from './order.validation';

const router = express.Router();

router.post("/create-order",
    auth(USER_ROLE.user, USER_ROLE.admin),
    validateRequest(OrderValidation.CreateOrderValidationSchema),
    OderControllers.createOder
);

router.get("/all-orders",
    auth(USER_ROLE.admin),
    OderControllers.getAllOrders
);

router.get("/stripe-publishable-key",
    OderControllers.sendStripePublishableKey
);

router.post("/payment",
    auth(USER_ROLE.user, USER_ROLE.admin),
    OderControllers.newPayment
);


export const OrderRoutes = router;
