const url = 'https://cors-anywhere.herokuapp.com/https://banno.com';
// store the page HTML to variable
let html;

// get html from banno.com
fetch(url)
    .then(res => res.text())
    .then(data => html = data)
    .catch(error => console.log(`${error} try again!`));

// find products on main page
const getProducts = () => {
    // add Banno's HTML to page and hide it so we can work the DOM and find products offered
    document.getElementById('hidden-content').innerHTML = html;
    // find the products list and grab the children
    let list = document.getElementById('sub-menu').children;
    // add count to HTML
    document.querySelector('#products').innerHTML = list.length;
};

// find top 3 alphanumeric characters
const findTopThree = () => {
    // find all alphanumeric characters
    let regex = /[a-z0-9]/gmi;
    let alphanumericChar = html.toLowerCase().match(regex);
    // put characters in an array so we can work with the data
    let htmlArray = [...alphanumericChar];
    // reduce loop through the array and count how many times each character occurs
    const countAlphaChar = htmlArray.reduce((obj, item) =>{
        if(!obj[item]) {
            obj[item] = 0;
        }
        obj[item]++;
        return obj;
    },{});
    // put back in an array with the key value pair
    let sortArray = [];
    for (let item in countAlphaChar) {
        sortArray.push([item, countAlphaChar[item]])
    };
    // sort array from highest to lowest
    let topThree = sortArray.sort((a, b) => {
        return b[1] - a[1];
    });
    // add top three to the HTML
    document.getElementById('first-num').innerHTML = topThree[0][0];
    document.getElementById('first-count').innerHTML = topThree[0][1];
    document.getElementById('second-num').innerHTML = topThree[1][0];
    document.getElementById('second-count').innerHTML = topThree[1][1];
    document.getElementById('third-num').innerHTML = topThree[2][0];
    document.getElementById('third-count').innerHTML = topThree[2][1];
    console.log(topThree)
};

// find number of .png images
const getPngCount = () => {
    // find all .png images
    let regex = /.png/gm;
    const pngCount = html.match(regex);
    // add count to the HTML
    document.querySelector('#png').innerHTML = pngCount.length;
};

// find twitter handle
const findTwitterHandle = () => {
    // credit for this regular expression goes to https://stackoverflow.com/a/6024856/8954321
    // find twitter handle
    let regexp = /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9]+)/;
    let twitterHandle = html.match(regexp);
    // add handle to HTML
    document.querySelector('#twitter-handle').innerHTML = twitterHandle[1];
    // add handle to working link in the HTML
    let link = document.getElementById('twitter');
    link.href = `https://twitter.com/${twitterHandle[1]}`;
};

// find how many times "financial institution" is used
const findPhrase = () => {
    // find the phrase financial institution
    let regexp = /financial institution/gm;
    let count = html.match(regexp);
    // add count to HTML
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
