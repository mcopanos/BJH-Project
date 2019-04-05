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
    let regex = /[a-z0-9]/gmi;
    let alphanumericChar = html.match(regex);

    let htmlArray = [...alphanumericChar];
    const countAlphaChar = htmlArray.reduce((obj, item) =>{
        if(!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    },{});

    // put obj in an array with the key value pair
    let sortArray = [];
    for (let item in countAlphaChar) {
        sortArray.push([item, countAlphaChar[item]])
    }
    // sort array from highest to lowest
    let topThree = sortArray.sort((a, b) => {
        return b[1] - a[1];
    });
    document.getElementById('firstNum').innerHTML = topThree[0][0];
    document.getElementById('firstCount').innerHTML = topThree[0][1];
    document.getElementById('secondNum').innerHTML = topThree[1][0];
    document.getElementById('secondCount').innerHTML = topThree[1][1];
    document.getElementById('thirdNum').innerHTML = topThree[2][0];
    document.getElementById('thirdCount').innerHTML = topThree[2][1];
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
};
// call all functions after data is loaded
setTimeout(() => {
    getProducts();
    findTopThree();
    getPngCount();
    findTwitterHandle();
    findPhrase();
}, 100);
