'use strict'

/* All necessary DOM elements */
const nav = document.getElementById('navbar');
const links = document.querySelectorAll('.navbar-nav .nav-item');
const navBrand = document.getElementById('nav-brand');
const sections = document.querySelectorAll('.section');
const theSection = document.getElementById('portafolio');
const header = document.getElementById('header');
/* Jquery necessary elements */
const scrollFade = $("#scrollFade");
const collapsible = $("#navbarNavAltMarkup");


/* Variable save the past elemenent with active class */
let pastActive;
/* This for is use to assign and remember the link with the active class */
for (let i = 0; i < sections.length; i++) {

    if (window.scrollY >= sections[i].offsetTop && window.scrollY < (sections[i].offsetTop - nav.offsetHeight) + (sections[i].offsetHeight)) {
        links[i].classList.add('active');
        pastActive = links[i];
        break;
    }
}

let navHeight = nav.offsetHeight;
/* Scroll function */
window.addEventListener('scroll', () => {

    /* Jquery Bootstrap collapse navbar when scrolling */
    collapsible.collapse('hide');
    /* Gives the class fixed to the navbar and add margin to the first section to evit a weird transition 
        when the navbar will has the class fixed  */
    if (window.scrollY >= (header.offsetTop + header.offsetHeight)) {
        nav.classList.add('nav-fixed');
        navBrand.style.margin = "0.7rem 0rem";
        theSection.style.marginTop = navHeight + "px";
        scrollFade.fadeIn();
    }
    /* Remove the classes */
    else {
        nav.classList.remove('nav-fixed');
        theSection.style.marginTop = "0px";
        navBrand.style.margin = "0rem 0rem";
        scrollFade.fadeOut();
    }

    /* Give the active class to the corresponding link based on the section user is in
        and remove active class for the previous link  */
    for (let i = 0; i < sections.length; i++) {
        if (window.scrollY >= sections[i].offsetTop && window.scrollY < (sections[i].offsetTop - nav.offsetHeight) + sections[i].offsetHeight) {
            if (pastActive != null) pastActive.classList.remove('active');
            links[i].classList.add('active');
            pastActive = links[i];
            break;
        }
    }


});

/* Verificate if the windowY position is grater than the navbar position if is true gives the class fixed*/
if (window.scrollY > nav.offsetTop) {
    nav.classList.add('nav-fixed');
}

/* Go to a specific section, Navbar hide menu and Active element navbar */
for (const link of links) {
    link.addEventListener('click', clickHandler);
}

/* Function to scroll to a specific section */
function clickHandler(e) {
    e.preventDefault();
    const href = this.getAttribute('href');
    const offsetTop = document.querySelector(href).offsetTop;
    let collapseHeight = 0;
    if (!nav.classList.contains('nav-fixed') && window.innerWidth < 768) {
        collapseHeight = collapsible.outerHeight();
    }
    else {
        collapseHeight = 0;
    }
    scroll({
        /* 
            I added +5 because there is a bug in the mobile view that doesn't put correctly the active class. 
            This bug ocurrer when you are in the desktop view and change to mobile view and the navbar doesn't 
            has the class nav-fixed, if this conditions are met when you click in a menu section 
            the page scroll theres a 4 or 5 px between the section and these px evit to add the active class correctly 
        */
        top: offsetTop - collapseHeight + 5,
        behavior: 'smooth'
    });

}

/* Change name if the screen width is small or large*/
let nameLarge = "Jehison Gutiérrez de la Barrera";
let nameShort = "Jehison GB";
if (window.innerWidth > 875 || (window.innerWidth < 461 && window.innerWidth > 377)) {
    $("#scrollFade span:first-child").replaceWith(`<span>${nameLarge}</span>`);
}
else {
    $("#scrollFade span:first-child").replaceWith(`<span>${nameShort}</span>`);
}

window.addEventListener('resize', () => {
    if (window.innerWidth > 875 || (window.innerWidth < 461 && window.innerWidth > 377)) {
        $("#scrollFade span:first-child").replaceWith(`<span>${nameLarge}</span>`);
    }
    else {
        $("#scrollFade span:first-child").replaceWith(`<span>${nameShort}</span>`);
    }
});


