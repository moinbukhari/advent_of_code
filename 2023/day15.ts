import fs from "fs";

const temp = `rn=1,cm-,qp=3,cm=2,qp-,pc=4,ot=9,ab=5,pc-,pc=6,ot=7`;

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

const data = fs.readFileSync("day15.txt", "utf8");

const sequenceSum = data
  .split(",")
  .map((step) => {
    return getHash(step);
  })
  .reduce((acc, num) => acc + num);

console.log(sequenceSum);
