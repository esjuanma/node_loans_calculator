// Given an array of loan's attributes, returns a loan object
module.exports = function parseLoan(data) {
    const [name, id, amount, interest, payments] = data;

    return {
        name,
        id,
        initialAmount: +amount.replace('$', ''),
        interest: interest.replace('%', '') / 100,
        payments: +payments
    };
}
