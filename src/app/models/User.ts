import { DataTypes } from 'sequelize';
import sequelize from '../db/database';
import Vendor from './Vendor';

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    username: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING(128),
        allowNull: false
    },
    userType: {
        type: DataTypes.ENUM,
        values: ['user', 'vendor', 'admin']
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'users',
    timestamps: true,
});


User.belongsTo(Vendor, { foreignKey: 'vendorId' })
Vendor.hasMany(User, { foreignKey: 'vendorId' })

export default User;
