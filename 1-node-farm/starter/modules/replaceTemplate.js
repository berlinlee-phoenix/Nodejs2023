// Arrow function to replace {%%} with product props in data.json

// Using module.exports = (arugment1, argument2) => {...} to export
// an Arrow Function, without an ES6 package.json --> "type": "module",
module.exports = (temp, product) => {
    // Avoid direct mutation of original template by storing temp in a new var
    let output = temp.replace(/{%PRODUCTNAME%}/g, product.productName);
    // this function mutates all {%%} in template-xx.html with each obj in json
    // const cardsHtml = dataObj.map(element => replaceTemplate(tempCard, element)).join('');
    // Start mutating now
    // Replacing all {%%} with 
    output = output.replace(/{%IMAGE%}/g, product.image);
    output = output.replace(/{%PRICE%}/g, product.price);
    output = output.replace(/{%FROM%}/g, product.from);
    output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
    output = output.replace(/{%QUANTITY%}/g, product.quantity);
    output = output.replace(/{%DESCRIPTION%}/g, product.description);
    output = output.replace(/{%ID%}/g, product.id);

    if (!product.organic) {
        output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
    }
    return output; // output final Html after replacing
}
