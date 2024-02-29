// Question 1
// What floor does Santa end up on?
// ( --> should go up 1 floor
// ) --> should go down 1 floor
// (()) --> should go to 0 floor
// ((()))))) --> should go up 3 floors
// etc

// importing File System module
const fs = require("fs");

function question1() {
  // Solution 1
  // Read inputs from './input.txt'
  fs.readFile("./input.txt", (err, data) => {
    console.time("Coding Challenge");
    if (err) {
      console.log(err);
    }
    const input = data.toString();
    const input_arr = input.split('');
    console.log('input_arr ', input_arr);
    console.log('typeof input_arr ', typeof input_arr);

    const result = input_arr.reduce((acc, currentValue) => {
    
      if (currentValue === '(') {
        return acc += 1
      } else if (currentValue === ')') {
        return acc -=1
      }
    }, 0) // start off from 0
    console.log('result ', result); // 138
    console.timeEnd("Coding Challenge");
  });
 

  // Solution 2
  // Start timing this coding challenge program
  // console.time("Coding Challenge");
  // const input = fs.readFileSync('./input.txt', (err, data) => {
  //   if (err) {
  //     console.log('err ', err);
  //   }
  //   return data
  // })
  // const input_str = input.toString();
  // const input_arr = input_str.split('');
  // console.log('input_arr ', input_arr);

  // // Preparing to loop through input_arr
  // const len = input_arr.length;
  // console.log("input len\n", len);

  // // Wanna hashmap to solve this coding challenge
  // function findSanta(something) {
  //   const hashMap = {
  //     "(": 1,
  //     ")": -1,
  //   };

  //   let result = 0;

  //   for (i = 0; i < len; i++) {
  //     result = result + hashMap[something[i]];
  //   }

  //   return result;
  // }
  // const floor = findSanta(input_arr);
  // const printFloor = console.log("Floor:\n", floor);
  // printFloor;
  // console.log(`Santa is going to ${floor}th floor~`);

  // console.timeEnd("Coding Challenge");
}

question1();

function question2() {
  console.time('q2');
    fs.readFile('./input.txt', (err, data) => {
      const directions = data.toString();
      const directionsArray = directions.split('');
      let accumulator = 0;
      let counter = 0;
      const answer = directionsArray.some((currentItem) => {
        if (currentItem === '(') {
          accumulator += 1
        } else if (currentItem === ')') {
          accumulator -=1
        }
        counter ++
        // return accumulator < 0;
        if (accumulator < 0) {
          return counter;
        }
      })
      console.log('basement entered at position: ', counter);
    })
    console.timeEnd('q2');
}
question2();