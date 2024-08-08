import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db/database';
import User from './User';

// Define the enum within the same file
export enum ActivitiesStatus {
    AVAILABLE = 'available',
    UNAVAILABLE = 'unavailable',
}

interface ActivitiesTodoAttributes {
    id: number;
    description: string;
    price: number;
    durationInMinutes: number;
    status: ActivitiesStatus;
    createdBy: number;
}

interface ActivitiesTodoCreationAttributes extends Optional<ActivitiesTodoAttributes, 'id'> {}

class ActivitiesTodo extends Model<ActivitiesTodoAttributes, ActivitiesTodoCreationAttributes> implements ActivitiesTodoAttributes {
    public id!: number;
    public description!: string;
    public price!: number;
    public durationInMinutes!: number;
    public status!: ActivitiesStatus;
    public createdBy!: number;

    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}

ActivitiesTodo.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    durationInMinutes: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    status: {
        type: DataTypes.ENUM(...Object.values(ActivitiesStatus)), // Use the enum values
        allowNull: false,
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, {
    sequelize,
    tableName: 'activitiesToDos',
    timestamps: true,
});

ActivitiesTodo.belongsTo(User, { foreignKey: 'createdBy' });
User.hasMany(ActivitiesTodo, { foreignKey: 'createdBy' });

export default ActivitiesTodo;
