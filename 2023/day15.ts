import fs from "fs";

const temp = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

const hashMap: { [box: number]: [string, number][] } = {};

function getHash(str: string): number {
  let currVal = 0;
  for (let i = 0; i < str.length; i++) {
    const asciiCode = str.charCodeAt(i);
    currVal += asciiCode;
    currVal = currVal * 17;
    currVal = currVal % 256;
  }

  return currVal;
}

function removeLabel(label: string) {
  const boxNum = getHash(label);
  if (hashMap[boxNum] !== undefined) {
    const lensIndex = hashMap[boxNum].findIndex((x) => x[0] === label);
    if (lensIndex !== -1) {
      hashMap[boxNum].splice(lensIndex, 1);
    }
  }
}

function addLabel(label: string, focalLength: number) {
  const boxNum = getHash(label);
  if (hashMap[boxNum] !== undefined) {
    const lensIndex = hashMap[boxNum].findIndex((x) => x[0] === label);
    if (lensIndex !== -1) {
      hashMap[boxNum][lensIndex] = [label, focalLength];
    } else {
      hashMap[boxNum].push([label, focalLength]);
    }
  } else {
    hashMap[boxNum] = [[label, focalLength]];
  }
}

const data = fs.readFileSync("day15.txt", "utf8");

//part1
// const sequenceSum = data
//   .split(",")
//   .map((step) => {
//     return getHash(step);
//   })
//   .reduce((acc, num) => acc + num);

data.split(",").forEach((step) => {
  if (step.includes("-")) {
    removeLabel(step.substring(0, step.length - 1));
  } else if (step.includes("=")) {
    const [label, focalLength] = step.split("=");
    addLabel(label, Number(focalLength));
  }
});

let focusingPower = 0;
for (const box in hashMap) {
  // Your code here
  if (hashMap[box].length !== 0) {
    focusingPower += hashMap[box].reduce((acc, el, index) => {
      const boxNo = Number(box) + 1;
      const slot = index + 1;
      return acc + boxNo * slot * el[1];
    }, 0);
  }
}

console.log(focusingPower);
