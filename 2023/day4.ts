import fs from "fs";

const temp = `Card 1: 41 48 83 86 17 | 83 86  6 31 17  9 48 53
Card 2: 13 32 20 16 61 | 61 30 68 82 17 32 24 19
Card 3:  1 21 53 59 44 | 69 82 63 72 16 21 14  1
Card 4: 41 92 73 84 69 | 59 84 76 51 58  5 54 83
Card 5: 87 83 26 28 32 | 88 30 70 12 93 22 82 36
Card 6: 31 18 13 56 72 | 74 77 10 23 35 67 36 11`;

const data = fs.readFileSync("day4.txt", "utf8");
const lines = data.split(/\r?\n/).map((line) => {
  return line.split(/:/)[1].trim();
});
const tempLines = temp.split(/\r?\n/).map((line) => {
  return line.split(/:/)[1].trim();
});

let winningNums: string[] = [];
let myNums: string[] = [];
lines.forEach((line) => {
  const combos = line.split(/\|/).map((combo) => combo.trim());
  winningNums.push(combos[0]);
  myNums.push(combos[1]);
});
const winningSets = winningNums.map((card) => {
  const updatedCard: number[] = [];
  const nums = card.match(/\d+/g);
  if (nums && nums.length > 0) {
    nums.forEach((num) => {
      updatedCard.push(Number(num));
    });
  }
  return new Set(updatedCard);
});
const myNumsSets = myNums.map((card) => {
  const updatedCard: number[] = [];
  const nums = card.match(/\d+/g);
  if (nums && nums.length > 0) {
    nums.forEach((num) => {
      updatedCard.push(Number(num));
    });
  }
  return new Set(updatedCard);
});

let pointsArray: number[] = [];
let intersectionArray: number[] = [];
winningSets.forEach((card, index) => {
  const intersectionSet = new Set(
    [...card].filter((x) => myNumsSets[index].has(x))
  );
  if (intersectionSet.size > 0) {
    pointsArray.push(2 ** (intersectionSet.size - 1));
  }
  intersectionArray.push(intersectionSet.size);
});
//console.log(pointsArray.reduce((acc, num) => acc + num));
//console.log(intersectionArray);
// console.log(winningSets);
// console.log(myNumsSets);

let numCards: number[] = Array(lines.length).fill(1);

console.log(numCards);
for (let i = 0; i < numCards.length; i++) {
  //   console.log("numCards[i]: ", numCards[i]);
  //   console.log(numCards);
  for (let k = 0; k < numCards[i]; k++) {
    // console.log("intersectionArray[i]", intersectionArray[i]);
    for (
      let j = i + 1;
      j <= i + intersectionArray[i] && j < numCards.length;
      j++
    ) {
      numCards[j] = numCards[j] + 1;
    }
  }
}
console.log(numCards.reduce((acc, sum) => acc + sum, 0));
