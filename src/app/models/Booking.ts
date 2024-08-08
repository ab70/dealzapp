import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/database';
import User from './User';

// Define the enum inline
enum BookingStatus {
    PENDING = 'pending',
    CANCELED = 'canceled',
    CONFIRMED = 'confirmed',
}

interface BookingAttributes {
    id: number;
    bookingTime: Date;
    units: number;
    status: BookingStatus;
    confirmedBy?: number;
    userId: number;
    updatedBy?: number;
}

interface BookingCreationAttributes extends Optional<BookingAttributes, 'id' | 'confirmedBy' | 'updatedBy'> {}

class Booking extends Model<BookingAttributes, BookingCreationAttributes> implements BookingAttributes {
    public id!: number;
    public bookingTime!: Date;
    public units!: number;
    public status!: BookingStatus;
    public confirmedBy?: number;
    public userId!: number;
    public updatedBy?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Booking.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    bookingTime: {
        type: DataTypes.DATE,
        allowNull: false,
    },
    units: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(BookingStatus)), // Use the enum values
        allowNull: false,
    },
    confirmedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    updatedBy: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
}, {
    sequelize,
    tableName: 'bookings',
    timestamps: true,
});

Booking.belongsTo(User, { foreignKey: 'userId' });
User.hasMany(Booking, { foreignKey: 'userId' });

// Add the relation for `updatedBy`
Booking.belongsTo(User, { as: 'UpdatedByUser', foreignKey: 'updatedBy' });
User.hasMany(Booking, { as: 'UpdatedBookings', foreignKey: 'updatedBy' });

export default Booking;
