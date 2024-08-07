import { DataTypes } from 'sequelize';
import sequelize from '../db/database';

const Vendor = sequelize.define('Vendor', {
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
    type: DataTypes.ENUM,
    values: ['active', 'inactive'],
    defaultValue: ['active']
  },
}, {
  tableName: 'vendors',
  timestamps: true,
});

export default Vendor;
