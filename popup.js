// ---------VARIABLES----------
const hubspotOwner = document.querySelector("#hubspot-owner");
const hubspotButton = document.querySelector("#add-to-hubspot");
const emailInput = document.querySelector("#email");
const fetchDataButton = document.querySelector("#fetch-data");
const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// function to set the li_at Linkedin cookie from background.js
const setCookie = async () => {
    return new Promise((resolve, reject) => {
        chrome.runtime.sendMessage({ request: "checkStatus" }, function(
            response
        ) {
            if (response.done) {
                resolve(response.done[0].value);
            }
        });
    });
};

// innerHTML function
const innerHtml = (selector, message) =>
    (document.querySelector(selector).innerHTML = message);

const createElement = (childElement, parentElementId, content, value = "") => {
    const newChildElement = document.createElement(childElement);
    const parentElement = document.getElementById(parentElementId);
    const appendChildElement = parentElement.appendChild(newChildElement);
    appendChildElement.innerHTML = content;

    value !== "" ? (newChildElement.value = value) : (value = "");
};
