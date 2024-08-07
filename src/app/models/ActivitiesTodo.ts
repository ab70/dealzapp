import { DataTypes } from 'sequelize';
import sequelize from '../db/database';
import User from './User';


const ActivitiesTodo = sequelize.define('ActivitiesTodo', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    description: {
        type: DataTypes.DATE
    },
    price: {
        type: DataTypes.INTEGER,
    },
    durationInMinutes: {
        type: DataTypes.INTEGER,
    },
    status: {
        type: DataTypes.ENUM,
        values: ['available', 'unavailable']
    },
    createdBy: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'activitiesToDos',
    timestamps: true,
});

ActivitiesTodo.belongsTo(User, { foreignKey: 'createdBy' })
User.hasMany(ActivitiesTodo, { foreignKey: 'createdBy' })

export default ActivitiesTodo;