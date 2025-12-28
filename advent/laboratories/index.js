const fs = require("fs");

// const raw = fs.readFileSync("tachyon_manifold.txt", "utf-8");
const raw = fs.readFileSync("tachyon_manifold.test.txt", "utf-8");
const lines = raw.split("\n");

const splitted = [];

for (let line = 0; line < lines.length; line++) {
  const newLine = [];
  lines[line].split("").forEach((token, index) => {
    const prevLine = splitted[line - 1];
    if (
      (lines[line][index + 1] === "^" &&
        prevLine &&
        (prevLine[index + 1] === "S" || prevLine[index + 1] === "|")) ||
      //
      (lines[line][index - 1] === "^" &&
        prevLine &&
        (prevLine[index - 1] === "S" || prevLine[index - 1] === "|")) ||
      //
      (token === "." &&
        prevLine &&
        (prevLine[index] === "S" || prevLine[index] === "|"))
    ) {
      newLine.push("|");
    } else {
      return newLine.push(token);
    }
  });
  splitted.push(newLine);
}

// // PART 1
// let splits = 0;
// for (let line = 0; line < splitted.length; line++) {
//   const prevLine = splitted[line - 1];
//   splitted[line].forEach((token, index) => {
//     if (
//       token === "^" &&
//       prevLine &&
//       prevLine[index] === "|" &&
//       splitted[line][index - 1] === "|" &&
//       splitted[line][index + 1] === "|"
//     ) {
//       splits++;
//     }
//   });
// }
// console.log(splits);

// console.log(splitted.map((line) => line.join("")).join("\n"));

// PART 2
class Node {
  constructor(x, y, attached = []) {
    this.x = x;
    this.y = y;
    this.attached = attached;
  }

  attach(...nodes) {
    return this.attached.push(...nodes);
  }

  split() {
    const nodeA = new Node(this.x - 1, this.y);
    const nodeB = new Node(this.x + 1, this.y);
    return [nodeA, nodeB];
  }

  moveDown() {
    this.y += 1;
    return this;
  }

  moveUp() {
    this.y -= 1;
    return this;
  }

  toString() {
    return `Node(x=${this.x},y=${this.y})`;
  }
}
const rootNode = new Node(splitted[0].indexOf("S"), 0);
const maxDepth = splitted.length - 1;
let arrivedNodes = [];
const visited = {};
function findWay(node) {
  if (node.y >= maxDepth) {
    arrivedNodes.push(node);
    return;
  }
  const ch = splitted[node.y][node.x];
  if (ch === "S" || ch === "|") {
    node.moveDown();
    findWay(node);
  } else if (ch === "^") {
    const [left, right] = node.split();

    if (!visited[left.toString()]) {
      visited[left.toString()] = left;
      findWay(left);
    } else {
    }
    if (!visited[right.toString()]) {
      visited[right.toString()] = right;
      findWay(right);
    } else {
    }
  }
}

findWay(rootNode);

console.log(arrivedNodes.length);

// const maxDepth = splitted.length - 1;
// const visited = {};
// const destinations = splitted.slice(-1)[0].reduce((acc, curr, index) => {
//   if (curr === "|") {
//     acc.push(new Node(index, maxDepth));
//   }
//   return acc;
// }, []);

// for (let destination of destinations) {
//   destination.moveUp();
//   visited[destination.toString()] = ;
// }
