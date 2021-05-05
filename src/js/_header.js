'use strict'

import gsap from "gsap"; import "gsap";

/* All necesary DOM elements */
const com = document.querySelectorAll('span.com');
const jehi = document.querySelectorAll('span.jehison');
const lead = document.querySelector('.lead');

/* Gsap animations for header */
/* Animation for all svg's */
gsap.fromTo('#svg-intro', { scale: 0, transformOrigin: 'center' }, { scale: 1, ease: 'back', duration: 3 });

/* Computer animation */
let tl = gsap.timeline({ repeat: 0, yoyo: false });
tl.fromTo('#svg-intro-computer', { y: 200, opacity: 0 }, { y: 0, opacity: 1, ease: 'linear', duration: 0.3, delay: 1.5 });
tl.fromTo('#svg-intro-screen', { opacity: 0 }, { opacity: 1, ease: 'bounce.inOut', duration: 0.5, onComplete: onComplete }, '+=0.3');
tl.fromTo('#svg-intro-code', { opacity: 0 }, { opacity: 1, ease: 'linear', duration: 0.5, onComplete: iconsAnimation }, '+=0.4');

/* Function to repeat the bounce screen computer animation */
function onComplete() {
    let timeL = gsap.timeline({ repeat: 1, yoyo: true });
    timeL.fromTo('#svg-intro-screen', { opacity: 1 }, { opacity: 0.5, ease: 'bounce.inOut', duration: 0.5 });
}

/* Animation for the displace all the languages icons */
function iconsAnimation() {

    gsap.to('#svg-intro-icon6', {
        duration: 0.5,
        x: -1000,
    });
    gsap.to('#svg-intro-icon5', {
        duration: 0.5,
        x: -1500,
    });
    gsap.to('#svg-intro-icon4', {
        duration: 0.5,
        x: -395,
    });
    gsap.to('#svg-intro-icon3', {
        duration: 0.5,
        x: 395,
    });
    gsap.to('#svg-intro-icon2', {
        duration: 0.5,
        x: 1000,
    });
    gsap.to('#svg-intro-icon1', {
        duration: 0.5,
        x: 1500,
        onComplete: writeName,
    });

}

/* Infinity loop for the underScore computer */
function underScore() {
    gsap.fromTo('#svg-intro-underscore', {
        opacity: 0,
    },
        {
            opacity: 1,
            ease: 'steps(1)',
            duration: 1,
            repeat: -1
        })
}

/* Name animation */
function writeName() {

    underScore();

    com.forEach(function (element, index) {

        setTimeout(function () {
            element.classList.add('transparent');
        }, index * 100);

    });

    jehi.forEach(function (element, index) {

        setTimeout(function () {
            element.classList.remove('transparent');
        }, index * 100);

    });

    lead.style.opacity = 1;
}



