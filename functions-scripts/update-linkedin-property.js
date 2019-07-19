const demandTrackingLinkedin = async contactID => {
    await fetch(
        `https://api.hubapi.com/contacts/v1/contact/vid/${contactID}/profile?hapikey=${hubspotApiKey}`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                properties: [
                    {
                        property: "demand_tracking_linkedin_update",
                        value: "Update LinkedIn"
                    }
                ]
            })
        }
    );
};
