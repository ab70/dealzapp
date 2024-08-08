import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/database';

// Define the enum inline
enum VendorStatus {
    ACTIVE = 'active',
    INACTIVE = 'inactive',
}

interface VendorAttributes {
    id: number;
    name: string;
    image?: string;
    status: VendorStatus;
}

interface VendorCreationAttributes extends Optional<VendorAttributes, 'id' | 'image'> {}

class Vendor extends Model<VendorAttributes, VendorCreationAttributes> implements VendorAttributes {
    public id!: number;
    public name!: string;
    public image?: string;
    public status!: VendorStatus;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

Vendor.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    image: {
        type: DataTypes.STRING(128),
        allowNull: true,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(VendorStatus)), // Use the enum values
        allowNull: false,
        defaultValue: VendorStatus.ACTIVE,
    },
}, {
    sequelize,
    tableName: 'vendors',
    timestamps: true,
});

export default Vendor;
