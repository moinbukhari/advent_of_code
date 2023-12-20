import fs from "fs";
function enoughReds(input: string): boolean {
  const num = input.split(/red/g)[0];

  if (Number(num) > 12) {
    return false;
  }
  return true;
}
function enoughBlues(input: string): boolean {
  const num = input.split(/blue/g)[0];

  if (Number(num) > 14) {
    return false;
  }
  return true;
}
function enoughGreens(input: string): boolean {
  const num = input.split(/green/g)[0];
  if (Number(num) > 13) {
    return false;
  }
  return true;
}

const data = fs.readFileSync("day2.txt", "utf8");
const lines = data.split(/\r?\n/);
const temp = `Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green
Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue
Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red
Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red
Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green`;
const tempLines = temp.split(/\r?\n/);

//part 1
const lines_with_games = tempLines.map((line) => {
  const game = line
    .split(":")[1]
    .replace(/\s/g, "")
    .split(/;/)
    .map((blocks) => {
      return blocks.split(/,/g);
    });

  const game_analysed = game.map((show) => {
    for (let i = 0; i < show.length; i++) {
      if (show[i].includes("red")) {
        if (!enoughReds(show[i])) {
          return false;
        }
      } else if (show[i].includes("blue")) {
        if (!enoughBlues(show[i])) {
          return false;
        }
      } else if (show[i].includes("green")) {
        if (!enoughGreens(show[i])) {
          return false;
        }
      }
    }
    return true;
  });
  if (game_analysed.includes(false)) {
    return false;
  }
  return true;
});
console.log(
  lines_with_games.reduce((acc, game, index) => {
    if (game) {
      return acc + (index + 1);
    }
    return acc;
  }, 0)
);
//console.log(enoughReds("3blue,8green,14red"));

//part 2

const power_of_games = lines.map((line) => {
  let min_reds = 0;
  let min_greens = 0;
  let min_blues = 0;

  const game = line
    .split(":")[1]
    .replace(/\s/g, "")
    .split(/;/)
    .map((blocks) => {
      return blocks.split(/,/g);
    });

  game.forEach((show) => {
    for (let i = 0; i < show.length; i++) {
      if (show[i].includes("red")) {
        const num_reds = Number(show[i].split(/red/g)[0]);
        if (num_reds > min_reds) {
          min_reds = num_reds;
        }
      } else if (show[i].includes("blue")) {
        const num_blues = Number(show[i].split(/blue/g)[0]);
        if (num_blues > min_blues) {
          min_blues = num_blues;
        }
      } else if (show[i].includes("green")) {
        const num_greens = Number(show[i].split(/green/g)[0]);
        if (num_greens > min_greens) {
          min_greens = num_greens;
        }
      }
    }
  });
  return min_reds * min_blues * min_greens;
});

console.log(power_of_games.reduce((acc, power) => acc + power));
