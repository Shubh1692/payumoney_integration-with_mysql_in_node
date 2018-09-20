const common = require('./common'),
    CONFIG = require('./app.config');
transaction = common.sequelize.define(CONFIG.APP_CONFIG.TRANSACTION_TABLE_NAME, {
    transaction_id: {
        type: common.Sequelize.INTEGER,
        field: 'transaction_id',
        primaryKey: true,
        autoIncrement: true
    },
    user_id: {
        type: common.Sequelize.STRING,
        field: 'user_id',
        primaryKey: true
    },
    amount: {
        type: common.Sequelize.DECIMAL,
        field: 'amount',
        defaultValue: 0,
        allowNull: false
    },
    payment_status: {
        type: common.Sequelize.ENUM,
        values: ['pending', 'success', 'failed'],
        field: 'payment_status',
        defaultValue: 'pending',
        allowNull: false
    },
}, {
        timestamps: false,
        freezeTableName: true,
        tableName: 'transaction'
    });
module.exports = transaction;