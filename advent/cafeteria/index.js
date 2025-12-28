const fs = require("fs");

// const raw = fs.readFileSync("ingredient_ids.txt", "utf-8");
const raw = fs.readFileSync("ingredient_ids.test.txt", "utf-8");
const lines = raw.split("\n");

const { freshRanges, availableIngredients } = lines.reduce(
  (acc, curr) => {
    if (curr.includes("-")) {
      const [start, end] = curr.split("-");
      acc.freshRanges.push({ start: Number(start), end: Number(end) });
    } else if (curr.trim() === "") {
    } else {
      acc.availableIngredients.push(Number(curr));
    }
    return acc;
  },
  {
    freshRanges: [],
    availableIngredients: [],
  }
);

// // PART 1

// let count = 0;
// for (let ingredientId of availableIngredients) {
//   if (
//     freshRanges.find(
//       (range) => ingredientId >= range.start && ingredientId <= range.end
//     )
//   ) {
//     count++;
//   }
// }

// console.log("%d available ingredients are fresh.", count);

// PART 2

const checkOvelap = (first, second) => {
  const previous = `${second.start}-${second.end}`;
  if (first.start < second.start && first.end > second.end) {
    return {
      previous: previous,
      side: "full",
      start: first.start,
      end: first.end,
    };
  } else if (first.start >= second.start && first.end <= second.end) {
    return {
      previous: previous,
      side: "inline",
      start: second.start,
      end: second.end,
    };
  } else if (
    first.start >= second.start &&
    first.start <= second.end &&
    first.end > second.end
  ) {
    return {
      previous: previous,
      side: "right",
      start: second.start,
      end: first.end,
    };
  } else if (
    first.end >= second.start &&
    first.end <= second.end &&
    first.start < second.start
  ) {
    return {
      previous: previous,
      side: "left",
      start: first.start,
      end: second.end,
    };
  } else {
    return null;
  }
};

const distinctRanges = {};
for (let range of freshRanges) {
  let overlap = null;
  for (let distinctRangeKey in distinctRanges) {
    const distinctRange = distinctRanges[distinctRangeKey];
    overlap = checkOvelap(range, distinctRange);
  }
  //
  const rangeKey = `${range.start}-${range.end}`;
  if (overlap) {
    delete distinctRanges[overlap.previous];
    const overlapKey = `${overlap.start}-${overlap.end}`;
    distinctRanges[overlapKey] = { start: overlap.start, end: overlap.end };
  } else {
    distinctRanges[rangeKey] = range;
  }
}

const unoverlappedRanges = {};
for (let range of Object.values(distinctRanges)) {
  let overlap = null;
  console.log(range);
  for (let distinctRangeKey in unoverlappedRanges) {
    const distinctRange = unoverlappedRanges[distinctRangeKey];
    overlap = checkOvelap(range, distinctRange);
  }
  //
  const rangeKey = `${range.start}-${range.end}`;
  if (overlap) {
    delete unoverlappedRanges[overlap.previous];
    const overlapKey = `${overlap.start}-${overlap.end}`;
    unoverlappedRanges[overlapKey] = { start: overlap.start, end: overlap.end };
  } else {
    unoverlappedRanges[rangeKey] = range;
  }
}

console.log(
  unoverlappedRanges
  // Object.values(unoverlappedRanges).reduce((acc, curr) => {
  //   acc += curr.end - curr.start + 1;
  //   return acc;
  // }, 0)
);
