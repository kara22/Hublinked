// FUNCTION TO ADD A NOTE TO A CONTACT USING HUSBPOT API
const addNote = (values, contactId, messages, array = []) => {
    const hubspotNoteUrl = `https://api.hubapi.com/engagements/v1/engagements?hapikey=${hubspotApiKey}`;

    messages.forEach((message, index) => {
        setTimeout(() => {
            const newMessage = `Linkedin conversation <br/> Author: ${
                message.author
            }, <br/> ${message.message} `;
            if (!array.includes(newMessage)) {
                fetch(hubspotNoteUrl, {
                    method: "POST",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        engagement: {
                            active: true,
                            ownerId: values.hubspotOwner,
                            type: "NOTE",
                            timestamp: Date.parse(new Date())
                        },
                        associations: {
                            contactIds: [contactId]
                        },
                        metadata: {
                            body: `Linkedin conversation <br/> Author: ${
                                message.author
                            }, <br/> ${message.message} `
                        }
                    })
                })
                    .then(response => console.log(response))
                    .then(() => {
                        // behavior if it's the last message
                        if (index + 1 === messages.length) {
                            // mask the form when the process is finished
                            document.querySelector("form").style.display =
                                "none";
                            // call the insert html function to log the step4msg and step5msg into the popup
                            const step4LogMsg = ` ✅All of ${
                                messages.length
                            }  messages from your Linkedin conversation are scrapped ! `;
                            createElement("p", "logs", step4LogMsg);
                            const step5LogMsg =
                                "✅ A new Hubspot tab is open in your browser";
                            createElement("p", "logs", step5LogMsg);

                            // create a new tab who open hubspot contact page
                            chrome.tabs.create({
                                url: `https://app.hubspot.com/contacts/3370273/contact/${contactId}/`,
                                active: false
                            });
                            document.querySelector("#loader").style.display =
                                "none";
                        } else {
                            const step4LogMsg = `Message ${index + 1} of ${
                                messages.length
                            } scrapped...`;
                            createElement("p", "logs", step4LogMsg);
                        }
                    })
                    .catch(err => console.log(err));
            } else {
                // if the current message is the last
                if (index + 1 === messages.length) {
                    document.querySelector("form").style.display = "none";
                    const step4LogMsg = `🆗 Message ${index + 1} of ${
                        messages.length
                    } is already existing in Hubspot. Nore more messages to add, please check the new tab open in your browser`;
                    createElement("p", "logs", step4LogMsg);
                    chrome.tabs.create({
                        url: `https://app.hubspot.com/contacts/3370273/contact/${contactId}/`,
                        active: false
                    });
                    document.querySelector("#loader").style.display = "none";
                    // if the message is already existing in hubspot note
                } else {
                    const step4LogMsg = `Message ${index + 1} of ${
                        messages.length
                    } is already existing in Hubspot Note`;
                    createElement("p", "logs", step4LogMsg);
                }
            }
        }, 300 * index);
    });
};
