// when the contact is already existing in our hubspot base, we launch this function to create an array of all the messages to check if already existing
const checkNotes = (contactId, values) => {
    fetch(
        `https://api.hubapi.com/engagements/v1/engagements/associated/contact/${contactId}/paged?hapikey=${hubspotApiKey}&limit=100`
    )
        .then(response => response.json())
        .then(data => {
            const array = [];
            data.results.forEach(result => {
                if (result.engagement.type === "NOTE") {
                    if (!array.includes(result.metadata.body)) {
                        array.push(result.metadata.body);
                    }
                }
            });
            // launch the addNote function to check if every message is existing
            addNote(values, contactId, messagesArray, array);
        })
        .catch(err => console.log(err));
};
