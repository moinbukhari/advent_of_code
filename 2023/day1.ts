import fs from "fs";
function reverseString(str: string): string {
  // Step 1. Use the split() method to return a new array
  var splitString = str.split(""); // var splitString = "hello".split("");
  // ["h", "e", "l", "l", "o"]

  // Step 2. Use the reverse() method to reverse the new created array
  var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
  // ["o", "l", "l", "e", "h"]

  // Step 3. Use the join() method to join all elements of the array into a string
  var joinArray = reverseArray.join(""); // var joinArray = ["o", "l", "l", "e", "h"].join("");
  // "olleh"

  //Step 4. Return the reversed string
  return joinArray; // "olleh"
}

function getFirstDigit(input: string): string {
  const line = input.replace(
    /zero|one|two|three|four|five|six|seven|eight|nine/g,
    function (match) {
      switch (match) {
        case "zero":
          return "0";
        case "one":
          return "1";
        case "two":
          return "2";
        case "three":
          return "3";
        case "four":
          return "4";
        case "five":
          return "5";
        case "six":
          return "6";
        case "seven":
          return "7";
        case "eight":
          return "8";
        case "nine":
          return "9";
        default:
          return "";
      }
    }
  );
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(Number(line[i]))) {
      return line[i];
    }
  }

  return "-1";
}

function getLastDigit(input: string): string {
  const line = reverseString(input).replace(
    /orez|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin/g,
    function (match) {
      switch (match) {
        case "orez":
          return "0";
        case "eno":
          return "1";
        case "owt":
          return "2";
        case "eerht":
          return "3";
        case "ruof":
          return "4";
        case "evif":
          return "5";
        case "xis":
          return "6";
        case "neves":
          return "7";
        case "thgie":
          return "8";
        case "enin":
          return "9";
        default:
          return "";
      }
    }
  );
  for (let i = 0; i < line.length; i++) {
    if (!isNaN(Number(line[i]))) {
      return line[i];
    }
  }

  return "-1";
}

const data = fs.readFileSync("day1.txt", "utf8");
const lines = data.split(/\r?\n/);

const sum_b = lines.reduce(
  (acc, line) => acc + Number(getFirstDigit(line).concat(getLastDigit(line))),
  0
);

console.log("sum_b is :", sum_b);
