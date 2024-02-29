const fs = require('fs');
const server = require('http').createServer();

// Listen to a request event
server.on('request', (req, res) => {
    // Solution 1
    // Node.js will have to load entire large text file before 
    // sending back data to clients
    // App will crash
    // fs.readFile('./test-file.txt', (err, data) => {
    //     if (err) console.log(err);
    //     res.end(data);
    // });

    // Solution 2
    // Create a Stream to consume data piece by piece
    // Return each chunk of data to clients
    // const readable = fs.createReadStream('./test-file.txt');

    // // readable.on('data', chunk => {res.write(chunk)}) -->
    // // readable.on('end', ()=>{res.end()})
    // readable.on('data', chunk => {
    //     // Write it to a writable stream
    //     res.write(chunk);
    // })

    // // When stream is done reading entire file
    // readable.on('end', () => {
    //     res.end();
    // });

    // // Error
    // readable.on('error', err => {
    //     console.log(err);
    //     // if using express.js
    //     // res.status(500);
    //     res.writeHead(500, {
    //         'Content-type': 'text/html',
    //         'Custom-header': 'ooops, page NOT found :(',
    //         'Status-code': res.statusCode = 500,
    //     })
    //     res.statusCode = 500; // Server error
    //     res.end('<h1>File NOT found<h1>');
    // })
    // Nevertheless, there'll be Back Pressure for Streaming data
    // Back Pressure happens when the speed of sending data is NOT
    // as fast as receiving data from web server reading data from files

    // Solution 3
    // To overcome Back Pressure issues
    // Use pipe() on all 'Readable Streams'
    // to pipe OUTPUT of Readable Streams right into INPUT of Writable Streams
    // Auto-handle speed of coming in & speed of going out
    const readable = fs.createReadStream('./test-file.txt');
    readable.pipe(res);
    // readableSource.pipe(writeableDestination);
    // readableSource.pipe(duplexStream);
    // readableSource.pipe(transformStream);

});

const localhost = '127.0.0.1';
const port = 8881;
server.listen(port, localhost, () => {
    console.log(`Server has been started on ${localhost}:${port}`);
})
