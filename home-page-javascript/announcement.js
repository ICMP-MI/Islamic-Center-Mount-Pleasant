
// Functions for popup opening and closing
function openPopup() {
  document.getElementById('popup').style.display = 'flex';
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}


// Code for client side "backend". All the code for dynamically generated announcements. Working with announcement.js

fetch('./mainAnnouncement.json')
    .then((response) => response.json())
    .then((json) => {

      // This branch checks if an annoucement exists in mainAnnouncement.json file, if so then proceeeds to generate it
      if(json.title && json.message) {

        // Generate annoucement header html
        // role/tabindex make this keyboard-focusable since it's a div acting as a
        // button; the keydown listener below makes Enter/Space activate it the
        // same way a click does.
        let annoucementHeaderHTML = `
          <div id="main-announcement" class="annoucements-div" onclick="openPopup()" role="button" tabindex="0">
            ${json.title}
            <div class="annoucements-toggle">view details</div>
          </div>
        `;


        // If statement checking to see if link exists, dependent on that the popup will include an extra link line
        let annoucementLinkHTML = "";
        if(json.externalLinkIfAnyOP) {
          annoucementLinkHTML = `<a class="popup-external-link-OP" href="${json.externalLinkIfAnyOP}">Link Here</a>`;
        }

        // Initialize annoucementDetailsHTML to hold all html for annoucnement details
        let annoucementDetailsHTML = `
          <div class="announcement-popup-overlay" id="popup">
            <div class="announcement-popup">
              <h3 class="popup-title">${json.title}</h3>
              <div class="popup-date-OP">${json.eventDateOP}</div>
              <div class="popup-time-OP">${json.eventTimeOP}</div>
              <div class="popup-message">${json.message}</div>
              ${annoucementLinkHTML}
              <button type="button" class="popup-close">Close</button>
            </div>
          </div>
        `;

        // Set the generated html to their respective empty div on home.html
        // Guarded in case generative-announcement-header is ever removed/commented out again, so the popup below still populates independently
        const announcementHeaderEl = document.getElementById("generative-announcement-header");
        if (announcementHeaderEl) {
          announcementHeaderEl.innerHTML = annoucementHeaderHTML;
        }
        document.getElementById("generative-popup").innerHTML = annoucementDetailsHTML;

        const popupCloseBtn = document.querySelector(".popup-close");
        if (popupCloseBtn) {
          popupCloseBtn.addEventListener("click", closePopup);
        }

        // The banner is a div (not a <button>) so it needs an explicit key handler
        // to be operable from the keyboard, matching its onclick behavior above.
        const mainAnnouncementEl = document.getElementById("main-announcement");
        if (mainAnnouncementEl) {
          mainAnnouncementEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              openPopup();
            }
          });
        }

        console.log("Backend Announcements Loaded Succesfully")
      } else {
        console.log("No Annoucements")
      }
    })
    .catch((error) => {
      console.error("Failed to load announcement data:", error);
    });



