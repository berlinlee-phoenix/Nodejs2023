// importing File System module

const fs = require('fs');

fs.readFile(`${__dirname}/inlanefreight.txt`, (err, data) => {
    let count;
    // Timer starts
    console.time('fun challenge');
    if (err) {
        console.log('err', err);
        throw err;
    } else {
        console.log('Async:\n', data.toString('utf-8'));
    }
    
    // Timer ends
    console.timeEnd('fun challenge');
})

/*
const file = fs.readFileSync(`${__dirname}/inlanefreight.txt`);
console.log('Sync:\n', file.toString('utf-8'));
*/

// Appending to a file
/*
fs.appendFile(`${__dirname}/hello.txt`, ' This is fun', err => {
    if (err) {
        console.log(err)
    }
})
*/


// Write
// fs.writeFile('bye.txt', 'Sad to say byebye', err => {
//     if (err) {
//         console.log(err);
//     }
// })


// DELETE
// fs.unlink('./bye.txt', err => {
//     if (err) {
//         console.log(err);
//     }
//     console.log('Inception')
// });