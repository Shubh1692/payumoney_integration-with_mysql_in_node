const transaction = require('./transactionSchema');
const _createTransaction = async ({ user_id, amount }) => {
    const createdTransaction = await transaction.create({
        user_id,
        amount
    });
    return createdTransaction;
}

const _updateTransaction = async ({ transaction_id, payment_status }) => {
    const updatedTransaction = await transaction.findOne({
        transaction_id
    });
    return await updatedTransaction.updateAttributes({ payment_status });
}


const _getTransaction = async ({ transaction_id }) => {
    return transactionInfo = await transaction.findOne({
        transaction_id
    });
}
// Export Method
module.exports = {
    createTransaction: _createTransaction,
    updateTransaction: _updateTransaction,
    getTransaction: _getTransaction
};