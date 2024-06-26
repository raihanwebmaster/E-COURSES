import { Schema, model } from "mongoose";
import { INotification, NotificationModel } from "./notification.interface";

const notificationSchema = new Schema<INotification, NotificationModel>(
    {
        title: { type: String, required: true },
        message: { type: String, required: true },
        status: { type: String, required: true, default: 'unread' },
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true }
    }, { timestamps: true }
);

export const Notification = model<INotification, NotificationModel>('Notification', notificationSchema);