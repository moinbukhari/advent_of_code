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

const data = fs.readFileSync("day11.txt", "utf8");
const lines = data.split(/\n/).map((line) => line.split(""));

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
fs.writeFileSync(
  "output11.txt",
  expandedGrid.map((row) => row.join("")).join("\n")
);
let galaxyCordinates: number[][] = [];
let galaxyCount = 0;

expandedGrid = expandedGrid.map((row, i) => {
  return row.map((tile, j) => {
    if (tile === "#") {
      galaxyCount++;
      galaxyCordinates.push([i, j]);
      return galaxyCount.toString();
    } else {
      return tile;
    }
  });
});

const shortestDistances: number[] = [];
for (let i = 0; i < galaxyCordinates.length; i++) {
  for (let j = i + 1; j < galaxyCordinates.length; j++) {
    const yDiff = galaxyCordinates[j][0] - galaxyCordinates[i][0];
    const xDiff = galaxyCordinates[j][1] - galaxyCordinates[i][1];
    shortestDistances.push(Math.abs(xDiff) + Math.abs(yDiff));
  }
}

console.log(emptyRows);
console.log(emptyCols);
console.log(galaxyCordinates);
console.log(shortestDistances);
console.log(shortestDistances.reduce((acc, curr) => acc + curr, 0));
