import fs from "fs";

const temp = `seeds: 79 14 55 13

seed-to-soil map:
50 98 2
52 50 48

soil-to-fertilizer map:
0 15 37
37 52 2
39 0 15

fertilizer-to-water map:
49 53 8
0 11 42
42 0 7
57 7 4

water-to-light map:
88 18 7
18 25 70

light-to-temperature map:
45 77 23
81 45 19
68 64 13

temperature-to-humidity map:
0 69 1
1 0 69

humidity-to-location map:
60 56 37
56 93 4`;

function getMappedOutput(input: number, mapping: number[][]) {
  const rows = mapping.length;
  for (let i = 0; i < rows; i++) {
    const destStart = mapping[i][0];
    const srcStart = mapping[i][1];
    const range = mapping[i][2];
    if (srcStart <= input && input < srcStart + range) {
      return destStart + (input - srcStart);
    }
  }
  return input;
}
function splitInputIntervals(
  inputStart: number,
  inputEnd: number,
  srcStart: number,
  srcEnd: number
): number[][] {
  if (inputStart >= srcStart) {
    if (inputEnd <= srcEnd) {
      return [[inputStart, inputEnd]];
    } else if (inputStart <= srcEnd) {
      return [
        [inputStart, srcEnd],
        [srcEnd + 1, inputEnd],
      ];
    }
  } else if (inputEnd >= srcStart) {
    if (inputEnd <= srcEnd) {
      return [
        [inputStart, srcStart - 1],
        [srcStart, inputEnd],
      ];
    }
    {
      return [
        [inputStart, srcStart - 1],
        [srcStart, srcEnd],
        [srcEnd + 1, inputEnd],
      ];
    }
  }

  return [[inputStart, inputEnd]];
}
function getSplitIntervals(
  inputStart: number,
  inputEnd: number,
  mapping: number[][]
): number[][] {
  let splitIntervals: number[][] = [];
  const rows = mapping.length;
  for (let i = 0; i < rows; i++) {
    const destStart = mapping[i][0];
    const srcStart = mapping[i][1];
    const range = mapping[i][2];
    const srcEnd = srcStart + range - 1;
  }
  return splitIntervals;
}

function getLocation(
  seed: number,
  sts: number[][],
  stf: number[][],
  ftw: number[][],
  wtl: number[][],
  ltt: number[][],
  tth: number[][],
  htl: number[][]
): number {
  const soil = getMappedOutput(seed, sts);
  const fert = getMappedOutput(soil, stf);
  const water = getMappedOutput(fert, ftw);
  const light = getMappedOutput(water, wtl);
  const temperature = getMappedOutput(light, ltt);
  const humidity = getMappedOutput(temperature, tth);
  const location = getMappedOutput(humidity, htl);

  return location;
}

const data = fs.readFileSync("day5.txt", "utf8");
const lines = data.split(/\n\n/).map((line) => {
  return line
    .split(/:/)[1]
    .trim()
    .split(/\n/)
    .map((row) => {
      return row.split(" ").map((num) => {
        return Number(num);
      });
    });
});

// const lines = temp.split(/\n\n/).map((line) => {
//   return line
//     .split(/:/)[1]
//     .trim()
//     .split(/\n/)
//     .map((row) => {
//       return row.split(" ").map((num) => {
//         return Number(num);
//       });
//     });
// });

const seeds = lines[0].flat();
const seed_to_soil = lines[1];
const soil_to_fert = lines[2];
const fert_to_water = lines[3];
const water_to_light = lines[4];
const light_to_temp = lines[5];
const temp_to_hum = lines[6];
const hum_to_loc = lines[7];

//console.log(getMappedOutput(13, seed_to_soil));
let minLoc: number = Infinity;

// for (let i = 0; i < seeds.length; i++) {
//   if (i === 0) {
//     minLoc = getLocation(
//       seeds[i],
//       seed_to_soil,
//       soil_to_fert,
//       fert_to_water,
//       water_to_light,
//       light_to_temp,
//       temp_to_hum,
//       hum_to_loc
//     );
//   } else {
//     const currLoc = getLocation(
//       seeds[i],
//       seed_to_soil,
//       soil_to_fert,
//       fert_to_water,
//       water_to_light,
//       light_to_temp,
//       temp_to_hum,
//       hum_to_loc
//     );

//     if (currLoc < minLoc) {
//       minLoc = currLoc;
//     }
//   }
// }

//part2
let seedIntervals: number[][] = [];

for (let i = 0; i < seeds.length; i += 2) {
  seedIntervals.push([seeds[i], seeds[i] + seeds[i + 1] - 1]);
}

console.log(seedIntervals);

for (let i = 0; i < seedIntervals.length; i++) {
  for (let j = seedIntervals[i][0]; j <= seedIntervals[i][1]; j++) {
    const currLoc = getLocation(
      j,
      seed_to_soil,
      soil_to_fert,
      fert_to_water,
      water_to_light,
      light_to_temp,
      temp_to_hum,
      hum_to_loc
    );

    if (currLoc < minLoc) {
      minLoc = currLoc;
    }
  }
  console.log(
    "seed range is:(",
    seedIntervals[i][0],
    ",",
    seedIntervals[i][1],
    ") minLoc so far ->",
    minLoc
  );
}

console.log(minLoc);
