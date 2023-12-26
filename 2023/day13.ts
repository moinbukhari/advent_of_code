import fs from "fs";
const temp = `#.##..##.
..#.##.#.
##......#
##......#
..#.##.#.
..##..##.
#.#.##.#.

#...##..#
#....#..#
..##..###
#####.##.
#####.##.
..##..###
#....#..#`;

function getTransposedArray(arr: string[][]): string[] {
  const transposedArr: string[][] = [];
  for (let i = 0; i < arr[0].length; i++) {
    transposedArr[i] = [];
    for (let j = 0; j < arr.length; j++) {
      transposedArr[i][j] = arr[j][i];
    }
  }
  return transposedArr.map((col) => col.join(""));
}

function findMirrorIndex(pattern: string[]): number {
  for (let i = 1; i < pattern.length; i++) {
    let above = pattern.slice(0, i);
    let below = pattern.slice(i);
    if (above.length <= below.length) {
      below = below.slice(0, above.length);
    } else {
      above = above.slice(above.length - below.length);
    }

    let possibleSmudges = 0;
    const revBelow = below.reverse().join("").split("");

    above
      .join("")
      .split("")
      .forEach((aboveChar, index) => {
        if (aboveChar !== revBelow[index]) {
          possibleSmudges++;
        }
      });
    if (possibleSmudges === 1) {
      return i;
    }

    //part1
    // if (above.join("") === below.reverse().join("")) {
    //   return i;
    // }
  }

  return -1;
}

const data = fs.readFileSync("day13.txt", "utf8");
const patterns = data.split(/\n\n/).map((line) => {
  return line.split(/\n/);
});

const scores: number[] = [];

patterns.forEach((p) => {
  const horizontalMirrorIndex = findMirrorIndex(p);
  if (horizontalMirrorIndex !== -1) {
    scores.push(horizontalMirrorIndex * 100);
  } else {
    const transposedArr = getTransposedArray(p.map((row) => row.split("")));
    const verticalMirrorIndex = findMirrorIndex(transposedArr);
    if (verticalMirrorIndex !== -1) {
      scores.push(verticalMirrorIndex);
    } else {
      scores.push(0);
    }
  }
});
console.log(scores);
console.log(scores.reduce((acc, curr) => acc + curr));
