import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';


const orderSchema = new Schema<IOrder, OrderModel>(
  {
    courseId: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentInfo: { type: Object, required: false },
  }, { timestamps: true }
);


export const Order = model<IOrder, OrderModel>('Order', orderSchema);
