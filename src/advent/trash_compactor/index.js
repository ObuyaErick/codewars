const fs = require("fs");

const raw = fs.readFileSync("question_paper.txt", "utf-8");
// const raw = fs.readFileSync("question_paper.test.txt", "utf-8");
const lines = raw.split("\n");

const maxColumns = Math.max(...lines.map((line) => line.length));
const operators = lines[lines.length - 1].split(/\s+/);

const workSheetMatrix = [];
let cephalopodMatrix = [];
for (let column = 0; column < maxColumns; column++) {
  const columnMatrix = [];
  let row = 0;
  for (row = 0; row < lines.length - 1; row++) {
    columnMatrix.push(lines[row][column]);
  }
  const isColumnBoundary = columnMatrix.every((v) => v === " ");
  if (!isColumnBoundary) {
    cephalopodMatrix.push(columnMatrix);
  }

  if (column === maxColumns - 1 || isColumnBoundary) {
    workSheetMatrix.push(cephalopodMatrix);
    cephalopodMatrix = [];
  }
}

// const problems = worksheet[0].map((_, index) => ({
//   operator: worksheet[worksheet.length - 1][index],
//   operands: new Array(worksheet.length - 1)
//     .fill(0)
//     .map((_, idx) => worksheet[idx][index]),
// }));

// // PART 1
// console.log(
//   problems.reduce((acc, { operands, operator }) => {
//     if (operator === "+") {
//       const summation = operands.reduce((sum, op) => {
//         sum += op;
//         return sum;
//       }, 0);
//       acc += summation;
//     } else if (operator === "*") {
//       product = operands.reduce((product, op) => {
//         product *= op;
//         return product;
//       });
//       acc += product;
//     }
//     return acc;
//   }, 0)
// );

// PART 2
console.log(
  workSheetMatrix.reduce((acc, cephalopodMatrix, index) => {
    const operands = cephalopodMatrix.map((column) =>
      Number(column.filter((digit) => digit !== " ").join(""))
    );

    const operator = operators[index];

    if (operator === "+") {
      const summation = operands.reduce((sum, op) => {
        sum += op;
        return sum;
      }, 0);
      acc += summation;
    } else if (operator === "*") {
      product = operands.reduce((product, op) => {
        product *= op;
        return product;
      });
      acc += product;
    }
    return acc;
  }, 0)
);
