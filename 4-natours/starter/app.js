const express = require('express');

const app = express();

app.get('/', (req, res) => {
    console.log('Request received');
    console.log('req.body: \n', req.body);
    // res.status(200).send('<h2>Hello~ from server</h2>');
    res
    .status(200)
    .json({ 
        message: '<h2>Hello~ from server</h2>',
        app: 'Natours'
    });
})

app.post('/', (req, res) => {
    res
    .status(200)
    .send('You can post to this endpoint');
})

// To start a web server
const port = 8880;
const localhost = '127.0.0.1';
app.listen(port, localhost, () => {
    console.log(`Server is listening on ${localhost}:${port}`);
})