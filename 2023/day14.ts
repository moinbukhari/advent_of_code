import fs from "fs";
import { run } from "node:test";
const nextCycleCache: string[][][] = [];
const cycleRunsCache: { [key: string]: number } = {};
const temp = `O....#....
O.OO#....#
.....##...
OO.#O....O
.O.....O#.
O.#..O.#.#
..O..#O..O
.......O..
#....###..
#OO..#....`;

function getTransposedArray(arr: string[][]): string[][] {
  const transposedArr: string[][] = [];
  for (let i = 0; i < arr[0].length; i++) {
    transposedArr[i] = [];
    for (let j = 0; j < arr.length; j++) {
      transposedArr[i][j] = arr[j][i];
    }
  }
  return transposedArr;
}

function tilt(arr: string[][]): string[][] {
  const tiltedArray: string[][] = [];
  for (let i = 0; i < arr.length; i++) {
    let col = arr[i].join("").split(/\.+/g);

    let dotsArray = arr[i]
      .join("")
      .match(/\.+/g)
      ?.filter((val) => val !== "") as string[];

    let trailingDots = "";
    let out = col[0];
    for (let j = 0; j < col.length - 1; j++) {
      trailingDots += dotsArray.shift() ?? "";
      if (col[j + 1].startsWith("O")) {
        const hashIndex = col[j + 1].indexOf("#");

        if (hashIndex === -1) {
          out += col[j + 1];
        } else {
          out +=
            col[j + 1].slice(0, hashIndex) +
            trailingDots +
            col[j + 1].slice(hashIndex);
          trailingDots = "";
        }
      } else {
        out += trailingDots + col[j + 1];
        trailingDots = "";
      }
    }
    out += dotsArray.join("") + (trailingDots ?? "");

    tiltedArray.push(out.split(""));
  }
  return tiltedArray;
}

function cycle(arr: string[][]): string[][] {
  let tiltedGrid: string[][] = arr;
  //tilt north;
  tiltedGrid = getTransposedArray(tilt(getTransposedArray(tiltedGrid)));

  //tilt west;
  tiltedGrid = tilt(tiltedGrid);

  //tilt south;
  tiltedGrid = getTransposedArray(
    tilt(getTransposedArray(tiltedGrid).map((row) => row.reverse())).map(
      (row) => row.reverse()
    )
  );

  //tilt east
  tiltedGrid = tilt(tiltedGrid.map((row) => row.reverse())).map((row) =>
    row.reverse()
  );

  return tiltedGrid;
}

const data = fs.readFileSync("day14.txt", "utf8");
const grid = data.split(/\n/).map((row) => row.split(""));

let cycledGrid = grid;
let loadArr: number[] = [];
let lastSeenIndex = 0;
let runs = 0;
let targetCycle = 1 * 10 ** 9;

for (let i = 0; i < targetCycle; i++) {
  runs = i;
  const key = `${cycledGrid.flat().join("")}`;
  if (cycleRunsCache[key] !== undefined) {
    lastSeenIndex = cycleRunsCache[key];
    break;
  } else {
    cycledGrid = cycle(cycledGrid);
    nextCycleCache.push(cycledGrid);
    cycleRunsCache[key] = i;
  }
}

let targetGrid: string[][] = [];
if (runs >= targetCycle) {
  targetGrid = nextCycleCache[targetCycle - 1];
} else {
  const period = runs - lastSeenIndex;
  targetGrid =
    nextCycleCache[((1000000000 - 1 - lastSeenIndex) % period) + lastSeenIndex];
}

targetGrid.forEach((row, index) => {
  const height = targetGrid.length - index;
  loadArr.push(row.filter((str) => str === "O").length * height);
});

console.log(loadArr.reduce((acc, curr) => acc + curr));
