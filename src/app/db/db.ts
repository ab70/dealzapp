const config = require("config");

const configuration = config.get("database");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    configuration.DB,
    configuration.USER,
    configuration.PASSWORD, {
    host: configuration.HOST,
    dialect: configuration.dialect,
    pool: {
        max: configuration.pool.max,
        min: configuration.pool.min,
        acquire: configuration.pool.acquire,
        idle: configuration.pool.idle
    },
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        timestamps: true
    }
}
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);
db.place = require("../models/place.model.js")(sequelize, Sequelize);
db.activitiesToDo = require("../models/activitiesToDo.model.js")(sequelize, Sequelize);
db.image = require("../models/image.model.js")(sequelize, Sequelize);
db.booking = require("../models/booking.model.js")(sequelize, Sequelize);
db.location = require("../models/location.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
    through: "user_roles"
});
db.user.belongsToMany(db.role, {
    through: "user_roles"
});

db.place.hasMany(db.activitiesToDo, { foreignKey: { allowNull: false } });
db.activitiesToDo.belongsTo(db.place);

db.place.hasMany(db.image, { foreignKey: { allowNull: false } });
db.image.belongsTo(db.place);

db.user.hasMany(db.place, { foreignKey: { allowNull: false } });
db.place.belongsTo(db.user);

db.location.hasMany(db.activitiesToDo, { foreignKey: { allowNull: false } });
db.activitiesToDo.belongsTo(db.location);

db.place.hasMany(db.booking, { foreignKey: { allowNull: false } });
db.booking.belongsTo(db.place);

db.user.hasMany(db.booking, { foreignKey: { allowNull: false } });
db.booking.belongsTo(db.user);


// roles
db.ROLES = ["superadmin", "merchant", "user"];

module.exports = db;