import fs from "fs";

function checkNeighbours(
  data: string,
  startIndex: number,
  endIndex: number,
  lineLength: number
): boolean {
  let temp = "";

  for (let i = startIndex - 1; i <= endIndex + 1; i++) {
    temp += data[i - lineLength] + data[i] + data[i + lineLength];
  }
  const symbolRegex = /[^a-zA-Z0-9\s.]/g;
  const foundSymbols = temp.match(symbolRegex);
  //   console.log(temp, foundSymbols);
  if (foundSymbols && foundSymbols.length > 0) {
    return true;
  }
  return false;
}

function checkGears(
  data: string,
  gearIndex: number,
  lineLength: number
): number[] {
  let gearPartIndexes: number[] = [];
  //check top
  if (!isNaN(Number(data[gearIndex - lineLength]))) {
    if (!isNaN(Number(data[gearIndex - 1 - lineLength]))) {
      gearPartIndexes.push(gearIndex - 1 - lineLength);
    } else if (!isNaN(Number(data[gearIndex + 1 - lineLength]))) {
      gearPartIndexes.push(gearIndex + 1 - lineLength);
    } else {
      gearPartIndexes.push(gearIndex - lineLength);
    }
  } else {
    if (!isNaN(Number(data[gearIndex - 1 - lineLength]))) {
      gearPartIndexes.push(gearIndex - 1 - lineLength);
    }
    if (!isNaN(Number(data[gearIndex + 1 - lineLength]))) {
      gearPartIndexes.push(gearIndex + 1 - lineLength);
    }
  }
  //check bottom
  if (!isNaN(Number(data[gearIndex + lineLength]))) {
    if (!isNaN(Number(data[gearIndex - 1 + lineLength]))) {
      gearPartIndexes.push(gearIndex - 1 + lineLength);
    } else if (!isNaN(Number(data[gearIndex + 1 + lineLength]))) {
      gearPartIndexes.push(gearIndex + 1 + lineLength);
    } else {
      gearPartIndexes.push(gearIndex + lineLength);
    }
  } else {
    if (!isNaN(Number(data[gearIndex - 1 + lineLength]))) {
      gearPartIndexes.push(gearIndex - 1 + lineLength);
    }
    if (!isNaN(Number(data[gearIndex + 1 + lineLength]))) {
      gearPartIndexes.push(gearIndex + 1 + lineLength);
    }
  }
  //check left & right
  if (!isNaN(Number(data[gearIndex - 1]))) {
    gearPartIndexes.push(gearIndex - 1);
  }
  if (!isNaN(Number(data[gearIndex + 1]))) {
    gearPartIndexes.push(gearIndex + 1);
  }

  if (gearPartIndexes.length === 2) {
    return gearPartIndexes;
  }
  return [];
}

const data = fs.readFileSync("day3.txt", "utf8");
const lines = data.split(/\r?\n/);

const temp = `467..114..
...*......
..35..633.
......#...
617*......
.....+.58.
..592.....
......755.
...$.*....
.664.598..`;

const tempLines = temp.split(/\r?\n/);
const mat = lines.map((line) => {
  return ".".concat(line).concat(".");
});

// const mat = lines.map((line) => {
//   return ".".concat(line).concat(".");
// });
const dots = ".".repeat(mat[0].length);
const full_mat = [dots, ...mat, dots];

let startIndexes: number[] = [];
let endIndexes: number[] = [];
let allNumbers: number[] = [];
let partNumbers: number[] = [];
let gearIndexes: number[] = [];

full_mat.forEach((line, index) => {
  let hasStarted = false;
  for (let i = 0; i < line.length; i++) {
    if (line[i] === "*") {
      gearIndexes.push(i + index * line.length);
    }
    if (!isNaN(Number(line[i]))) {
      if (!hasStarted) {
        startIndexes.push(i + index * line.length);
        hasStarted = true;
      }
    } else if (hasStarted) {
      endIndexes.push(i - 1 + index * line.length);
      hasStarted = false;
    }
  }

  const foundNumbers = line.match(/\d+/g);

  if (foundNumbers && foundNumbers.length > 0) {
    foundNumbers.forEach((num) => {
      allNumbers.push(Number(num));
    });
  }
});

const flat_mat = full_mat.join("");

for (let i = 0; i < startIndexes.length; i++) {
  if (checkNeighbours(flat_mat, startIndexes[i], endIndexes[i], dots.length)) {
    partNumbers.push(allNumbers[i]);
  }
}
// console.log(allNumbers);
// console.log(partNumbers);
// console.log(partNumbers.reduce((acc, num) => acc + num));
console.log(gearIndexes);
let gear_ratios: number[] = [];
for (let i = 0; i < gearIndexes.length; i++) {
  const gearsPARTIndexes = checkGears(flat_mat, gearIndexes[i], dots.length);
  if (gearsPARTIndexes.length > 0) {
    console.log(gearsPARTIndexes);
    let gear_ratio: number[] = [];
    gearsPARTIndexes.forEach((gearInd) => {
      for (let i = 0; i < startIndexes.length; i++) {
        if (gearInd >= startIndexes[i] && gearInd <= endIndexes[i]) {
          gear_ratio.push(allNumbers[i]);
          break;
        }
      }
    });
    gear_ratios.push(gear_ratio[0] * gear_ratio[1]);

    // if (gearNum) {
    //   console.log(allNumbers[gearNum]);
    // }
  }
}
console.log(gear_ratios.reduce((acc, num) => acc + num));

// console.log(startIndexes);
// console.log(endIndexes);
