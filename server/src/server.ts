import { app } from "./app";
import config from "./app/config";


app.listen(config.port, () => {
    console.log(`Server is connected with port ${config.port}`)
} )