
import app from "./app";
import config from "./app/config";
import connectDB from "./app/utils/db";


app.listen(config.port, () => {
    console.log(`Server is connected with port ${config.port}`)
    connectDB()
} )