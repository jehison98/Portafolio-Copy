'use strict'
/* Import the json that contain the information */
import experience from "../json/experience";
import experienceResumen from "../json/experience-resumen";

/* Consts to create the divs */
const experienceContent = document.getElementById('experience-content');
const experienceModal = document.getElementById('experience-modal');

/* Create a div for each object in the json */
for (let i = 0; i < experience.experience.length; i++) {
    let div = document.createElement('div');
    div.classList.add('col-12', 'col-md-4', 'image-container');
    experienceContent.append(div);
    div.innerHTML = `
    <span data-toggle="modal" data-target="#resumen-modal">
        <img src="${experience.experience[i].img}" alt="${experience.experience[i].title} image"
        data-toggle="tooltip" data-placement="top" title="More details on my resumen">
    </span>
    <h5>${experience.experience[i].shortDesc}</h5>
    `
}

/* Create the resumen modal. Only exist one, but if exist more than one this would be added */
for (let i = 0; i < experienceResumen.experienceResumen.length; i++) {
    let div = document.createElement("div");
    div.classList.add('modal', 'fade');
    div.setAttribute('id', `resumen-modal`);
    div.setAttribute('tabindex', '-1');
    div.setAttribute('role', 'dialog');
    div.setAttribute('aria-labelledby', 'exampleModalLabel');
    div.setAttribute('aria-hidden', 'true');
    experienceModal.append(div);
    div.innerHTML = `
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">

            <div class="modal-head text-center">
                <button type="button" class="close btn-close" data-dismiss="modal" aria-label="Close">
                    <img src="./public/img/extra-resources/close.svg" alt="close icon">
                </button>
                <h1 class="modal-title mx-auto" id="exampleModalLabel">
                    ${experienceResumen.experienceResumen[i].name}
                </h1>
                <h6>${experienceResumen.experienceResumen[i].subtitle}</h6>
                <p>${experienceResumen.experienceResumen[i].shortDesc}</p>
            </div>

            <div id="resumen-body" class="resumen-body">

                <h3>Qualifications</h3>
                <article id="qualifications-list"></article>

                <h3>Experience</h3>
                <article id="experience-list"></article>

                <h3>Education</h3>
                <article id="education-list"></article>

                <h3>Publications</h3>
                <article id="publications-list"></article>
                <br>

            </div>

        </div>
    </div>
    `;

    qualificationsList(i, "qualifications-list");
    experieceList(i, "experience-list");
    educationList(i, "education-list");
    publicationsList(i, "publications-list");

};


/* Function to create a ul and li elements from the qualification objects in json */
function qualificationsList(index, idName) {
    const qualContent = document.getElementById(`${idName}`);
    let createUl = document.createElement("ul");

    createUl.classList.add("circle-list");

    for (let i = 0; i < experienceResumen.experienceResumen[index].qualifications.length; i++) {
        let li = document.createElement("li");
        li.innerHTML = `${experienceResumen.experienceResumen[index].qualifications[i].qualDesc}`;
        createUl.append(li);
    }

    qualContent.append(createUl);
}

/* This function is similar a qualificationsList function but in this function exists more than one ul element */
function experieceList(index, idName) {
    const expContent = document.getElementById(`${idName}`);
    let createUl = document.createElement("ul");

    for (let i = 0; i < experienceResumen.experienceResumen[index].experience.length; i++) {

        let h4 = document.createElement("h4");
        h4.innerHTML = `${experienceResumen.experienceResumen[index].experience[i].expName}`;
        createUl.append(h4);

        for (let j = 0; j < experienceResumen.experienceResumen[index].experience[i].expList.length; j++) {
            let li = document.createElement("li");
            li.innerHTML = `${experienceResumen.experienceResumen[index].experience[i].expList[j].expListDesc}`
            createUl.append(li);
        }

    }

    expContent.append(createUl);

}

/* This function create h4 for every education object in the json */
function educationList(index, idName) {
    const eduContent = document.getElementById(`${idName}`);

    for (let i = 0; i < experienceResumen.experienceResumen[index].education.length; i++) {
        let h4 = document.createElement("h4");
        h4.innerHTML = `${experienceResumen.experienceResumen[index].education[i].educName}`;
        eduContent.append(h4);
    }

}

/* create cite for every publication object in the json */
function publicationsList(index, idName) {
    const citeContent = document.getElementById(`${idName}`);

    for (let i = 0; i < experienceResumen.experienceResumen[index].publications.length; i++) {
        let cite = document.createElement("cite");
        cite.innerHTML = `${experienceResumen.experienceResumen[index].publications[i].publicDes}`;
        citeContent.append(cite);
    }

}






