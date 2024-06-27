
import { Notification } from "./notification.model";


const getNotificationsIntoDB = async () => {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return notifications;

}

const updateNotificationIntoDB = async (notificationId: string) => {
    await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return notifications;
}

export const NotificationServices = {
    getNotificationsIntoDB,
    updateNotificationIntoDB
}