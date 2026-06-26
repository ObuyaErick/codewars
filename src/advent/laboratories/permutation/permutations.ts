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
          [...path, remaining[i]],
          remaining.filter((_, idx) => idx !== i)
        );
      }
    };

    backtrack([], values);
    return results;
  }
}
