// Read file packages
const readline = require('readline');
const fs = require('fs');
const parseLoan = require('./functions/parseLoan');
const showLoans = require('./functions/showLoans');

const test = process.argv[2] === 'test';

const readInterface = readline.createInterface({
    input: fs.createReadStream(test ? 'loans_registry/2020.txt' : process.argv[2])
});

// Creates loans list
const loans = [];

// Reads each file line
readInterface.on('line', function (line) {
    const data = line.split(' ');
    const command = data[0];

    switch (command) {
        case 'Add':
            loans.push(parseLoan(data.slice(1)));
            break;
    }
}).on('close', () => {
    const output = showLoans(loans);

    if (test) {
        fs.readFile('./loans_registry/2020_output.txt', 'utf-8', (err, content) => {
            const res = output.replace(/\s/g, '') == content.replace(/\s/g, '');
            console.log('Test passed:', res);
        });
    }
});
