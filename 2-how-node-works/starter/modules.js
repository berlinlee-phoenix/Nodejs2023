// console.log(arguments); // arguments = array in JS are objs we pass into a func

// console.log(require('module').wrapper); 

// module.exports
const C = require('./test-module-1');
const calc1 = new C();
console.log(calc1.add(2, 5));

// exports
// const calc2 = require('./test-module-2');
// console.log(calc2.add(2, 5));
// console.log(calc2.multiply(2, 5));
// console.log(calc2.divide(2, 5));
// console.log(calc2.remainder(2, 5));

// exports - ES6 destructuring
const { add, multiply, divide, remainder } = require('./test-module-2');
// console.log(add(2, 5));
// console.log(multiply(2, 5));
// console.log(divide(2, 5));
// console.log(remainder(2, 5));

// Caching
require('./test-module-3')();
require('./test-module-3')();
require('./test-module-3')();