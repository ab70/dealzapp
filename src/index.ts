import express, { Request, Response } from "express";
import dotenv from "dotenv";
import initRoutes from "./app/routes/api";
import db from "./app/models/model_init"
import bodyParser = require("body-parser");
// configures dotenv to work in your application
dotenv.config();
const app = express();
// app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT;
db.sequelize.sync()
    .then(() => console.log("Database synced.."))
    .catch((err: any) => console.log("DB Error", err))
app.listen(PORT, () => {
    console.log("Server running at PORT: ", PORT);
}).on("error", (error) => {
    // gracefully handle error
    throw new Error(error.message);
});
initRoutes(app)
