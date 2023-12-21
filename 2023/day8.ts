import fs from "fs";

const temp = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`;

class TreeNode {
  value: string;
  left: TreeNode | null;
  right: TreeNode | null;

  constructor(value: string, left: TreeNode | null, right: TreeNode | null) {
    this.value = value;
    this.left = left;
    this.right = right;
  }
}

function getStepsToZ(startingNode: TreeNode) {
  let steps = 0;
  let reachedEnd = false;
  let currNode = startingNode;
  while (!reachedEnd) {
    for (let i = 0; i < path.length; i++) {
      if (path[i] === "L" && currNode.left) {
        currNode = currNode.left;
      } else if (path[i] === "R" && currNode.right) {
        currNode = currNode.right;
      }
      steps++;
      if (currNode.value[2] === "Z") {
        reachedEnd = true;
        break;
      }
    }
  }
  return steps;
}

function getLCM(numArr: number[]): number {
  let lcm = numArr[0];
  for (let i = 1; i < numArr.length; i++) {
    let max = Math.max(lcm, numArr[i]);
    let min = Math.min(lcm, numArr[i]);
    while (min) {
      let temp = max % min;
      max = min;
      min = temp;
    }
    lcm = (lcm * numArr[i]) / max;
  }
  return lcm;
}

let nodes: TreeNode[] = [];
let directions: string[][] = [];
const data = fs.readFileSync("day8.txt", "utf8");

const lines = data.split(/\n\n/);

const path = lines[0];
const network = lines[1].split(/\n/);
//create null nodes
network.forEach((line) => {
  const node = new TreeNode(line.split(/=/)[0].trim(), null, null);
  const direction = line
    .split(/=/)[1]
    .trim()
    .split(/,/)
    .map((row) => {
      return row.replace(/[\(\)]/g, "").trim();
    });
  directions.push(direction);
  nodes.push(node);
});

//add directions to nodes
nodes.forEach((inputNode, index) => {
  const leftNodeIndex = nodes.findIndex(
    (node) => node.value === directions[index][0]
  );
  const rightNodeIndex = nodes.findIndex(
    (node) => node.value === directions[index][1]
  );

  if (leftNodeIndex !== -1 && rightNodeIndex !== -1) {
    inputNode.left = nodes[leftNodeIndex];
    inputNode.right = nodes[rightNodeIndex];
  }
});

console.log(path);

//traverse nodes part 1
// let steps = 0;
// let reachedEnd = false;
// let startingNodeIndex = nodes.findIndex((node) => node.value === "AAA");
// if (startingNodeIndex != -1) {
//   let currNode = nodes[startingNodeIndex];
//   while (!reachedEnd) {
//     for (let i = 0; i < path.length; i++) {
//       if (path[i] === "L" && currNode.left) {
//         currNode = currNode.left;
//       } else if (path[i] === "R" && currNode.right) {
//         currNode = currNode.right;
//       }
//       steps++;
//       console.log("Step", steps, "Node:", currNode.value);
//       if (currNode.value === "ZZZ") {
//         reachedEnd = true;
//         break;
//       }
//     }
//   }
// }

// console.log("steps:", steps);

//traverese nodes part 2
let startingNodes: TreeNode[] = [];
let stepsArr: number[] = [];
for (let i = 0; i < nodes.length; i++) {
  if (nodes[i].value[2] === "A") {
    startingNodes.push(nodes[i]);
  }
}

console.log(startingNodes);
startingNodes.forEach((currNode) => {
  stepsArr.push(getStepsToZ(currNode));
});
console.log(stepsArr);
console.log(getLCM(stepsArr));
