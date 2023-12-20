import fs from "fs";

const temp = `Time:      7  15   30
Distance:  9  40  200`;

function calcDistance(holdTime: number, raceTime: number): number {
  return (raceTime - holdTime) * holdTime;
}

function findMinHoldtime(raceTime: number, recordDistance: number): number {
  for (let i = 1; i < raceTime - 1; i++) {
    if (calcDistance(i, raceTime) > recordDistance) {
      return i;
    }
  }
  return -1;
}

function findMaxHoldtime(raceTime: number, recordDistance: number): number {
  for (let i = raceTime - 1; i > 0; i--) {
    if (calcDistance(i, raceTime) > recordDistance) {
      return i;
    }
  }
  return -1;
}

const data = fs.readFileSync("day6.txt", "utf8");
// const lines = data.split(/\n/).map((line) => {
//   return line
//     .split(/:/)[1]
//     .trim()
//     .split(/\s+/)
//     .map((e) => {
//       return Number(e);
//     });
// });

const lines = temp.split(/\n/).map((line) => {
  return line
    .split(/:/)[1]
    .trim()
    .split(/\s+/)
    .map((e) => {
      return Number(e);
    });
});

// console.log(lines);
// const raceTimes = lines[0];
// const recordDistances = lines[1];
// let winsPerRace: number[] = [];

// for (let i = 0; i < raceTimes.length; i++) {
//   const minHoldTime = findMinHoldtime(raceTimes[i], recordDistances[i]);
//   if (minHoldTime !== -1) {
//     const maxHoldTime = findMaxHoldtime(raceTimes[i], recordDistances[i]);
//     winsPerRace.push(maxHoldTime - minHoldTime + 1);
//   } else {
//     winsPerRace.push(0);
//   }
// }

// console.log(winsPerRace.reduce((acc, num) => acc * num));

//part 2
const lines2 = data
  .split(/\n/)
  .map((line) => {
    return line.split(/:/)[1].trim().split(/\s+/);
  })
  .map((nums) => {
    return Number(
      nums.reduce((acc, curr) => {
        return acc.concat(curr);
      }, "")
    );
  });

console.log(lines2);
const raceTime = lines2[0];
const recordDistance = lines2[1];
let winsPossible = 0;

const minHoldTime = findMinHoldtime(raceTime, recordDistance);

if (minHoldTime !== -1) {
  const maxHoldTime = findMaxHoldtime(raceTime, recordDistance);
  winsPossible = maxHoldTime - minHoldTime + 1;
}

console.log(winsPossible);
