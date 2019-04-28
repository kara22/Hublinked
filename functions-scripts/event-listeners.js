fetchDataButton.addEventListener("click", e => {
    fetchLinkedinData();
});
// listen the change and remove the disabled attribute
hubspotOwner.addEventListener("change", e => {
    if (emailInput.value.match(re) && hubspotOwner.value !== "") {
        hubspotButton.disabled = false;
    } else {
        hubspotButton.disabled = true;
    }
});

// listen the email input and verify the matching with the email regex
emailInput.addEventListener("input", e => {
    if (emailInput.value.match(re) && hubspotOwner.value !== "") {
        hubspotButton.disabled = false;
    } else {
        hubspotButton.disabled = true;
    }
});

// listen to add to hubspot button, then launch the function
hubspotButton.addEventListener("click", e => {
    addToHubspot();
});
