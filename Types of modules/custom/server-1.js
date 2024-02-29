const http = require('http');
// import * as http from 'http';

const server = http.createServer((request, response) => {
    // console.log("I hear you!. thanks for the request")
    // Declaring content type
    // console.log('request.headers', request.headers)
    console.log('request.method', request.method)
    console.log('request.url', request.url)

    // Try to send a javascript object
    const user = {
        name: 'John',
        hobby: 'Skating',
    }
    // response.setHeader('Content-Type', 'text/html');
    // response.end('<h1>Hello</h1>');
    response.setHeader('Content-Type', 'application/json');
    response.end(JSON.stringify(user));
})

server.listen(3000);