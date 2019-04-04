const url = 'https://cors-anywhere.herokuapp.com/https://banno.com';
let html;

// get html from banno.com
fetch(url)
    .then(res => res.text())
    .then(data => html = data)
    //.then(() => console.log(html))
    .catch(error => console.log(`${error} try again!`));

// find products on main page
const getProducts = () => {
    let products = [];

    let regex = /digital-banking-suite/m;
    let productOne = html.match(regex);

    let regexTwo = /website-products/m;
    let productTwo = html.match(regexTwo);

    products.push(productOne, productTwo);
    document.querySelector('#products').innerHTML = products.length;

};

// find top 3 alphanumeric characters
const findTopThree = () => {
    let regex = /[a-zA-Z0-9]/g;
    let alphanumericChar = html.match(regex);

    let htmlArray = [...alphanumericChar];
    const countAlphaChar = htmlArray.reduce((obj, item) =>{
        if(!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    },{});
    // now sort highest to lowest
    console.log(countAlphaChar)
};

// find number of .png images
const getPngCount = () => {
  let regex = /.png/gm;
  const pngs = html.match(regex);
  document.querySelector('#png').innerHTML = pngs.length;
};

// find twitter handle
const findTwitterHandle = () => {
    // credit for this regular expression goes to https://stackoverflow.com/a/6024856/8954321
    let regexp = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)/;
    let twitterHandle = html.match(regexp);
    document.querySelector('#twitter-handle').innerHTML = twitterHandle[1];

    let link = document.getElementById('twitter');
    link.href = `https://twitter.com/${twitterHandle[1]}`;
};

// find how many times "financial institution" is used
const findPhrase = () => {
    let regexp = /financial institution/gm;
    let count = html.match(regexp);
    document.querySelector('#financial-institution').innerHTML = count.length;
    console.log(count.length);
};
// call all functions after data is loaded
setTimeout(() => {
    getProducts();
    findTopThree();
    getPngCount();
    findTwitterHandle();
    findPhrase();
}, 100);
