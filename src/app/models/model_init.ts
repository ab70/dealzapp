import sequelize from "../db/database";
import User from "./User";
import Vendor from "./Vendor";
import Booking from "./Booking";

const db = {
    sequelize,
    User,
    Vendor,
    Booking
}

export default db;