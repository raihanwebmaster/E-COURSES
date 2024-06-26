import { Model, Types } from "mongoose";

export interface INotification {
    title: string;
    message: string;
    status: string;
    user: Types.ObjectId;
}


export interface NotificationModel  extends Model<INotification> {

}