import { generateLast12MonthsData } from "../../utils/analytics.generator"
import { Course } from "../Course/course.model";
import { Order } from "../Order/order.model";
import { User } from "../User/user.model";

const getUsersAnalyticsFromDB = async () => {
    const users = await generateLast12MonthsData(User);
    return users;
}


const getCousesAnalyticsFromDB = async () => {
    const courses = await generateLast12MonthsData(Course);
    return courses;
}

const getOrdersAnalyticsFromDB = async () => {
    const orders = await generateLast12MonthsData(Order);
    return orders;

}

export const AnalyticsService = {
    getUsersAnalyticsFromDB,
    getCousesAnalyticsFromDB,
    getOrdersAnalyticsFromDB
}