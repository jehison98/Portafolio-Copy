'use strict';

const domain = "https://jehison98.github.io/JehisonGB/";

const footerDomain = document.querySelector('#footer small a');
const navbarDomain = document.getElementById('nav-brand');

let domainsArray = [footerDomain, navbarDomain];
domainsArray.forEach(element => {
    element.setAttribute("href", `${domain}`)
});