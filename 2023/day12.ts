import fs from "fs";

const temp = `???.### 1,1,3
.??..??...?##. 1,1,3
?#?#?#?#?#?#?#? 1,3,1,6
????.#...#... 4,1,1
????.######..#####. 1,6,5
?###???????? 3,2,1`;

const cache: { [key: string]: number } = {};

function getValidCombos(record: string[], groups: number[]): number {
  const key = `${record.join("")}-${groups.join(",")}`;

  if (cache[key] !== undefined) {
    return cache[key];
  }

  if (groups.length === 0) {
    if (!record.includes("#")) {
      return 1;
    } else {
      return 0;
    }
  }

  if (record.length === 0) {
    return 0;
  }

  const next_char = record[0];
  const next_group = groups[0];
  let poss = 0;
  function handleDamaged(): number {
    const this_group = record.slice(0, next_group).map((char) => {
      if (char === "?") {
        return "#";
      } else {
        return char;
      }
    });

    if (this_group.join("") !== "#".repeat(next_group)) {
      return 0;
    }

    if (record.length === next_group) {
      if (groups.length === 1) {
        return 1;
      } else {
        return 0;
      }
    }

    if (record[next_group] === "." || record[next_group] === "?") {
      return getValidCombos(record.slice(next_group + 1), groups.slice(1));
    }

    return 0;
  }

  if (next_char === "#") {
    poss += handleDamaged();
  } else if (next_char === ".") {
    poss += getValidCombos(record.slice(1), groups);
  } else if (next_char === "?") {
    poss += getValidCombos(record.slice(1), groups) + handleDamaged();
  }

  cache[key] = poss;
  return poss;
}

let conditionRecords: string[][] = [];
let numberRecords: number[][] = [];

const data = fs.readFileSync("day12.txt", "utf8");
data.split(/\n/).map((line) => {
  const records = line.split(" ");
  conditionRecords.push(records[0].split(""));
  numberRecords.push(records[1].split(",").map((el) => Number(el)));
});

const arrangements: number[] = [];
for (let i = 0; i < conditionRecords.length; i++) {
  const conditionRecord = (conditionRecords[i].join("") + "?")
    .repeat(5)
    .slice(0, -1)
    .split("");
  const numberRecord = (numberRecords[i].join(",") + ",")
    .repeat(5)
    .slice(0, -1)
    .split(",")
    .map((el) => Number(el));
  const totalValidCombos = getValidCombos(conditionRecord, numberRecord);

  arrangements.push(totalValidCombos);
}

console.log(arrangements.reduce((acc, curr) => acc + curr));
