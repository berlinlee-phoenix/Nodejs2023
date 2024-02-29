// import local modules
const fs = require('fs');
// Networking capabilities => Building a HTTP server
const http = require('http');
// URL module
const url = require('url');

// import 3rd party module
const slugify = require('slugify');
// slugify can specify routes i.e. 127.0.0.1:8880/product/fresh-avocados
// instead of Query Strings /product?id=0

// import our custom module
const replaceTemplate = require('./modules/replaceTemplate');
// ============File System: Sync vs Async================

// Sync - Blocking
// const textInput = fs.readFileSync('./txt/input.txt', (err, data) => {
//     if (err) {
//         console.log('error: ', err)
//     }
//     return data;
// })

// // const textOutput = textInput.toString();
// const textOutput = `This is what we know about the avocado:\n${textInput}.\nCreated on ${new Date()}`;
// // console.log('textInput: ', textOutput);

// // Save output to a file
// // fs.writeFileSync('./txt/output.txt', textOutput);

// // ======

// // Async - Non-blocking I/O & Network requests
// // PHP - 1 new thread for each user
// // Callbacks != Async
// fs.readFile('./txt/start.txt', 'utf-8', (err, data1) => {
//     if (err) return console.log('error: ', err);
//     console.log('data1: ', data1);
//     // return data1;
//     fs.readFile(`./txt/${data1}.txt`, 'utf-8', (err, data2) => {
//         if (err) return console.log('error2: ', err);
//         console.log('data2: ', data2);
//         fs.readFile('./txt/append.txt', 'utf-8', (err, data3) => {
//             if (err) return console.log('error3: ', err);
//             console.log('data3: ', data3);
//             fs.writeFile('./txt/final.txt', `${data2}\n${data3}`, 'utf-8', err => {
//                 if (err) return console.log('error: ', err);
//                 console.log('File has been written');
//             })
//         })
//     })
// });
// console.log('Wil read file');

//=================================================
// Server

// Top-level code only executes once
// Can only use Sync for top-level code
const tempOverview = fs.readFileSync(`${__dirname}/templates/template-overview.html`, 'utf-8');
const tempCard = fs.readFileSync(`${__dirname}/templates/template-card.html`, 'utf-8');
const tempProduct = fs.readFileSync(`${__dirname}/templates/template-product.html`, 'utf-8');
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8');
const dataObj = JSON.parse(data);

// Changing dataObj prop: productName to lowercase from data.json
const slugs = dataObj.map(element =>
  slugify(element.productName, {
    lower: true
  })
);
console.log('slugs: \n', slugs);

const server = http.createServer((req, res) => {
  // console.log('req.url ', req.url);
  // parsing request Query Strings to an object
  // To parse 127.0.0.1:8880/product?id=0 for
  // "productName": "Fresh Avocados", "id": 0
  // console.log('url.parse(req.url, true) ', url.parse(req.url, true));

  // req.url  /product?id=0
  // url.parse(req.url, true)  Url {
  // protocol: null,
  // slashes: null,
  // auth: null,
  // host: null,
  // port: null,
  // hostname: null,
  // hash: null,
  // search: '?id=0',
  // query: [Object: null prototype] { id: '0' },
  // pathname: '/product',
  // path: '/product?id=0',
  // href: '/product?id=0'
  // }
  // Using destructuring to declare query, pathname from Url {...} object
  const { query, pathname } = url.parse(req.url, true);
  // query = Url.query && pathname = Url.pathname
  // const pathname = req.url;

  // /overview page
  if (pathname === '/' || pathname === '/overview') {
    // Whenever receiving 127.0.0.1/overview request
    // return from memory
    console.log(req.url);
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    // loop through dataObj to return each object
    const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
    // console.log('cardsHtml: ', cardsHtml);
    const output = tempOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
    res.end(output);
    // /product page
  } else if (pathname === '/product') {
    // console.log('query: \n', query);

    // write a HTTP Header for 127.0.0.1:8880/product?id=
    res.writeHead(200, {
      'Content-type': 'text/html'
    });
    // if request Query Strings is: 127.0.0.1:8880/product?id=0
    // dataObj[0] will return
    // {
    //     "id": 0,
    //     "productName": "Fresh Avocados",
    //     "image": "🥑",
    //     "from": "Spain",
    //     "nutrients": "Vitamin B, Vitamin K",
    //     "quantity": "4 🥑",
    //     "price": "6.50",
    //     "organic": true,
    //     "description": "A ripe avocado yields to gentle pressure when held in the palm of the hand and squeezed. The fruit is not sweet, but distinctly and subtly flavored, with smooth texture. The avocado is popular in vegetarian cuisine as a substitute for meats in sandwiches and salads because of its high fat content. Generally, avocado is served raw, though some cultivars, including the common 'Hass', can be cooked for a short time without becoming bitter. It is used as the base for the Mexican dip known as guacamole, as well as a spread on corn tortillas or toast, served with spices."
    // }
    // and so on for id: 1, 2, 3, ...
    const product = dataObj[query.id];
    // Replace {%%} in template-product.html with data obj in data.json
    const output = replaceTemplate(tempProduct, product);
    // Send response of replaced template-product.html to clients
    res.end(output);
    // /api page
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
      'custom-header': 'Nice :D'
    });
    // console.log(productData);
    res.end(data); // need to send data back as string

    // 404 NOT FOUND
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'NOT FOUND :('
    });
    res.end('<h1>Page not found<h1>');
  }
});

// server.listen(port, loalhost||loopback address)
server.listen((port = 8880), (localhost = '127.0.0.1'), () => {
  console.log(`Server is now listening on ${localhost}:${port}`);
});

// Listens to incoming requests from clients
// 127.0.0.1:8880/product
