const Sequelize = require('sequelize'),
CONFIG = require('./app.config'),
sequelize = new Sequelize(CONFIG.APP_CONFIG.DATABASE_NAME, CONFIG.APP_CONFIG.USER_NAME, CONFIG.APP_CONFIG.PASSWORD, {
    host: CONFIG.APP_CONFIG.HOST_NAME,
    dialect: 'mysql',
    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
    port: CONFIG.APP_CONFIG.DATABASE_PORT
});

module.exports = {
    Sequelize : Sequelize,
    sequelize : sequelize
};