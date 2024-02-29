// const c = require('./script2.js');
// import { largeNumber } from "./script2.js";

// const a = largeNumber;
let a;
if (1 === 1) {
    const { largeNumber } = await import ('./script2.js');
    a = largeNumber
}

const b = 5;
console.log('largeNumber', a, 'b', b);