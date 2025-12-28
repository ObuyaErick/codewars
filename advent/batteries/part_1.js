const fs = require("fs");

const raw = fs.readFileSync("banks.txt", "utf-8");
// const raw = fs.readFileSync("banks.test.txt", "utf-8");
const banks = raw.split("\n"); //.slice(2, 3);

const highestJoltages = {};

for (let bank of banks) {
  let firstIndex = 0;
  let first = Number(bank[firstIndex]);
  let start = 0;
  let end = 1;
  do {
    if (Number(bank[start]) > first) {
      firstIndex = 0 + start;
      first = Number(bank[firstIndex]);
    }

    if (end === bank.length - 1) {
      start++;
      end = start + 1;
    } else {
      end++;
    }
  } while (start < bank.length - 1);
  const secondBatteryChoiceSet = bank
    .slice(firstIndex + 1)
    .split("")
    .map((n) => Number(n));
  const second = Math.max(...secondBatteryChoiceSet);
  highestJoltages[bank] = Number(`${first}${second}`);
}
const totalJoltage = Object.values(highestJoltages).reduce((acc, curr) => {
  acc += curr;
  return acc;
}, 0);
console.log(`Joltage: ${totalJoltage}`);
