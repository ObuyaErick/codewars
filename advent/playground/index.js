const { randomUUID } = require("crypto");
const fs = require("fs");

class JunctionBox {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  toString() {
    return `(${this.x},${this.y},${this.z})`;
  }
}

class Connection {
  constructor(start, end) {
    this.start = start;
    this.end = end;
    this.magnitude = Math.hypot(
      end.x - start.x,
      end.y - start.y,
      end.z - start.z
    );
  }
}

class Circuit {
  constructor(firstBox) {
    this.junctionBoxes = {};
    if (firstBox) {
      this.junctionBoxes[firstBox.toString()] = firstBox;
    }
    this.circuitId = randomUUID();
  }

  connectsAllJunctionBoxes(boxes) {
    const boxIds = this.allJunctionBoxIds();
    const allJunctionBoxes = boxes.map((box) => box.toString());
    return allJunctionBoxes.every((boxKey) => boxIds.includes(boxKey));
  }

  allJunctionBoxIds() {
    return Object.keys(this.junctionBoxes);
  }

  size() {
    return Object.keys(this.junctionBoxes).length;
  }

  static buildFromJunctionBoxes(...boxes) {
    const circuit = new Circuit();
    for (let box of boxes) {
      circuit.junctionBoxes[box.toString()] = box;
    }
    return circuit;
  }

  hasConnectionTo(junctionBox) {
    return !!this.junctionBoxes[junctionBox.toString()];
  }
}

const raw = fs.readFileSync("junction_boxes.txt", "utf-8");
// const raw = fs.readFileSync("junction_boxes.test.txt", "utf-8");
const rawLines = raw.split("\n");
const junctionBoxes = rawLines.map((line) => {
  const [x, y, z] = line.split(",").map((coord) => Number(coord));
  return new JunctionBox(x, y, z);
});

const connections = [];

for (let i = 0; i < junctionBoxes.length - 1; i++) {
  for (let j = i + 1; j < junctionBoxes.length; j++) {
    connections.push(new Connection(junctionBoxes[i], junctionBoxes[j]));
  }
}

connections.sort((a, b) => a.magnitude - b.magnitude);

let circuits = [];
// // PART 1
// for (let idx = 0; idx < 10; idx++) {
//   const connection = connections[idx];
//   const existingCircuits = circuits.filter((circuit) => {
//     return (
//       circuit.hasConnectionTo(connection.start) ||
//       circuit.hasConnectionTo(connection.end)
//     );
//   });
//   if (existingCircuits.length > 0) {
//     const existingCircuitIds = existingCircuits.map(
//       (circuit) => circuit.circuitId
//     );

//     circuits = circuits.filter(
//       (circuit) => !existingCircuitIds.includes(circuit.circuitId)
//     );
//     const mergedCircuit = Circuit.buildFromJunctionBoxes(
//       ...existingCircuits
//         .map((circuit) => Object.values(circuit.junctionBoxes))
//         .flat(),
//       connection.start,
//       connection.end
//     );
//     circuits.push(mergedCircuit);
//   } else {
//     circuits.push(
//       Circuit.buildFromJunctionBoxes(connection.start, connection.end)
//     );
//   }
// }

// circuits.sort((a, b) => b.size() - a.size());

// console.log(
//   circuits
//     .slice(0, 3)
//     .map((circuit) => circuit.size())
//     .reduce((acc, curr) => {
//       acc *= curr;
//       return acc;
//     }, 1)
// );

// PART 2
let idx = 0;
while (
  !(
    circuits.length === 1 && circuits[0].connectsAllJunctionBoxes(junctionBoxes)
  )
) {
  const connection = connections[idx];
  const existingCircuits = circuits.filter((circuit) => {
    return (
      circuit.hasConnectionTo(connection.start) ||
      circuit.hasConnectionTo(connection.end)
    );
  });
  if (existingCircuits.length > 0) {
    const existingCircuitIds = existingCircuits.map(
      (circuit) => circuit.circuitId
    );

    circuits = circuits.filter(
      (circuit) => !existingCircuitIds.includes(circuit.circuitId)
    );
    const mergedCircuit = Circuit.buildFromJunctionBoxes(
      ...existingCircuits
        .map((circuit) => Object.values(circuit.junctionBoxes))
        .flat(),
      connection.start,
      connection.end
    );
    circuits.push(mergedCircuit);
  } else {
    circuits.push(
      Circuit.buildFromJunctionBoxes(connection.start, connection.end)
    );
  }
  idx++;
}
const lastConnection = connections[idx - 1];

console.log(lastConnection.start.x * lastConnection.end.x);
