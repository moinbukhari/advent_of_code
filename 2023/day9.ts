import fs from "fs";

const temp = `18 23 28 33 38 43 48 53 58 63 68 73 78 83 88 93 98 103 108 113 118`;
function getDifferenceArray(seq: number[]): number[] {
  let difArr: number[] = [];
  if (seq.length > 1) {
    for (let i = 0; i < seq.length - 1; i++) {
      difArr.push(seq[i + 1] - seq[i]);
    }
  } else {
    difArr.push(0);
  }

  return difArr;
}

function getArraySum(seq: number[]): number {
  return seq.reduce((acc, num) => acc + num);
}

function getNextNum(startingSeq: number[]): number {
  let seqExtrapolated = false;
  let nestedSeq: number[][] = [];
  let currSeq = startingSeq;
  let nextNum = 0;
  while (!seqExtrapolated) {
    //console.log(currSeq);
    nestedSeq.push(currSeq);

    if (!currSeq.every((n) => n === currSeq[0])) {
      currSeq = getDifferenceArray(currSeq);
    } else {
      seqExtrapolated = true;
    }
  }

  nextNum = nestedSeq.reduce((acc, arr) => {
    return acc + arr[arr.length - 1];
  }, 0);
  return nextNum;
}

const data = fs.readFileSync("day9.txt", "utf8");
const lines = data.split(/\n/).map((line) => {
  return line.split(" ").map((el) => {
    return Number(el);
  });
});

let nextNumArr: number[] = [];

lines.forEach((line) => {
  nextNumArr.push(getNextNum(line));
});
console.log(nextNumArr.length);
console.log(lines.length);
console.log(
  nextNumArr.reduce((acc, c) => {
    return acc + c;
  }, 0)
);
