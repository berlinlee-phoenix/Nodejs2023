// class Calculator {
//     add(a, b) {
//         return a+b
//     }

//     multiply(a, b) {
//         return a*b
//     }

//     devide(a,b) {
//         return a/b
//     }

//     remainder(a,b) {
//         return a%b
//     }
// }

// module.exports = Calculator;

// Anonymous module.exports
module.exports = class {
    add(a, b) {
        return a+b
    }

    multiply(a, b) {
        return a*b
    }

    devide(a,b) {
        return a/b
    }

    remainder(a,b) {
        return a%b
    }
};