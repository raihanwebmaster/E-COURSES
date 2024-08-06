import { Server as SocketIOServer } from "socket.io";
import http from "http";

export const initSocketServer = (server: http.Server) => {
    const io = new SocketIOServer(server);

    io.on("connection", (socket) => {
        console.log(`User connected: ${socket.id}`);

        socket.on("notification", (data) => {
            //Boardcase the notification data to all connected clients (admin dashboard)
            io.emit("newNotification", data);
        });

        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
} 