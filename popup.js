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

// function to set the prospect level
const isscope = currentJob => {
    var position = currentJob;
    var level1 = /CDO|CIO|CTO|(?=.*\bchief\b)(?=.*\bdata\b)|(?=.*\bdata)(?=.*\bofficer\b)|(?=.*\bchief\b)(?=.*\bdigital\b)|(?=.*\bchief\b)(?=.*\binformation\b)|(?=.*\bchief\b)(?=.*\btechnical\b)|(?=.*\bchief\b)(?=.*\binnovation\b)|(?=.*\bchief\b)(?=.*\btechnology\b)|(?=.*\bchief\b)(?=.*\btransformation\b)|(?=.*\bdata\b)(?=.*\bdirector\b)|(?=.*\bdirect)(?=.*\binnovation\b)|(?=.*\bdirecteur\b)(?=.*\bsi\b)|(?=.*\bdirecteur\b)(?=.*\binformation\b)|(?=.*\bdirecteur\b)(?=.*\binformations\b)|(?=.*\bdsi\b)(?=.*\badjoint\b)|(?=.*\blab\b)(?=.*\bofficer\b)|(?=.*\bvp\b)(?=.*\binnovation\b)|(?=.*\bvp\b)(?=.*\bbi\b)|(?=.*\bvp\b)(?=.*\bbusiness intelligence\b)|(?=.*\bvp\b)(?=.*\bdata\b)|(?=.*\bvp\b)(?=.*\bit\b)|(?=.*\bvice president\b)(?=.*\bdata\b)|(?=.*\bvice president\b)(?=.*\bit\b)|(?=.*\bvice president\b)(?=.*\binnovation\b)|(?=.*\bvice president\b)(?=.*\bengineering\b)|(?=.*\bvp\b)(?=.*\bengineering\b)|(?=.*\bvice-president)(?=.*\bit\b)|(?=.*\bvice president\b)(?=.*\binformation\b)|(?=.*\bvp)(?=.*\binformation\b)|(?=.*\bvp)(?=.*\bdigital\b)/i;
    var level2 = /CPO|(?=.*\bchief\b)(?=.*\bproduct\b)|(?=.*\bcloud\b)(?=.*\bleader\b)|(?=.*\bdata\b)(?=.*\b program director\b)|(?=.*\bdirecteur\b)(?=.*\bdata\b)|(?=.*\bdigital\b)(?=.*\bdirector\b)|(?=.*\bbusiness intelligence\b)(?=.*\bdirector\b)|(?=.*\bbusiness intelligence\b)(?=.*\bdirecteur\b)|(?=.*\bdata\b)(?=.*\bdirector\b)|(?=.*\bdigital\b)(?=.*\bdirecteur\b)|(?=.*\bengineering\b)(?=.*\bdirector\b)|(?=.*\bengineering\b)(?=.*\bdirecteur\b)|(?=.*\binformatique\b)(?=.*\bdirecteur\b)|(?=.*\bdirecteur\b)(?=.*\butilisateurs\b)|(?=.*\bdirecteur\b)(?=.*\btransformation\b)|(?=.*\bdirectrice\b)(?=.*\btransformation\b)|(?=.*\bhead\b)(?=.*\bbi\b)|(?=.*\bhead\b)(?=.*\bdata\b)|(?=.*\bhead\b)(?=.*\bbusiness intelligence\b)|(?=.*\bhead\b)(?=.*\bdigital\b)|(?=.*\bhead\b)(?=.*\bengineering\b)|(?=.*\bhead\b)(?=.*\binnovation\b)|(?=.*\bhead\b)(?=.*\bit\b)|(?=.*\binnovation\b)(?=.*\bleader\b)|(?=.*\bit\b)(?=.*\bdirector\b)|(?=.*\blab\b)(?=.*\bmanager\b)|(?=.*\bresponsable\b)(?=.*\bdigit)|(?=.*\bresponsable\b)(?=.*\bmobile\b)|(?=.*\bresponsable\b)(?=.*\bnumérique\b)|(?=.*\bresponsable\b)(?=.*\bdigitale\b)|(?=.*\bresponsable\b)(?=.*\binnovation\b)|(?=.*\btechnical\b)(?=.*\bdirector\b)|(?=.*\bresponsable\b)(?=.*\bdata)|(?=.*\bhead\b)(?=.*\binfrastructure\b)|(?=.*\bresponsable\b)(?=.*\bit\b)|(?=.*\bresponsable\b)(?=.*\bdsi\b)|(?=.*\bresponsable\b)(?=.*\barchi)|(?=.*\bhead\b)(?=.*\binformation)|(?=.*\bresponsable\b)(?=.*\bsi\b)|(?=.*\binformation\b)(?=.*\bmanager\b)/i;
    var level3 = /intrapreneur|dsi|(?=.*\bresponsable\b)(?=.*\bseo\b)|(?=.*\bseo\b)(?=.*\bmanager\b)|(?=.*\bbi\b)(?=.*\barchitect\b)|(?=.*\bbi\b)(?=.*\bmanager\b)|(?=.*\bbig data\b)(?=.*\bmanager\b)|(?=.*\bchef\b)(?=.*\bpôle\b)|(?=.*\bprojet)(?=.*\bdata)|(?=.*\bprojet)(?=.*\binnovation)|(?=.*\bprojet)(?=.*\biot\b)|(?=.*\bprojet)(?=.*\bit\b)|(?=.*\bprojet)(?=.*\bnumérique)|(?=.*\bprojet)(?=.*\bobjets connect)|(?=.*\bprojet)(?=.*\bsi\b)|(?=.*\bprojet)(?=.*\bdigit)|(?=.*\bprojet)(?=.*\bweb\b)|(?=.*\bcloud\b)(?=.*\barchitect)|(?=.*\bcloud\b)(?=.*\bmanager\b)|(?=.*\bdata)(?=.*\bexpert)|(?=.*\bdata)(?=.*\bmanager\b)|(?=.*\bdigit)(?=.*\bmanager\b)|(?=.*\bdigit)(?=.*\bofficer\b)|(?=.*\bdigit)(?=.*\bpartner\b)|(?=.*\bengineering\b)(?=.*\bmanager\b)|(?=.*\binnovation\b)(?=.*\bmanager\b)|(?=.*\bfeature\b)(?=.*\bleader\b)|(?=.*\bit\b)(?=.*\bmanager\b)|(?=.*\bit\b)(?=.*\bleader\b)|(?=.*\bproduct\b)(?=.*\bmanager\b)|(?=.*\bproduct\b)(?=.*\bowner\b)|(?=.*\bresponsable\b)(?=.*\bbi\b)|(?=.*\bresponsable\b)(?=.*\binfo)|(?=.*\bresponsable\b)(?=.*\binfra)|(?=.*\bresponsable\b)(?=.*\bweb\b)|(?=.*\bscrum\b)(?=.*\bmaster\b)|(?=.*\bsolution)(?=.*\barchitec)|(?=.*\bcoach)(?=.*\bagile\b)|(?=.*\btechnical\b)(?=.*\bmanager\b)|(?=.*\btechnical\b)(?=.*\bleader\b)|(?=.*\bdigit)(?=.*\binnovation\b)|(?=.*\bit)(?=.*\bproject\b)|(?=.*\bdigit)(?=.*\btransfor)|(?=.*\binnovation)(?=.*\bspecialist)|(?=.*\blead)(?=.*\bdigit)|(?=.*\bcoord)(?=.*\bdata)|(?=.*\barchi)(?=.*\bdata)|(?=.*\barchi)(?=.*\binfra)|(?=.*\biot\b)(?=.*\bproje)|(?=.*\lead\b)(?=.*\bdata)|(?=.*\lead)(?=.*\btech)|(?=.*\digital\b)(?=.*\bworkplace)|(?=.*\lead)(?=.*\bdev)/i;

    var outOfScopeWords = /(cockpit|marketing|procurement|crm|manufacturing|industrial|mechanic|mecanique|mechanics|investisseur|investor|acquisition|entrepreneur|supply chain|consulting|designer|community|talent|commercial|purchasing|adv|juriste|community manager|ingénieur|formateur|formatrice|sociale|social|contrôle de gestion|controle de gestion|rh|drh|income|credit|ceo|recruiter|assistant|intern |stage|stagiaire|apprenticeship|finance|freelance|financial|consultant|secretary|sales|healthcare|communication|Alternante|alternant|apprentie|Junior|alternance|achats|acheteur|buyer)/i;
    var case1 = position.match(level1);
    var case2 = position.match(level2);
    var case3 = position.match(level3);
    var returnLevel1 = 1;
    var returnLevel2 = 2;
    var returnLevel3 = 3;
    var outOfScope = "Hors scope";
    var caseOutOfScope = position.match(outOfScopeWords);

    if (case1) {
        if (caseOutOfScope) {
            return outOfScope;
        } else {
            return returnLevel1;
        }
    } else if (case2) {
        if (caseOutOfScope) {
            return outOfScope;
        } else {
            return returnLevel2;
        }
    } else if (case3) {
        if (caseOutOfScope) {
            return outOfScope;
        } else {
            return returnLevel3;
        }
    } else {
        return outOfScope;
    }
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
