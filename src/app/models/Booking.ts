import { DataTypes } from 'sequelize';
import sequelize from '../db/database';
import User from './User';


const Booking = sequelize.define('Booking', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bookingTime: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM,
        values: ['pending', 'canceled', 'confirmed']
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'bookings',
    timestamps: true,
});

Booking.belongsTo(User, { foreignKey: 'userId' })
User.hasMany(Booking, { foreignKey: 'userId' })

export default Booking;