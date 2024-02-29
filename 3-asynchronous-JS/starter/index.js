const fs = require('fs');
const superagent = require('superagent');

// Create Arrow func to return new Promise that fs.readFile
const readFilePro = (file) => {
    return new Promise((resolve, reject) => { // executer func
        fs.readFile(file, (err, data) => {
            // if there's an error --> reject() --> piped into .catch()
            if (err) reject('Could NOT find file'); 
            // Promise returns data to us will be piped into .then()
            resolve(data); 
        })
    });
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('Could NOT write file');
            // fs.writeFile doesn't need to return data
            resolve('write succeeded');
        })
    })
}

// Async func lets other tasks keep running in Event Loop
const getDogPic = async () => {
    try {
        // Stop operation of this line below, until it returns 
        // & finally stores results to const data
        const data = await readFilePro(`${__dirname}/dog-1.txt`);
        console.log(`Breed: ${data}`);
        
        // Suppose we wanna get 3 random Dog images at the same time
        // Storing a const resPro = superagent.get(`url`);
        // will NOT get us a resolved Promise

        // Solution 1
        const res1Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res2Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        const res3Pro = superagent.get(
            `https://dog.ceo/api/breed/${data}/images/random`
        );
        
        const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
        const imgs = all.map(element => {
            // console.log('element: \n', element);
            console.log('element.body: \n', element.body);
            console.log('element.body.message: \n', element.body.message);
            return element.body.message;
        });
        console.log('imgs: \n', imgs);

        await writeFilePro('./dog-img.txt', imgs.join('\n'));
        console.log('Random dog image saved to file');
        
        // Solution 2
        // Store urls as an array
        // const urls = [
        //     `https://dog.ceo/api/breed/${data}/images/random`,
        //     `https://dog.ceo/api/breed/${data}/images/random`,
        //     `https://dog.ceo/api/breed/${data}/images/random`
        // ];

        // // Destructuring urls to Promise.all => fetch each url
        // const [res1Pro, res2Pro, res3Pro] = await Promise.all(urls.map(url => 
        //     fetch(url).then(res => res.json())))
        //     console.log('res1Pro.message: \n', res1Pro.message)
        //     console.log('res2Pro.message: \n', res2Pro.message)
        //     console.log('res3Pro.message: \n', res3Pro.message)
        
        // // Using template strings to writeFilePromise for each url
        // await writeFilePro('./dog-img.txt', `${res1Pro.message}\n${res2Pro.message}\n${res3Pro.message}\n`);        
        
        // For 1 url only
        // console.log('all Promise.all\n', all);
        // console.log('res.body.message', res.body.message);

        // await writeFilePro('dog-img.txt', res.body.message);
        // Writing the 3 images to './dog-img.txt'
        // join images each by a new line
        
    } catch (err) {
        console.log(err);
        throw Error;
    }
    return '2: READY';
};

/*
console.log('1: Will get dog pics!');
// const x = getDogPic();
// console.log(x);
// getDogPic();
getDogPic()
.then(x => {
    console.log(x);
    console.log('3: Done getting dog pics!');
})
.catch(err => {
    console.log('Error!');
});
*/

// Use IIFE
(async () => {
    try {
        console.log('1: Will get dog pics!');
        const x = await getDogPic();
        console.log(x);
        
    } catch(err) {
        console.log('Error!\n', err);
    } finally {
        console.log('3: Done getting dog pics!');
    }
}) ();

/*
// readFilePro(fileName)
// return a Promise before calling each of them
readFilePro(`${__dirname}/dog-1.txt`) 
.then(data => {
    console.log(`Breed: ${data}`);
    // To keep chaining .then(), must return a Promise
    // return a Promise before calling each of them
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
})
.then(res => {
    console.log('res.body.message', res.body.message);
    // To keep chaining .then(), must return a Promise
    // return a Promise before calling each of them
    return writeFilePro('dog-img.txt', res.body.message)
    // fs.writeFile('dog-img.txt', res.body.message, err => {
    //     if (err) return console.log(err.message);
    //     console.log('Random dog image saved to file')
    // });
})
.then(() => {
    console.log('Random dog image saved to file!');
})
.catch(err => {
    console.log('err', err);
});
*/