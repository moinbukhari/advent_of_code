import fs from "fs";

const temp = `...........
.S-------7.
.|F-----7|.
.||OOOOO||.
.||OOOOO||.
.|L-7OF-J|.
.|II|O|II|.
.L--JOL--J.
.....O.....`;

function getNorth(
  currIndex: number,
  width: number,
  pipeMap: string[]
): [number, string] | null {
  if (currIndex >= 0 && currIndex < width) {
    return null;
  }

  const index = currIndex - width;
  const val = pipeMap[index];
  let dir: string = "";
  if (val === "7") {
    dir = "W";
  } else if (val === "|") {
    dir = "N";
  } else if (val === "F") {
    dir = "E";
  } else if (val === "S") {
    return [index, "END"];
  } else {
    return null;
  }

  return [index, dir];
}

function getEast(
  currIndex: number,
  width: number,
  pipeMap: string[]
): [number, string] | null {
  if ((currIndex + 1) % width === 0) {
    return null;
  }
  const index = currIndex + 1;
  const val = pipeMap[index];
  let dir: string = "";
  if (val === "J") {
    dir = "N";
  } else if (val === "-") {
    dir = "E";
  } else if (val === "7") {
    dir = "S";
  } else if (val === "S") {
    return [index, "END"];
  } else {
    return null;
  }

  return [index, dir];
}

function getSouth(
  currIndex: number,
  width: number,
  pipeMap: string[]
): [number, string] | null {
  if (currIndex >= pipeMap.length - width && currIndex < pipeMap.length) {
    return null;
  }
  const index = currIndex + width;
  const val = pipeMap[index];
  let dir: string = "";
  if (val === "J") {
    dir = "W";
  } else if (val === "|") {
    dir = "S";
  } else if (val === "L") {
    dir = "E";
  } else if (val === "S") {
    return [index, "END"];
  } else {
    return null;
  }

  return [index, dir];
}

function getWest(
  currIndex: number,
  width: number,
  pipeMap: string[]
): [number, string] | null {
  if (currIndex % width === 0) {
    return null;
  }
  const index = currIndex - 1;
  const val = pipeMap[index];
  let dir: string = "";
  if (val === "L") {
    dir = "N";
  } else if (val === "-") {
    dir = "W";
  } else if (val === "F") {
    dir = "S";
  } else if (val === "S") {
    return [index, "END"];
  } else {
    return null;
  }

  return [index, dir];
}

function traverese(
  pipeMap: string[],
  width: number,
  startingIndex: number
): number[] {
  let path: number[] = [];
  let next: [number, string] | null;
  let loopFound = false;
  let currIndex = startingIndex;
  for (let i = 0; i < 4 && !loopFound; i++) {
    if (i === 0) {
      next = getNorth(currIndex, width, pipeMap);
    } else if (i === 1) {
      next = getSouth(currIndex, width, pipeMap);
    } else if (i === 2) {
      next = getEast(currIndex, width, pipeMap);
    } else {
      next = getWest(currIndex, width, pipeMap);
    }

    while (!!next && !loopFound) {
      currIndex = next[0];
      path.push(currIndex);

      if (path.includes(startingIndex)) {
        console.log("LOOP FOUND");
        loopFound = true;
      } else {
        switch (next[1]) {
          case "N":
            // Handle North case
            next = getNorth(currIndex, width, pipeMap);
            break;
          case "S":
            // Handle South case
            next = getSouth(currIndex, width, pipeMap);
            break;
          case "E":
            // Handle East case
            next = getEast(currIndex, width, pipeMap);
            break;
          case "W":
            // Handle West case
            next = getWest(currIndex, width, pipeMap);
            break;
          default:
            // Handle default case
            console.log("Unrecognised Direction");
            break;
        }
      }
    }
  }

  return path;
}

const data = fs.readFileSync("day10.txt", "utf8");
const lines = data.split(/\n/).map((line) => line.split(""));
const width = lines[0].length;
const arrFlat = lines.flat();
let startTile = "";
const startingIndex = arrFlat.indexOf("S");
const up = getNorth(startingIndex, width, arrFlat);
const right = getEast(startingIndex, width, arrFlat);
const left = getWest(startingIndex, width, arrFlat);
const down = getSouth(startingIndex, width, arrFlat);

if (up && right) {
  startTile = "L";
} else if (up && down) {
  startTile = "|";
} else if (up && left) {
  startTile = "J";
} else if (right && down) {
  startTile = "F";
} else if (right && left) {
  startTile = "-";
} else if (down && left) {
  startTile = "7";
}

const path = traverese(arrFlat, width, startingIndex);

const updatedArr = arrFlat.map((tile, index) => {
  if (tile === "S") {
    return startTile;
  } else if (path.includes(index)) {
    return tile;
  } else {
    return ".";
  }
});

const height = updatedArr.length / width;
let updatedMap: string[][] = [];
for (let i = 0; i < height; i++) {
  const startIndex = i * width;
  updatedMap.push(updatedArr.slice(startIndex, startIndex + width));
}

let area = 0;
for (let i = 0; i < height; i++) {
  let vertPipes = 0;
  for (let j = 0; j < width; j++) {
    const currTile = updatedMap[i][j];
    const currIndex = i * width + j;
    if (currTile === "J" || currTile === "|" || currTile === "L") {
      vertPipes++;
    } else if (!path.includes(currIndex)) {
      if (vertPipes % 2 !== 0) {
        updatedMap[i][j] = "*";
        area++;
      }
    }
  }
}

fs.writeFileSync(
  "output10.txt",
  updatedMap.map((row) => row.join("")).join("\n")
);

console.log(path.length / 2);
console.log(area);
