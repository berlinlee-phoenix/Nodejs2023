const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
// Hosting files /public/text/*.txt in /public
app.use('/public', express.static('public'));
// app.use('/public', express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.send('Welcome~');
})

app.get('/public', (req, res) => {
    console.log('GET req.body', req.body);
    res.send(req.body.);
})

app.post('/', (req, res) => {
    res.send('Got POST request');
    console.log('POST req.body', req.body);
})

app.put('/user', (req, res) => {
    res.send('Got a PUT request for update at /user');
    console.log('PUT req.body', req.body);
})

app.delete('/user', (req, res) => {
    res.send('Got a DELETE request at /user');
    console.log('DEL req.body', req.body);
})

app.listen(3000);