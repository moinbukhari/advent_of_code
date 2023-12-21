import fs from "fs";

const temp = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`;

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

let nodes: TreeNode[] = [];
let directions: string[][] = [];
const data = fs.readFileSync("day8.txt", "utf8");

const lines = data.split(/\n\n/);

const path = lines[0];
const network = lines[1].split(/\n/);
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

let steps = 0;
let reachedEnd = false;
let startingNodeIndex = nodes.findIndex((node) => node.value === "AAA");
if (startingNodeIndex != -1) {
  let currNode = nodes[startingNodeIndex];
  while (!reachedEnd) {
    for (let i = 0; i < path.length; i++) {
      if (path[i] === "L" && currNode.left) {
        currNode = currNode.left;
      } else if (path[i] === "R" && currNode.right) {
        currNode = currNode.right;
      }
      steps++;
      console.log("Step", steps, "Node:", currNode.value);
      if (currNode.value === "ZZZ") {
        reachedEnd = true;
        break;
      }
    }
  }
}

console.log("steps:", steps);
