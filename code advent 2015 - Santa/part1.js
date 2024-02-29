// 1 - What floor does Santa ends up on
// ( --> should go UP 1 floor
// ) --> should go DOWN 1 floor
const fs = require('fs');

function question1() {
    fs.readFile('./input.txt', (err, data) => {
        if (err) {
            console.log('err', err)
        }
        console.log(data);
        const directions = data.toString();
        const directionsArray = directions.split(' ');
        const answer = directionsArray.reduce((acc, currentValue) => {
            if (currentValue === '(') {
                return acc += 1
            } else if (currentValue === ')') {
                return acc -= 1
            }
        }, 0) // start off from 0
    })
}
question1();