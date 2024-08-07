import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('testdb', 'postgres', '1234', {
  host: 'localhost',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  define: {
    charset: 'utf8',
    collate: 'utf8_general_ci',
    timestamps: true
  }
});

export default sequelize;
