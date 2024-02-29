const EventEmitter = require('events');

const http = require('http');
const url = require('url');

// Listen to Events => React accordingly
// Similar to setting up an Event Listener that listens to Button clicks
// myEmitter will eventually emit a named event
// const myEmitter = new EventEmitter();

// class Sales inherits all classes from EventEmitter class
// http, fs modules all implement inheritance of EventEmitter internally
class Sales extends EventEmitter {
    constructor() {
        super();

    }
    
}
const myEmitter = new Sales();
// myEmitter.on = Observers
// Observers listen to Events 
// myEmitter listens on newSale event, followed by a Callback func
myEmitter.on('newSale', () => {
    console.log('There was a new sale!')
})

// myEmitter listens on newSale event, followed by a Callback func
myEmitter.on('newSale', () => {
    console.log('Costumer name: Jonas');
})

myEmitter.on('newSale', stock => {
    // amount of items left
    console.log(`There are now ${stock} items left in stock.`);
})
// Emitter
// An online store or something
// can pass 2nd arguments into an Emitter
myEmitter.emit('newSale', 9); // as if we're clicking on a button

// ======Create a small web server that listens to Events that it emits
const server = http.createServer();

// Listens to different Events that the server will emit
server.on('request', (req, res) => {
    console.log('Request received! ');
    console.log(req.url);
    res.end('Request received'); // Can only send 1 response
})

server.on('request', (req, res) => {
    console.log('Another request received! ');
})

// Listens to Server shutdown
// Server will NOT shutdown as long as it's still listening on Events
server.on('close', () => {
    console.log('Server closed');
    
})

const localhost = '127.0.0.1';
const port = 8881;
server.listen(port, localhost, () => {
    console.log(`Server has been started on ${localhost}:${port}\nWaiting for requests...`);
})