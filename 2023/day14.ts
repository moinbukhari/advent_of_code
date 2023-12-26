import fs from "fs";

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
const data = fs.readFileSync("day14.txt", "utf8");
const grid = data.split(/\n/).map((row) => row.split(""));
const transposedGrid = getTransposedArray(grid);
let tiltedArray: string[][] = [];
for (let i = 0; i < transposedGrid.length; i++) {
  let col = transposedGrid[i].join("").split(/\.+/g);

  let dotsArray = transposedGrid[i]
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

let tiltedGrid = getTransposedArray(tiltedArray);
const loadArr: number[] = [];

tiltedGrid.forEach((row, index) => {
  const height = tiltedGrid.length - index;
  loadArr.push(row.filter((str) => str === "O").length * height);
});

console.log(loadArr.reduce((acc, curr) => acc + curr));
