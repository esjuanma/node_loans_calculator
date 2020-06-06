// Displays all loans after reading the file
function showLoans(loans) {
    loans.sort((a, b) => a.name > b.name ? 1 : -1);
    return loans.map(showLoan).join('');
}

// Displays each loan
function showLoan(loan) {
    const output = [];

    function print(line, times = 1) {
        output.push(line.repeat(times));
        console.log(line);
    }

    // Gets main data
    const { name, id, initialAmount, interest, payments } = loan;
    const periodInterest = interest / payments;

    // Displays loan heading
    print(`${name}: ${id}`);
    print('Principal    Interest    Balance');

    let currentAmount = initialAmount;

    // For each month
    for (let month = 1; month <= payments; month++) {
        // Gets values
        const monthPayment = initialAmount * (periodInterest + periodInterest / (Math.pow(1 + periodInterest, payments) - 1));
        const monthInterest = currentAmount * periodInterest;
        const principal = monthPayment - monthInterest;

        // Updates debt
        currentAmount -= principal;

        // Creates lines to display
        const line = `$${principal.toFixed(2)}    $${monthInterest.toFixed(2)}    $${Math.abs(currentAmount.toFixed(2))}`;

        // Push into output
        print(line);
    }

    // Blank line
    print('\n', 2)

    return output.join('\n');
}

module.exports = showLoans;