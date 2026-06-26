export class Permutations {
  static permute<T>(values: T[]): T[][] {
    const results: T[][] = [];

    const backtrack = (path: T[], remaining: T[]) => {
      if (remaining.length === 0) {
        results.push(path);
        return;
      }

      for (let i = 0; i < remaining.length; i++) {
        backtrack(
          [...path, remaining[i]] as T[],
          remaining.filter((_, idx) => idx !== i),
        );
      }
    };

    backtrack([], values);
    return results;
  }

  static eagerCombinations(N: number) {
    const combinations = [new Array(N).fill(0).map((_, i) => [i])];
    for (let i = 1; i < N; i++) {
      const nextLevelCombinations: number[][] = [];
      for (let g of combinations[i - 1]!) {
        const L = g[g.length - 1]!;
        if (L == N) {
          continue;
        } else {
          for (let k = L + 1; k < N; k++) {
            nextLevelCombinations.push([...g, k]);
          }
        }
      }
      combinations.push(nextLevelCombinations);
    }
    return combinations.flat(1);
  }
}
