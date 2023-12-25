import fs from "fs";

const temp = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;
function getPermutations(input: string): string[] {
  // Base case, if string is empty
  if (input.length === 0) return [""];

  // If string has only one character
  if (input.length === 1) return [input];

  const permutations: string[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input[i];

    // Skip if character is already used
    if (input.indexOf(char) != i) continue;

    const remainingChars = input.slice(0, i) + input.slice(i + 1, input.length);

    // Recurse on the sub-problem, and add each solution to the results
    for (let perm of getPermutations(remainingChars)) {
      permutations.push(char + perm);
    }
  }

  return permutations;
}
function getRegex(numberFormat: number[]): RegExp {
  let minPattern: string[] = [];
  for (let i = 0; i < numberFormat.length; i++) {
    minPattern.push("#".repeat(numberFormat[i]));
  }
  let regex = new RegExp(".*" + minPattern.join(".+") + ".*", "g");
  return regex;
}

let conditionRecords: string[][] = [];
let numberRecords: number[][] = [];

const data = fs.readFileSync("day12.txt", "utf8");
const lines = data.split(/\n/).map((line) => {
  const records = line.split(" ");
  conditionRecords.push(records[0].split(""));
  numberRecords.push(records[1].split(",").map((el) => Number(el)));
});

let total = 0;
conditionRecords.forEach((conditionRecord, index) => {
  const numberRecord = numberRecords[index];
  const totalDamaged: number = numberRecord.reduce((acc, curr) => acc + curr);
  const questionMarkIndexes: number[] = [];
  const fixedIndexes: number[] = [];
  const damagedIndexes: number[] = [];
  conditionRecord.forEach((char, index) => {
    if (char === "?") {
      questionMarkIndexes.push(index);
    } else if (char === ".") {
      fixedIndexes.push(index);
    } else if (char === "#") {
      damagedIndexes.push(index);
    }
  });
  let remainingDamaged = totalDamaged - damagedIndexes.length;
  let remainingFixed = questionMarkIndexes.length - remainingDamaged;

  const pattern = "#".repeat(remainingDamaged) + ".".repeat(remainingFixed);

  const allPermutations = getPermutations(pattern);
  const matchRegex = getRegex(numberRecord);

  for (let i = 0; i < allPermutations.length; i++) {
    let amendedRecord = conditionRecord;
    for (let j = 0; j < questionMarkIndexes.length; j++) {
      amendedRecord[questionMarkIndexes[j]] = allPermutations[i][j];
    }
    if (amendedRecord.join("").match(matchRegex)) {
      total++;
    }
  }
});

console.log(total);
