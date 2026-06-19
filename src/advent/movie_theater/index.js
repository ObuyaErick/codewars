const fs = require("fs");
const raw = fs.readFileSync("tiles.txt", "utf-8");
// const raw = fs.readFileSync("tiles.test.txt", "utf-8");
const rawLines = raw.split("\n");

class Position {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  toString() {
    return `(${this.x},${this.y})`;
  }
}

class Offset {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.area =
      (Math.abs(this.start.x - this.end.x) + 1) *
      (Math.abs(this.start.y - this.end.y) + 1);
  }
}

const redTilePositions = rawLines.map((line) => {
  const [y, x] = line.split(",").map((coord) => Number(coord));
  return new Position(x, y);
});

const offsets = [];

for (let i = 0; i < redTilePositions.length - 1; i++) {
  for (let j = i + 1; j < redTilePositions.length; j++) {
    offsets.push(new Offset(redTilePositions[i], redTilePositions[j]));
  }
}

offsets.sort((a, b) => b.area - a.area);

console.log(offsets[0].area);
