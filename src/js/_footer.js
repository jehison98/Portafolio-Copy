'use strict'

/* constants */
const footerCopy = document.getElementById('footer-copy'); 

/* Create a constats with the actual date and year */
const date = new Date();
const year = date.getFullYear();

/* Write in the html the actual year */
footerCopy.append(year);