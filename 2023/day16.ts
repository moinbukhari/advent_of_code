import fs from "fs";

const temp = `.|...\\....
|.-.\\.....
.....|-...
........|.
..........
.........\\
..../.\\\\..
.-.-/..|..
.|....-|.\\
..//.|....`;
const seenTileDir: { [key: string]: [number, number] | null } = {};

function getNextTile(
  currTile: [number, number],
  dir: string,
  height: number,
  width: number
): [number, number] | null {
  if (dir === "U") {
    // code for handling up direction
    if (currTile[0] === 0) {
      return null;
    } else {
      return [currTile[0] - 1, currTile[1]];
    }
  } else if (dir === "D") {
    // code for handling down direction
    if (currTile[0] === height - 1) {
      return null;
    } else {
      return [currTile[0] + 1, currTile[1]];
    }
  } else if (dir === "L") {
    // code for handling left direction
    if (currTile[1] === 0) {
      return null;
    } else {
      return [currTile[0], currTile[1] - 1];
    }
  } else if (dir === "R") {
    // code for handling right direction
    if (currTile[1] === width - 1) {
      return null;
    } else {
      return [currTile[0], currTile[1] + 1];
    }
  }
  return null;
}

function traverese(
  grid: string[][],
  currTile: [number, number] | null,
  dir: string
) {
  if (currTile === null) {
    return null;
  }

  const currTileVal = grid[currTile[0]][currTile[1]];

  if (currTileVal === "/") {
    switch (dir) {
      case "U":
        dir = "R";
        break;
      case "D":
        dir = "L";
        break;
      case "L":
        dir = "D";
        break;
      case "R":
        dir = "U";
        break;
      default:
        dir = dir;
    }
  } else if (currTileVal === "\\") {
    switch (dir) {
      case "U":
        dir = "L";
        break;
      case "D":
        dir = "R";
        break;
      case "L":
        dir = "U";
        break;
      case "R":
        dir = "D";
        break;
      default:
        dir = dir;
    }
  } else if (currTileVal === "|") {
    switch (dir) {
      case "U":
        dir = "U";
        break;
      case "D":
        dir = "D";
        break;
      case "L":
        dir = "UD";
        break;
      case "R":
        dir = "UD";
        break;
      default:
        dir = dir;
    }
  } else if (currTileVal === "-") {
    switch (dir) {
      case "U":
        dir = "LR";
        break;
      case "D":
        dir = "LR";
        break;
      case "L":
        dir = "L";
        break;
      case "R":
        dir = "R";
        break;
      default:
        dir = dir;
    }
  }

  let key = `${currTile[0]},${currTile[1]},${dir}`;
  //check if tile in current direction has been traversed
  if (seenTileDir[key] !== undefined) {
    return null;
  }
  if (dir.length === 1) {
    const nextTile = getNextTile(currTile, dir, grid.length, grid[0].length);
    seenTileDir[key] = nextTile;
    traverese(grid, nextTile, dir);
  } else if (dir.length === 2) {
    let nextTile = getNextTile(currTile, dir[0], grid.length, grid[0].length);
    traverese(grid, nextTile, dir[0]);
    nextTile = getNextTile(currTile, dir[1], grid.length, grid[0].length);
    traverese(grid, nextTile, dir[1]);
    seenTileDir[key] = nextTile;
  }

  return null;
}

const data = fs.readFileSync("day16.txt", "utf8");
const lines = data.split(/\n/).map((line) => line.split(""));

console.log(lines);
traverese(lines, [0, 0], "R");

const traversedKeys = Object.keys(seenTileDir);
let traveresedGrid = lines;
for (const key of traversedKeys) {
  // Your code here
  let keys = key.split(",");
  let col = Number(keys[0]);
  let row = Number(keys[1]);
  let dir = keys[2];

  traveresedGrid[col][row] = "#";
  //   if (dir === "L") {
  //     traveresedGrid[col][row] = "<";
  //   } else if (dir === "R") {
  //     traveresedGrid[col][row] = ">";
  //   } else if (dir === "U") {
  //     traveresedGrid[col][row] = "^";
  //   } else if (dir === "D") {
  //     traveresedGrid[col][row] = "v";
  //   }
}

let energizedTiles = 0;

traveresedGrid = traveresedGrid.map((line) =>
  line.map((x) => {
    if (x !== "#") {
      return ".";
    }
    energizedTiles++;
    return x;
  })
);

fs.writeFileSync(
  "output16.txt",
  traveresedGrid.map((line) => line.join("")).join("\n")
);
console.log(energizedTiles);
