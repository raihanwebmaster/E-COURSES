
import app from "./app";
import config from "./app/config";
import connectDB from "./app/utils/db";
import http from "http";
import { initSocketServer } from "./socketServer";

const server = http.createServer(app);


initSocketServer(server);


server.listen(config.port, () => {
    console.log(`Server is connected with port ${config.port} 🚀`);
    connectDB()
})