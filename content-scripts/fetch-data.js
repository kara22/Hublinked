function fetchData() {
    const fullName = document.querySelector(
        ".pv-top-card-v3--list.inline-flex.align-items-center li"
    ).innerText;
    const firstName = fullName.split(" ")[0] || "not found";
    const lastName =
        fullName
            .split(" ")
            .slice(1, 5)
            .join(" ")
            .trim() || "not found";

    const linkedinUrl = window.location.href;
    const companyName = document.querySelector(
        ".pv-top-card-v3--experience-list-item"
    ).innerText;
    const jobTitle = document.querySelector(".flex-1.mr5 h2").innerText;

    const location = document.querySelector(
        ".pv-top-card-v3--list.pv-top-card-v3--list-bullet li"
    ).innerText;

    setTimeout(() => {
        (async () => {
            let lastAuthor = "";
            let lastDate = "";
            let lastHour = "";
            let message = "";

            const array = Array.from(
                document.querySelectorAll(".msg-s-message-list__event.clearfix")
            );

            const messages = array.map(el => ({
                author: (function() {
                    if (
                        el
                            .querySelector(".msg-s-event-listitem")
                            .querySelector(".msg-s-message-group__meta")
                    ) {
                        lastAuthor = el
                            .querySelector(".msg-s-event-listitem")
                            .querySelector(".msg-s-message-group__meta")
                            .querySelector("a span").innerText;
                        return lastAuthor;
                    } else {
                        return lastAuthor;
                    }
                })(),

                date: (function() {
                    if (el.querySelector(".msg-s-message-list__time-heading")) {
                        lastDate = el
                            .querySelector(".msg-s-message-list__time-heading")
                            .innerText.trim();
                        return lastDate;
                    } else {
                        return lastDate;
                    }
                })(),

                hour: (function() {
                    if (
                        el
                            .querySelector(".msg-s-event-listitem")
                            .querySelector(".msg-s-message-group__meta")
                    ) {
                        lastHour = document
                            .querySelector(".msg-s-event-listitem")
                            .querySelector(".msg-s-message-group__timestamp")
                            .innerText.trim();
                        return lastHour;
                    } else {
                        return lastHour;
                    }
                })(),
                message: (function() {
                    if (
                        el
                            .querySelector(".msg-s-event-listitem")
                            .querySelector(
                                ".msg-s-event-listitem__message-bubble"
                            )
                    ) {
                        message = el
                            .querySelector(".msg-s-event-listitem")
                            .querySelector(
                                ".msg-s-event-listitem__message-bubble"
                            )
                            .querySelector(".msg-s-event-listitem__body")
                            .innerText;

                        return message;
                    } else {
                        return "Généré automatiquement par Linkedin : Le contact a accepté votre demande d'ajout";
                    }
                })()
            }));
            return messages;
        })().then(messages => {
            const values = {
                fullName,
                linkedinUrl,
                firstName,
                lastName,
                jobTitle,
                location,
                companyName,
                messages
            };
            sendData(values);
        });
    }, 3000);
}
// press the messages button and scroll to the top of the messages box  for 3 times
(() => {
    // check if some messages box are open, if yes we close it
    if (
        Array.from(
            document.querySelectorAll(
                ".msg-overlay-bubble-header__control.js-msg-close"
            )
        ).length > 0
    ) {
        Array.from(
            document.querySelectorAll(
                ".msg-overlay-bubble-header__control.js-msg-close"
            )
        ).forEach(button => button.click());
    }

    //  open the current message box
    document
        .querySelector(".pv-s-profile-actions.pv-s-profile-actions--message")
        .click();

    let x = 0;
    let intervalID = setInterval(() => {
        let scrollSize = document.querySelector(".msg-s-message-list")
            .scrollHeight;
        document.querySelector(".msg-s-message-list").scrollTo(scrollSize, 0);
        if (++x === 3) {
            window.clearInterval(intervalID);
            console.log("finished");
        }
    }, 1000);
})();

function sendData(data) {
    console.log(data);

    chrome.runtime.sendMessage(data);
}

fetchData();
