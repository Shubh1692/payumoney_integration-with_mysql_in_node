const express = require('express'), // require express code
    bodyParser = require('body-parser'), // require body-parser code
    CONFIG = require('./app.config'),
    common = require('./common'),
    payumoney = require('payumoney-node'),
    app = express(); // initilize exporess in app variable
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}));
payumoney.isProdMode(false);
payumoney.setKeys(CONFIG.PAYUMONEY_CONFIG.MERCHANT_KEY, CONFIG.PAYUMONEY_CONFIG.MERCHANT_SALT);
// parse application/json
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', CONFIG.REQUEST_HEADER['Access-Control-Allow-Origin']);
    res.setHeader('Access-Control-Allow-Methods', CONFIG.REQUEST_HEADER['Access-Control-Allow-Methods']);
    res.setHeader('Access-Control-Allow-Headers', CONFIG.REQUEST_HEADER['Access-Control-Allow-Headers']);
    res.setHeader('Access-Control-Allow-Credentials', CONFIG.REQUEST_HEADER['Access-Control-Allow-Credentials']);
    next();
});
// Database Auth Fail
const _authenticateFail = (err) => {
    console.log('Unable to connect to the database:', err);
}
const _authenticateSuccess = async () => {
    console.log('Connection has been established successfully.');
    common.sequelize.sync().then((success) => { // {force: true}
        console.log('success')
        transactionController = require('./transactionController');
        //Apis
        app.post('/createTransaction/', async (req, res) => {
            const transaction = await transactionController.createTransaction({
                user_id: req.body.user_id,
                amount: req.body.amount,
            })
            const paymentData = {
                productinfo: req.body.user_id,
                txnid: transaction.transaction_id,
                amount: req.body.amount,
                email: "",
                phone: "",
                lastname: "",
                firstname: "",
                surl: `${CONFIG.APP_CONFIG.DOMAIN}/payu/success/`,
                furl: `${CONFIG.APP_CONFIG.DOMAIN}/payu/fail/`
            };

            await payumoney.makePayment(paymentData, (error, response) => {
                console.log(error, response)
                if (error) {
                    // Some error
                    res.status(400).json({ error })
                } else {
                    // Payment redirection link
                    res.status(200).json({ response: response, transaction: transaction })
                }
            });
        });

        app.post('/payu/success/', async (req, res) => {
            await transactionController.updateTransaction({
                transaction_id: req.body.txnid,
                payment_status: 'success',
            });
            res.send(200);
        });

        app.post('/payu/fail/', async (req, res) => {
            await transactionController.updateTransaction({
                transaction_id: req.body.txnid,
                payment_status: 'failed',
            });
            res.send(200);
        });

        app.post('/getTransaction/:transaction_id/', async (req, res) => {
            const transaction = await transactionController.getTransaction({
                transaction_id: req.params.transaction_id
            });
            res.status(200).json({ transaction });
        });
    }).catch((error) => {
        console.log('in the error');
        console.log(error)
        throw error;
    })
}
common.sequelize
    .authenticate()
    .then(_authenticateSuccess)
    .catch(_authenticateFail);

// Database Auth Pass

// For Check Start Server
app.listen(CONFIG.APP_CONFIG.NODE_SERVER_PORT, () => {
    console.log('Server Started In Rest Api on port ' + CONFIG.APP_CONFIG.NODE_SERVER_PORT);
});