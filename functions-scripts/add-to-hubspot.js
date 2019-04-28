const addToHubspot = () => {
    // hide the 2 buttons and display the loader
    hubspotButton.style.display = "none";
    fetchDataButton.style.display = "none";
    document.querySelector("#loader").style.display = "block";

    setCookie().then(linkedinCookie => {
        const values = {
            email: document.querySelector("#email").value,
            firstName: document.querySelector("#first_name").value,
            lastName: document.querySelector("#last_name").value,
            company: document.querySelector("#company").value,
            location: document.querySelector("#location").value,
            jobTitle: document.querySelector("#job_title").value,
            level: document.querySelector("#level").value,
            linkedinUrl: document.querySelector("#linkedin_url").value,
            hubspotOwner: parseInt(hubspotOwner.value),
            linkedinCookie
        };
        // launch the create contact function with popup.html values
        createContact(values);
    });
};
