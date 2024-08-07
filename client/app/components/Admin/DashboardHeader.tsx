"use client";
import ThemeSwitcher from "../../utils/ThemeSwitcher";
import React, { FC, useEffect, useState } from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { format } from "timeago.js";
import socketIO from "socket.io-client";
import {
  useGetNotificationsQuery,
  useUpdateNotifcationMutation,
} from "@/redux/features/notifications/notificationsApi";
const ENDPOINT = process.env.NEXT_PUBLIC_SOCKET_URL || "";
const socketId = socketIO(ENDPOINT, { transports: ["websocket"] });

type Props = {
  open?: boolean;
  setOpen: (open: boolean) => void;
};

const DashboardHeader: FC<Props> = ({ open, setOpen }) => {
  const { data, refetch } = useGetNotificationsQuery(undefined, {
    refetchOnMountOrArgChange: true,
  });
  const [updateNotifcation, { isSuccess }] = useUpdateNotifcationMutation();
  const [notifications, setNotifications] = useState<any>([]);
  const [audio] = useState(
    new Audio(
      "https://res.cloudinary.com/dpsfzvqpt/video/upload/v1722934013/notificationsound/pugvqqyvnf7kfxxy11xf.mp3"
    )
  );
  const playerNotification = () => {
    audio.play();
  };
  useEffect(() => {
    if (data) {
      setNotifications(data.data.filter((item: any) => item.status === "unread"));
    }
    if (isSuccess) {
      refetch();
    }
    audio.load();
  }, [data, isSuccess]);

  useEffect(() => {
    socketId.on("newNotification", (data: any) => {
      playerNotification();
      refetch();
    });
  }, []);

  const handleNotificationStatusChange = async (id: string) => {
    const notificationElement = document.getElementById(id);
    if (notificationElement) {
      notificationElement.classList.add("fade-out");
      await updateNotifcation(id);
      setTimeout(async () => {
        notificationElement.classList.remove("fade-out");
      }, 500);
    }
  };

  return (
    <div className="w-full flex items-center justify-end p-6 fixed top-5 right-0 z-[9999999]">
      <ThemeSwitcher />
      <div
        className="relative cursor-pointer m-2"
        onClick={() => setOpen(!open)}
      >
        <IoMdNotificationsOutline className="text-2xl cursor-pointer dark:text-white text-black" />
        <span className="absolute -top-2 -right-2 bg-[#3ccba0] rounded-full w-[20px] h-[20px] text-[12px] flex items-center justify-center text-white">
          {notifications && notifications.length}
        </span>
      </div>
      {open && (
        <div className="w-[350px] h-[60vh] overflow-y-auto py-3 px-2 border border-[#ffffff0c] dark:bg-[#111C43] bg-white shadow-xl absolute top-16 z-[1000000000] rounded">
          <h5 className="text-center text-[20px] font-Poppins text-black dark:text-white p-3">
            Notifications
          </h5>
          {notifications &&
            notifications.map((item: any, index: number) => (
              <div
                id={item._id}
                className="notification-item dark:bg-[#2d3a4e] bg-[#00000013] font-Poppins border-b dark:border-b-[#ffffff47] border-b-[#0000000f]"
                key={index}
              >
                <div className="w-full flex items-center justify-between p-2">
                  <p className="text-black dark:text-white">{item.title}</p>
                  <p
                    className="text-black dark:text-white cursor-pointer"
                    onClick={() => handleNotificationStatusChange(item._id)}
                  >
                    Mark as read
                  </p>
                </div>
                <p className="px-2 text-black dark:text-white">{item.message}</p>
                <p className="p-2 text-black dark:text-white text-[14px]">
                  {format(item.createdAt)}
                </p>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default DashboardHeader;
