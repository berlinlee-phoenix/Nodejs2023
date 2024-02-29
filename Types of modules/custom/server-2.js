const express = require('express');
const bodyParser = require('body-parser');

// app = instance of express
const app = express();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json());
// Generic Express middleware
// app.use((req, res, next) => {
//     console.log('<h1>Hello</h1>')
//     next();
// })

app.get('/', (req, res) => {
    res.send("Getting Root")
});

app.get('/profile', (req, res) => {
    res.send("Getting profile")
});

// Try making a post request
app.post('/profile', (req, res) => {
    console.log('req.body', req.body);
    // const user = {
    //     name: 'Sally',
    //     id: '1',
    //     hobby: 'soccer',
    // }
    res.send("Success")
});

app.listen(3000)