// ====Part2
// Find the 'position' of the 1st character that causes Santa
// to enter the basement (floor -1)
// The 1st character has position 1
// The 2nd character has position 2
// and so on
// For example,
// ) causes Santa to enter the basement at character position1
// ()()) causes Santa to enter the basement at position 5

function question2 () {
    console.time("part2")
  // importing File System module
  const fs = require("fs");

  // Read inputs from './input.txt'
  const input = fs.readFileSync("./input.txt", (err, data) => {
    if (err) {
      console.log(err);
    }
    return data;
  });

  // Stringify data from const input
  const input_str = input.toString();
  console.log("input_str\n", input_str);

  // splitting input_str will get us an array
  // joining it back will give us an iterable array
  const input_arr = input_str.split(" ").join(" ");

  // Preparing to loop through input_arr
  const len = input_arr.length;
  console.log("input len\n", len);

  // Wanna hashmap to solve this coding challenge
  function findPosition(something) {
    const hashMap = {
      "(": 1,
      ")": -1,
    };

    let level = 0
    let position = 0

    for (i = 0; i < len; i++) {
      level += hashMap[something[i]];
      position++;
      if (level === -1) {
        console.log(`Santa enters basement at position ${position}`)
        return position
      }
    }

  }

  const santaPosition = findPosition(input_arr);
  const printPosition = console.log("Position:\n", santaPosition);
  printPosition
  console.timeEnd("part2")
}

question2();
