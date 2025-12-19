const fs = require('fs')

const raw = fs.readFileSync("puzzle.txt", 'utf-8');
// const raw = fs.readFileSync("test_puzzle.txt", 'utf-8');
const commands = raw.split("\n");

let pointer = -180.0;
let counter = 0;
for (line of commands) {
    const direction = line.slice(0, 1);
    const turns = parseInt(line.slice(1));
    const angleOfRotation = turns * 3.6;

    if (direction == "L") {
        pointer += angleOfRotation;
    } else {
        pointer -= angleOfRotation;
    }

    if (Math.abs(pointer.toFixed(4)) % 360.0 == 0) {
        counter++;
    }
}
console.log(`Password: ${counter}`)