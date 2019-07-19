// FUNCTION TO CREATE HUBSPOT CONTACT TROUGH API

const createContact = async values => {
    const hubspotCreateContactUrl = `https://api.hubapi.com/contacts/v1/contact/?hapikey=${hubspotApiKey}`;

    // call the createElement function to log the step1msg into the popup
    const step1LogMsg = `✅ Commencing create hubspot contact for ${
        values.firstName
    }`;

    createElement("p", "logs", step1LogMsg);
    // call the hubspot API to create the contact
    await fetch(hubspotCreateContactUrl, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            properties: [
                {
                    property: "firstname",
                    value: values.firstName
                },
                {
                    property: "lastname",
                    value: values.lastName
                },
                {
                    property: "email",
                    value: values.email
                },
                {
                    property: "company",
                    value: values.company
                },
                {
                    property: "city",
                    value: values.location
                },
                {
                    property: "linkedin_url",
                    value: values.linkedinUrl
                },
                {
                    property: "co_level",
                    value: values.level
                },
                {
                    property: "jobtitle",
                    value: values.jobTitle
                },
                {
                    property: "hubspot_owner_id",
                    value: values.hubspotOwner
                },
                {
                    property: "demand_tracking_linkedin",
                    value: "LinkedIn source"
                }
            ]
        })
    })
        // If success, log confirmation
        .then(response => response.json())
        .then(JsonResponse => {
            if (
                JsonResponse.error &&
                JsonResponse.message === "Contact already exists"
            ) {
                // call the insert html function to log the step2msg into the popup if the contact already exists
                const step2LogMsg = `✅ ${
                    values.email
                } already exists in our Hubspot base, try to scrape your new linkedin conversation messages with ${
                    values.firstName
                }...`;
                createElement("p", "logs", step2LogMsg);

                const contactID = JsonResponse.identityProfile.vid;
                demandTrackingLinkedin(contactID);
                checkNotes(contactID, values);
            } else {
                // call the insert html function to log the step2msg into the popup if the contact does not exists
                const step2LogMsg = `✅ Hubspot account well created, try to scrape your linkedin conversation`;
                createElement("p", "logs", step2LogMsg);
                // call the messagesFetch funtion to launch the scrapping of linkedin conversation
                const contactId = JsonResponse.vid;
                addNote(values, contactId, messagesArray);
            }
        })
        // If impossible to create the contact, log the response from the Hubspot API who tells us why
        .catch(err => {
            console.log(err);
        });
};
