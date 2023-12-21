import fs from "fs";
const data = fs.readFileSync("day9.txt", "utf8");
const nms = data.split(/\n/).map((r) => r.split(" ").map(Number));

const resultArr = nms.map((numbers) => {
  const childSteps = [numbers];
  const getCurrent = () => childSteps[childSteps.length - 1]!;
  while (!getCurrent().every((n) => n === getCurrent()[0])) {
    const current = getCurrent();
    let prev = current[0];
    const newArr: number[] = [];

    for (let i = 1; i < current.length; i++) {
      const n = current[i];
      newArr.push(n - prev);
      prev = n;
    }

    childSteps.push(newArr);
  }

  return childSteps.reduce((acc, c) => {
    return acc + c[c.length - 1];
  }, 0);
});
const sum = resultArr.reduce((acc, c) => {
  return acc + c;
});
console.log("sum", sum);
