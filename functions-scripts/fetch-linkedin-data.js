// function to fetch data from Linkedin profile page
const fetchLinkedinData = () => {
    chrome.tabs.executeScript({
        file: "content-scripts/fetch-data.js"
    });
    chrome.runtime.onMessage.addListener(function(
        message,
        sender,
        sendResponse
    ) {
        document.querySelector("#first_name").value = message.firstName;
        document.querySelector("#last_name").value = message.lastName;
        document.querySelector("#company").value = message.companyName;
        document.querySelector("#location").value = message.location;
        document.querySelector("#job_title").value = message.jobTitle;
        document.querySelector("#linkedin_url").value = message.linkedinUrl;
        document.querySelector("#level").value = isscope(message.jobTitle);
        messagesArray = message.messages;
        console.log(messagesArray);
    });
};
