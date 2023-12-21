import fs from "fs";

const temp = `0 3 6 9 12 15
1 3 6 10 15 21
10 13 16 21 30 45`;

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
  nextNumArr.push(getNextNum(line.reverse()));
});
console.log(nextNumArr);
console.log(
  nextNumArr.reduce((acc, c) => {
    return acc + c;
  }, 0)
);
