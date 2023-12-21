import fs from "fs";

function getHandType(hand: string): number {
  let cardCount: [string, number][] = [];

  for (const card of hand) {
    const index = cardCount.findIndex((arr) => arr[0] === card);
    if (index !== -1) {
      cardCount[index][1] += 1;
    } else {
      cardCount.push([card, 1]);
    }
  }

  ////part2
  if (cardCount.length !== 1) {
    const jokerIndex = cardCount.findIndex((arr) => arr[0] === "J");
    if (jokerIndex !== -1) {
      const jokerArray = cardCount.splice(jokerIndex, 1);
      cardCount = cardCount.sort((a, b) => b[1] - a[1]);
      cardCount[0][1] += jokerArray[0][1];
    }
  }
  ////

  if (cardCount.length === 1) {
    return 10;
  } else if (cardCount.length === 2) {
    if (cardCount.findIndex((arr) => arr[1] === 4) !== -1) {
      return 9;
    } else {
      return 8;
    }
  } else if (cardCount.length === 3) {
    if (cardCount.findIndex((arr) => arr[1] === 3) !== -1) {
      return 7;
    } else {
      return 6;
    }
  } else if (cardCount.length === 4) {
    return 5;
  } else if (cardCount.length === 5) {
    return 4;
  }

  return 0;
}

function getWeightedHand(hand: string): number[] {
  const weightedHand1 = hand.split("").map((card) => {
    return Number(
      card.replace(/A|K|Q|J|T/, function (match) {
        switch (match) {
          case "T":
            return "10";
          case "J":
            //part1:
            //return "11";
            //part2
            return "1";
          case "Q":
            return "12";
          case "K":
            return "13";
          case "A":
            return "14";
          default:
            return "0";
        }
      })
    );
  });
  return weightedHand1;
}

function getScore(hand: string, handType: number): number {
  const weightedHand = getWeightedHand(hand);
  const score =
    handType * 625000000 +
    weightedHand[0] * 6250000 +
    weightedHand[1] * 125000 +
    weightedHand[2] * 2500 +
    weightedHand[3] * 50 +
    weightedHand[4] * 1;
  return score;
}

const temp = `32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483`;
const data = fs.readFileSync("day7.txt", "utf8");

const hands: string[] = [];
const bids: number[] = [];
const handTypes: number[] = [];
const scores: number[] = [];
let rankedBids: number[][] = [];

const lines = data.split(/\n/).map((line) => {
  return line.split(" ");
});

lines.forEach((line) => {
  hands.push(line[0]);
  bids.push(Number(line[1]));
});

for (let i = 0; i < hands.length; i++) {
  handTypes.push(getHandType(hands[i]));
  scores.push(getScore(hands[i], handTypes[i]));
  rankedBids.push([bids[i], scores[i]]);
}

rankedBids = rankedBids.sort((a, b) => a[1] - b[1]);
rankedBids = rankedBids.map((row, index) => {
  return [row[0], index + 1];
});

console.log(rankedBids);
console.log(
  rankedBids.reduce((acc, curr) => {
    return acc + curr[0] * curr[1];
  }, 0)
);

// console.log(lines);
// console.log(hands);
// console.log(handTypes);
// console.log(scores);
// console.log(bids);
