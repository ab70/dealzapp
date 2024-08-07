import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/database';
import Vendor from './Vendor';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    userType: 'user' | 'vendor' | 'admin';
    vendorId?: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, 'id' | 'vendorId'> {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public userType!: 'user' | 'vendor' | 'admin';
    public vendorId?: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

User.init({
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
        type: DataTypes.ENUM('user', 'vendor', 'admin'),
    },
    vendorId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    sequelize,
    tableName: 'users',
    timestamps: true,
});

User.belongsTo(Vendor, { foreignKey: 'vendorId' });
Vendor.hasMany(User, { foreignKey: 'vendorId' });

export default User;
