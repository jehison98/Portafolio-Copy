'use strict'

/* json */
import skillsets from "../json/skillsets";
/* constants */
const skillsContent = document.getElementById('skillsets-content');

/* Create a divs that contains the img and info from the skillsets in the json */
for(let i = 0; i < skillsets.skillsets.length; i++) {
    let div = document.createElement("div");
    div.classList.add('col-4', 'col-md-3', 'image-container');
    skillsContent.append(div);
    div.innerHTML = `
    <img src="${skillsets.skillsets[i].img}" alt="${skillsets.skillsets[i].name} image" data-toggle="tooltip"
    data-placement="top" title="${skillsets.skillsets[i].name}" data-animation="true">`;
}