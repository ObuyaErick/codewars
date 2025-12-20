const fs = require('fs')

// const raw = fs.readFileSync("ids.txt", 'utf-8');
const raw = fs.readFileSync("test_ids.txt", 'utf-8');
const ranges = raw.split(",").map((range) => range.split("-").map((v) => Number(v)));
const invalids = {}
ranges.map(([lower, upper]) => {
    const rangeKey = `${lower}-${upper}`;
    invalids[rangeKey] = []
    for (let id = lower; id <= upper; id++) {
        let acc = {};
        for (let digit of id.toString().split('')) {
            if (!acc[digit]) {
                acc[digit] = [];
            }
            acc[digit].push(digit)
        }
        if (Object.values(acc).some((v) => v.length > 1)) {
            invalids[rangeKey].push(id)
        }
    }
})

const summation = Object.values(invalids).flat().reduce((acc, curr) => {
    acc += curr;
    return acc;
}, 0)
console.log(`Summation: ${summation}`)