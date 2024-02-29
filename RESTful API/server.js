const express = require('express');
const app = express();

app.use(express.urlencoded({extended: false}))
app.use(express.json());
app.use(express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    // Most frequently used
    // ==== req.query
    // for Query Strings
    // localhost:3344/?name=andrei&age=31
    // console.log('req.query', req.query);
    
    // ==== req.body
    // for JSON bodyParser
    // console.log('req.body', req.body);
    
    // ==== req.headers
    // Use POSTman
    // console.log(req.headers);

    // ==== req.params
    // Using parameters of URL
    // console.log('req.params', req.params);
    
    res.status(404).send("not found");
})

// app.get('/profile', (req, res) => {
//     res.send("GET profile");
// })

// app.post('/profile', (req, res) => {
//     console.log('req.body', req.body);
//     res.send('POST Profile created successfully');
// })

app.listen(3344);