import { Model, Types } from "mongoose";

export interface IOrder {
    courseId: Types.ObjectId;
    user: Types.ObjectId;
    paymentInfo: object
}


export interface OrderModel extends Model<IOrder> {

}