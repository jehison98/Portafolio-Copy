'use strict'

/* Constants */
const form = document.getElementById('contact-form');
const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
const sendBtn = document.getElementById("send-btn");

//Label opacity change to 1 when user write anything
$('#contact-form input, #contact-form textarea').keypress(function () {
    $(this).attr("placeholder", "");
});
$('#contact-form .form-input').keypress(function () {
    $(this).prev().css('opacity', '1');
});

/* Regular expresion to allow what the user can write in each input */
const expresions = {
    name: /^[a-zA-ZÀ-ÿ\s]{3,40}$/,
    email: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    phone: /^\d{7,14}$/,
    message: /^.{3,500}$/,
    captcha: /^\d{1,4}$/,
}

/* object to validate if every input are well done */
const inputsValidation = {
    name: false,
    email: false,
    phone: false,
    message: false,
    captcha: false
}

/* Function to generate captcha */
let captchaResult;
generateCaptcha();
function generateCaptcha() {
    const captchaOne = Math.floor(Math.random() * 99) + 1;
    const captchaTwo = Math.floor(Math.random() * 99) + 1;

    const captchaGen = document.getElementById('captcha-gen');
    const captchaSum = document.getElementById('captcha-sum');

    captchaGen.innerHTML = `${captchaOne} + ${captchaTwo}`;
    captchaSum.placeholder = `${captchaOne} + ${captchaTwo}`;

    return captchaResult = (captchaOne + captchaTwo);

}

/* detect when user write in the inputs
    and validate if user are writing a valid value based on the regular expresions 
*/
inputs.forEach((input) => {
    input.addEventListener('keyup', validateForm);
    input.addEventListener('blur', validateForm);
});

/* Detect wich input are being written and execute a function with specific values */
function validateForm(e) {
    switch (e.target.name) {
        case "name":
            validateInput(expresions.name, e.target, 'name');
            break;
        case "email":
            validateInput(expresions.email, e.target, 'email');
            break;
        case "phone":
            validateInput(expresions.phone, e.target, 'phone');
            break;
        case "message":
            validateInput(expresions.message, e.target, 'message');
            break;
        case "captcha":
            validateCaptcha(expresions.captcha, e.target, 'captcha');
            break;
    }
}

/* Take the values and execute other function to validate the data */
function validateInput(expresion, input, id) {

    let formArray = generateDOMConsts(id);

    /* validate if the input has a valid value based on the regex */
    if (expresion.test(input.value)) {
        formInputTrue(formArray[0], formArray[1], formArray[2], id);
    }
    else {
        formInputFalse(formArray[0], formArray[1], formArray[2], id);
    }

    enableButton();

}

/* generate the constants for each input and return an array with the value of the constants */
function generateDOMConsts(id) {
    const formInput = document.querySelector(`#form-${id} .form-input`);
    const formMessage = document.querySelector(`#form-${id} .form-message`);
    const formIcon = document.querySelector(`#form-${id} .form-input i.fas`);

    let formArray = [];

    return formArray = [formInput, formMessage, formIcon];
}

/* give the classes for the valid input */
function formInputTrue(formInput, formMessage, formIcon, id) {
    formMessage.classList.remove('active-message');
    formInput.classList.remove('wrong-input');
    formIcon.classList.remove('fa-times-circle');
    formInput.classList.add('success-input');
    formIcon.classList.add('fa-check-circle');
    inputsValidation[id] = true;
}
/* give the classes for the wrong input */
function formInputFalse(formInput, formMessage, formIcon, id) {
    formInput.classList.remove('success-input');
    formIcon.classList.remove('fa-check-circle');
    formIcon.classList.add('fa-times-circle');
    formInput.classList.add('wrong-input');
    formMessage.classList.add('active-message');
    inputsValidation[id] = false;
}

/* This function is similar to validateInput but this verify if the value is equal to the captcha result */
/* A'm thinking who can I change this to evit repeat the similar code... */
function validateCaptcha(expresion, input, id) {

    let formArray = generateDOMConsts(id);

    if (expresion.test(input.value) && parseInt(input.value) == captchaResult) {
        formInputTrue(formArray[0], formArray[1], formArray[2], id);
    }
    else {
        formInputFalse(formArray[0], formArray[1], formArray[2], id);
    }

    enableButton();

}

/* Function to verify if all the inputs are right a return a value true or false  */
function verifyTheInputs() {
    let okStatus;

    for (let input in inputsValidation) {
        if (inputsValidation[input]) {
            okStatus = true;
        }
        else {
            okStatus = false;
            break;
        }
    }
    return okStatus;
}

/* If all the camps are right enable the submit button and add the succes target */
function enableButton() {
    if (verifyTheInputs()) {
        sendBtn.setAttribute('data-target', "#send-message");
        sendBtn.disabled = false;
    }
    else {
        sendBtn.removeAttribute('data-target', "#send-message");
    }
}

/* EventListener to send the inputs data */
form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (verifyTheInputs()) {
        sendValues();
        resetModalMessage();
    }
    else {
        missingInputs();
        sendBtn.disabled = true;
        scroll({
            top: document.getElementById("contact").offsetTop,
            behavior: "smooth"
        });
    }

});

/* If the inputs are wrong or empty this function indicates wich camps are wrong or empty */
function missingInputs() {

    for (let id in inputsValidation) {
        if (!inputsValidation[id]) {
            let formArray = generateDOMConsts(id);
            formInputFalse(formArray[0], formArray[1], formArray[2], id);
        }
    }

}

/* clear all the inputs and inputs styles when the message is sended, 
 generate new captcha and turn false all the inputs validation
*/
function clearInputs() {

    for (let id in inputsValidation) {
        const labelForm = document.querySelector(`#form-${id} label`);
        const formInput = document.querySelector(`#form-${id} .form-input`);
        const theInput = document.querySelector(`#form-${id} .form-input input, #form-${id} .form-input textarea`);
        const formIcon = document.querySelector(`#form-${id} .form-input i.fas`);
        formInput.classList.remove('success-input');
        formIcon.classList.remove('fa-check-circle');
        theInput.value = "";
        theInput.placeholder = labelForm.textContent;
        labelForm.style.opacity = "0";

        inputsValidation[id] = false;
        sendBtn.removeAttribute('data-target', "#success-message");
    }

    generateCaptcha();

}

/* Fetch function to send inputs value to the banckend and the backend sent a email */
function sendValues() {
    let url = "http://127.0.0.1:5000/";
    let formData = {};

    for (let id in inputsValidation) {
        const theInput = document.querySelector(`#form-${id} .form-input input, #form-${id} .form-input textarea`);
        formData[id] = theInput.value;
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .catch(error => errorMessage(error))
        .then(response => successMessage(response));

}


//Message Consts
const modalMessage = document.getElementById('send-message');
const modalContent = modalMessage.querySelector('.modal-content');
const h5Message = modalMessage.querySelector(".modal-head h5");
const bodyMessage = modalMessage.querySelector(".modal-body");
const footerMessage = modalMessage.querySelector(".modal-footer");

/* Success message when the message can be sent */
function successMessage(res) {
    if (res) {
        h5Message.innerHTML = "Message sent seccessfully";
        bodyMessage.innerHTML = "<p>Thanks for your message! I will answer you as soon as possible.</p>";
        modalContent.classList.remove('wrong-sent-message');
        modalContent.classList.add('success-sent-message');
        clearInputs();
    }
    else {
        errorMessage(res.success);
    }
    displayModal();

}

/* Wrong message when a error ocurred */
function errorMessage(err) {
    console.log("An error ocurred: " + err);
    h5Message.innerHTML = "Ooops, something went wrong!";
    bodyMessage.innerHTML = '<p>Please try again later or contact me at: "jehison3098@gmail.com"</p>';
    modalContent.classList.remove('success-sent-message');
    modalContent.classList.add('wrong-sent-message');
    displayModal();
}

/* Function to evit repeat the same code */
function displayModal() {
    footerMessage.innerHTML = `<button type="button" class="btn" data-dismiss="modal">Close</button>`;
    $("#send-message").modal();
}

/* Reset styles after send a message */
function resetModalMessage() {
    h5Message.innerHTML = "Sending Message...";
    bodyMessage.innerHTML = `<img src="./public/img/extra-resources/pacman.gif" alt="pacman.gif">`;
    footerMessage.innerHTML = "";
    modalContent.classList.remove('wrong-sent-message');
    modalContent.classList.remove('success-sent-message');
}


