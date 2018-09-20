module.exports = {
    APP_CONFIG: {
        HOST_NAME: process.env.HOST_NAME || 'sql7.freemysqlhosting.net',
        USER_NAME: process.env.USER_NAME ||'sql7257347',
        DATABASE_NAME: process.env.DATABASE_NAME ||'sql7257347',
        PASSWORD: process.env.PASSWORD ||'9TlAGzPQSG',
        DATABASE_PORT: process.env.DATABASE_PORT ||3306,
        NODE_SERVER_PORT: process.env.NODE_SERVER_PORT || 8080,
        DOMAIN: process.env.DOMAIN || 'http://localhost:8080',
        TRANSACTION_TABLE_NAME: process.env.TRANSACTION_TABLE_NAME || 'transaction'
    },
    REQUEST_HEADER: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
        'Access-Control-Allow-Credentials': true
    },
    PAYUMONEY_CONFIG: {
        MERCHANT_KEY: process.env.MERCHANT_KEY || 'w0FHfS6u',
        MERCHANT_SALT: process.env.MERCHANT_SALT || 'XgDeGILhp3',
        AUTHORIZATION_HEADER: process.env.AUTHORIZATION_HEADER || '',
    }
};