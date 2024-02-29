// import file system module
const fs = require('fs');
const crypto = require('crypto');

const start = Date.now(); // Current Date in ms

// environmental variable
// UV => libuv
// We will only have 1 thread in Thread Pool
// For Windows =>
// package.json "start": "set UV_THREADPOOL_SIZE=1 & node event-loop.js"
process.env.UV_THREADPOOL_SIZE=1;
// 0. Start app 
// 1. Execute 'top-level' code
// 2. Require module
// 3. Register Event Callbacks
// 4. Start Event Loop

setTimeout(() => console.log('Timer 1 finished'), 0);
setImmediate(() => console.log('Immediate 1 finished'));
// process.nextTick() finishes before Timer1 && Immediate1 finish 
process.nextTick(() => console.log('Process.nextTick() 1')); 

fs.readFile('./test-file.txt', () => {
    console.log('I/O finished');

    setTimeout(() => console.log('Timer 2 finished'), 0);
    setTimeout(() => console.log('Timer 3 finished'), 3000);

    // When there's no I/O callbacks in the queue
	// Event Loop checks if there's any setImmediate()
	// And execute setImmediate() right away after I/O finished
	// Even before expired timers
    setImmediate(() => console.log('Immediate 2 finished'));

    // process.nextTick() 2 finishes before Immediate2 && Timer2, Timer 3 finish
    process.nextTick(() => console.log('Process.nextTick() 2'));

    // Making 4 instances of password encryption

    // To encrypt a password
    // crypto.pbkdf2('password', 'salt', key length, algorithm, callback)
    // Remarks: SYNC crypto.pbkdf2 CANNOT be used as Callbacks => 
    // Event Loop BLOCKED!
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        // To time how long it takes to encrypt a password
        // Date.now() - start
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        // To time how long it takes to encrypt a password
        // Date.now() - start
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        // To time how long it takes to encrypt a password
        // Date.now() - start
        console.log(Date.now() - start, 'Password encrypted');
    });
    crypto.pbkdf2('password', 'salt', 100000, 1024, 'sha512', () => {
        // To time how long it takes to encrypt a password
        // Date.now() - start
        console.log(Date.now() - start, 'Password encrypted');
    });
})

console.log('Hello from top-level code');