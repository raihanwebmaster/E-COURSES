
import { Notification } from "./notification.model";
import cron from 'node-cron';


const getNotificationsIntoDB = async () => {
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return notifications;

}

const updateNotificationIntoDB = async (notificationId: string) => {
    await Notification.findByIdAndUpdate(notificationId, { status: 'read' }, { new: true });
    const notifications = await Notification.find().sort({ createdAt: -1 });
    return notifications;
}

cron.schedule("0 0 0 * * *", async () => {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)   // 30 days ago;
    await Notification.deleteMany({ status: 'read', createdAt: { $lt: thirtyDaysAgo } });
    console.log('Cron job running every day at 00:00:00');
}); // This will run every day at 00:00:00

export const NotificationServices = {
    getNotificationsIntoDB,
    updateNotificationIntoDB
}