import fs from "fs";

const temp = `...#......
.......#..
#.........
..........
......#...
.#........
.........#
..........
.......#..
#...#.....`;

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
function getGalaxyCords(arr: string[][]): [string[][], number[][]] {
  let galaxyCordinates: number[][] = [];
  let galaxyCount = 0;
  const newArr = arr.map((row, i) => {
    return row.map((tile, j) => {
      if (tile === "#") {
        galaxyCount++;
        galaxyCordinates.push([i, j]);
        return tile;
      } else {
        return tile;
      }
    });
  });

  return [newArr, galaxyCordinates];
}

const data = fs.readFileSync("day11.txt", "utf8");
let lines = data.split(/\n/).map((line) => line.split(""));
let galaxyCordinatesBefore: number[][] = [];
[lines, galaxyCordinatesBefore] = getGalaxyCords(lines);

const shortestDistancesBefore: number[] = [];
for (let i = 0; i < galaxyCordinatesBefore.length; i++) {
  for (let j = i + 1; j < galaxyCordinatesBefore.length; j++) {
    const yDiff = galaxyCordinatesBefore[j][0] - galaxyCordinatesBefore[i][0];
    const xDiff = galaxyCordinatesBefore[j][1] - galaxyCordinatesBefore[i][1];
    shortestDistancesBefore.push(Math.abs(xDiff) + Math.abs(yDiff));
  }
}

//Expand Rows
let width = lines[0].length;
const emptyRows: number[] = [];
const expandedRow = Array(width).fill(".");

lines.forEach((line, index) => {
  if (line.every((x) => x === ".")) {
    emptyRows.push(index);
  }
});

emptyRows.forEach((rowIndex, i) => {
  lines.splice(rowIndex + 1 + i, 0, expandedRow);
});

///expand cols
let height = lines.length;
const emptyCols: number[] = [];
const expandedCol = Array(height).fill(".");
const transposedLines: string[][] = getTransposedArray(lines);

transposedLines.forEach((line, index) => {
  if (line.every((x) => x === ".")) {
    emptyCols.push(index);
  }
});

emptyCols.forEach((colIndex, i) => {
  transposedLines.splice(colIndex + 1 + i, 0, expandedCol);
});

let expandedGrid: string[][] = getTransposedArray(transposedLines);

let galaxyCordinatesAfter: number[][] = [];
[expandedGrid, galaxyCordinatesAfter] = getGalaxyCords(expandedGrid);

const shortestDistancesAfter: number[] = [];
for (let i = 0; i < galaxyCordinatesAfter.length; i++) {
  for (let j = i + 1; j < galaxyCordinatesAfter.length; j++) {
    const yDiff = galaxyCordinatesAfter[j][0] - galaxyCordinatesAfter[i][0];
    const xDiff = galaxyCordinatesAfter[j][1] - galaxyCordinatesAfter[i][1];
    shortestDistancesAfter.push(Math.abs(xDiff) + Math.abs(yDiff));
  }
}

for (let i = 0; i < shortestDistancesBefore.length; i++) {
  const diff = shortestDistancesAfter[i] - shortestDistancesBefore[i];
  if (diff !== 0) {
    const enlargedDiff = diff * (1000000 - 1);
    shortestDistancesAfter[i] = shortestDistancesBefore[i] + enlargedDiff;
  }
}

fs.writeFileSync(
  "output11.txt",
  expandedGrid.map((row) => row.join("")).join("\n")
);

// console.log(emptyRows);
// console.log(emptyCols);
// console.log(galaxyCordinatesBefore);
// console.log(shortestDistancesBefore);
console.log(shortestDistancesBefore.reduce((acc, curr) => acc + curr, 0));
// console.log(galaxyCordinatesAfter);
// console.log(shortestDistancesAfter);
console.log(shortestDistancesAfter.reduce((acc, curr) => acc + curr, 0));
