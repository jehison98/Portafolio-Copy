'use strict'

/* import json */
import portafolioWorks from '../json/portafolioWorks';

/* constants */
const article = document.querySelector('#portafolio article .container-fluid .row');
const modal = document.getElementById('portafolio-modal');

/* Function to active the bootstrap tooltips */
$(function () {
    $('[data-toggle="tooltip"]').tooltip();
    $('[data-toggle="tooltip"]').on('click', function () {
        $(this).tooltip('hide');
    });
});

/* Create a div with every portafolio project in the json and include respective data */
for (let i = 0; i < portafolioWorks.projects.length; i++) {

    let div = document.createElement("div");
    div.classList.add('col-12', 'col-md-4', 'image-container');
    div.setAttribute('data-toggle', 'modal');
    div.setAttribute('data-target', `#portafolioModal`);
    article.append(div);
    div.innerHTML = `
    <a class="btn-portafolio">
        <img class="image-responsive"
            src="${portafolioWorks.projects[i].img}" alt="${portafolioWorks.projects[i].title} image">
        <div class="zoom-icon">
            <img src="./public/img/extra-resources/zoom.svg" alt="zoom icon">
            <h4>${portafolioWorks.projects[i].title}</h4>
        </div>
    </a>`;

}



//Modal Section
/* Generate the constants, classes, and attributes for the modal div */
const portArticles = document.querySelectorAll("#portafolio article .container-fluid .row .image-container");
let div = document.createElement("div");
div.classList.add('modal', 'fade');
div.setAttribute('id', `portafolioModal`);
div.setAttribute('tabindex', '-1');
div.setAttribute('role', 'dialog');
div.setAttribute('aria-labelledby', `modalLabel`);
div.setAttribute('aria-hidden', 'true');
modal.append(div);

/* click Event to create the specific information to show in the modal */
portArticles.forEach( (e, i) => {
    e.addEventListener('click', () => {
        generateModal(i);
    });
});


function generateModal(i) {

    div.innerHTML = `
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-head text-center">
                <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                    <img src="./public/img/extra-resources/close.svg" alt="close icon">
                </button>
                <h1 class="modal-title mx-auto" id="modalLabel">
                ${portafolioWorks.projects[i].title}
                </h1>
                <p>${portafolioWorks.projects[i].shortDesc}</p>
                <hr>
                <div class="portafolio-img-wrapper">
                    <img src="${portafolioWorks.projects[i].img}" alt="${portafolioWorks.projects[i].title} image">
                    <div class=" arrow arrow-left">
                        <img src="./public/img/extra-resources/arrow-left.png" alt="arrow left icon">
                    </div>
                    <div class=" arrow arrow-right">
                        <img src="./public/img/extra-resources/arrow-right.png" alt="arrow right icon">
                    </div>
                </div>
                <hr>
                <p>
                    <button type="button" class="btn btn-device" data-toggle="tooltip" data-placement="top"
                        title="link">
                        <img src="./public/img/extra-resources/link-website.svg" alt="link website icon">
                    </button>
                </p>
                <div class="modal-body">
                    ${portafolioWorks.projects[i].largeDesc}
                </div>
            </div>
        </div>
    </div>`;

    arrowLeft(i);
    arrowRight(i);
}


//Arrows Function, change the information of the modal section 
//This is like a carousel. Show the previous or next portafolio porject on the modal.

/* Change the info to left project */
function arrowLeft(i) {  
    const arrowLeft = document.querySelector('.arrow-left');
    arrowLeft.addEventListener('click', () => {
        if(i == 0){
            generateModal(portArticles.length - 1);
        }
        else {
            generateModal(i - 1);
        }
    });
}

/* Change the info to right project */
function arrowRight(i) {  
    const arrowRight = document.querySelector('.arrow-right');
    arrowRight.addEventListener('click', () => {
        if(i == portArticles.length - 1){
            generateModal(0);
        }
        else {
            generateModal(i + 1);
        }
    });
}



