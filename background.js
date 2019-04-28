// Retreive the cookie from linkedin
const sendCookie = cookie => {
    console.log(cookie[0].value);
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { greeting: "hello" }, function(
            response
        ) {
            console.log(response.farewell);
        });
    });
};

chrome.cookies.getAll({ domain: ".www.linkedin.com" }, cookies => {
    const cookie = cookies.filter(cookie => cookie.name === "li_at");
    chrome.runtime.onMessage.addListener(function(
        message,
        sender,
        sendResponse
    ) {
        if (message.request == "checkStatus") {
            sendResponse({ done: cookie });
        }
    });
});
