var maxSequence = function (arr: number[]) {
  if (arr.length < 1) {
    return 0;
  }
  if (arr.findIndex((v) => v >= 0) == -1) {
    return 0;
  }
  let maxSum = 0;
  if (arr.length > 2) {
    const computeSum = (nums: number[]) => {
      let acc = 0;
      for (let i = 0; i < nums.length; i++) {
        acc += nums[i];
      }
      return acc;
    };
    let start = 0;
    let end = 1;
    do {
      const summation = computeSum(arr.slice(start, end));
      if (summation > maxSum) {
        maxSum = summation;
      }
      if (end === arr.length) {
        start++;
        end = start + 1;
      } else {
        end++;
      }
    } while (start < arr.length);
    return maxSum;
  } else if (arr.length == 2) {
    return Math.max(arr[0], arr[1], arr[0] + arr[1]);
  } else {
    return arr[0];
  }
};

// console.log(maxSequence([]));
// console.log(maxSequence([-2, -1, 3]));
console.log(maxSequence([-2, 1, -3, 4, -1, 2, 1, -5, 4]));
