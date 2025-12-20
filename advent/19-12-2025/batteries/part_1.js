const fs = require('fs')

// const raw = fs.readFileSync("banks.txt", 'utf-8');
const raw = fs.readFileSync("banks.test.txt", 'utf-8');
const banks = raw.split("\n").slice(2, 3);

for (let bank of banks) {
    let first = 0
    let second = 0
    let start = 0;
    let end = 1;
    do {
        if (Number(bank[start]) > first) {
            first = Number(bank[start]);
        }
        if (Number(bank[end]) > second) {
            second = Number(bank[end]);
        }
        if (end === bank.length - 1) {
            start++;
            end = start + 1;
            second = bank[end];
        } else {
            end++;
        }


    } while (start < bank.length - 2);
    console.log(`${first} ${second}`)
}

console.log(banks)

// console.log(`Joltage: ${totalJoltage}`)