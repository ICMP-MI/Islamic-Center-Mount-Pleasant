
// Tracks whichever element had focus right before the dialog opened (the
// banner, in practice), so focus can be returned to it on close.
let lastFocusedElement = null;

function handleAnnouncementKeydown(e) {
  if (e.key === "Escape") {
    closePopup();
  }
}

// Functions for popup opening and closing
function openPopup() {
  const popup = document.getElementById('popup');
  if (!popup) return;

  lastFocusedElement = document.activeElement;
  popup.classList.add('is-open');
  document.addEventListener('keydown', handleAnnouncementKeydown);

  // Focus the dialog itself (not a specific control inside it) so screen
  // readers announce the dialog's role/label immediately on open.
  const dialog = popup.querySelector('.announcement-popup');
  if (dialog) {
    dialog.focus();
  }
}

function closePopup() {
  const popup = document.getElementById('popup');
  if (!popup) return;

  popup.classList.remove('is-open');
  document.removeEventListener('keydown', handleAnnouncementKeydown);

  if (lastFocusedElement) {
    lastFocusedElement.focus();
    lastFocusedElement = null;
  }
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
            <span class="kicker kicker--on-cream">
              <i class="fa-solid fa-bullhorn" aria-hidden="true"></i> Announcement
            </span>
            <div class="annoucements-title">${json.title}</div>
            <span class="annoucements-toggle">View Details <span aria-hidden="true">&rarr;</span></span>
          </div>
        `;


        // If statement checking to see if link exists, dependent on that the popup will include an extra link line
        // Label is a fixed, more purposeful default ("Learn More") rather than
        // the previous hardcoded "Link Here" — the JSON has no field for link
        // text, so this isn't sourced from data and can be improved here.
        let annoucementLinkHTML = "";
        if(json.externalLinkIfAnyOP) {
          annoucementLinkHTML = `<a class="popup-external-link-OP" href="${json.externalLinkIfAnyOP}">Learn More <span aria-hidden="true">&rarr;</span></a>`;
        }

        // Date/time are only rendered (as a single combined row) when at
        // least one of them is actually set, instead of always emitting two
        // empty elements — mirrors the same "only render if present" pattern
        // already used above for the external link.
        let annoucementMetaHTML = "";
        if (json.eventDateOP || json.eventTimeOP) {
          let dateItemHTML = json.eventDateOP
            ? `<span class="popup-meta-item"><i class="fa-solid fa-calendar" aria-hidden="true"></i> ${json.eventDateOP}</span>`
            : "";
          let timeItemHTML = json.eventTimeOP
            ? `<span class="popup-meta-item"><i class="fa-solid fa-clock" aria-hidden="true"></i> ${json.eventTimeOP}</span>`
            : "";
          annoucementMetaHTML = `<div class="popup-meta">${dateItemHTML}${timeItemHTML}</div>`;
        }

        // Initialize annoucementDetailsHTML to hold all html for annoucnement details
        // role="dialog"/aria-modal/aria-labelledby + tabindex="-1" make this a
        // real accessible dialog rather than just a box that appears; see
        // openPopup()/closePopup() above for the focus-management side of this.
        let annoucementDetailsHTML = `
          <div class="announcement-popup-overlay" id="popup">
            <div class="announcement-popup" role="dialog" aria-modal="true" aria-labelledby="popup-title" tabindex="-1">
              <button type="button" class="popup-close" aria-label="Close announcement">&times;</button>
              <span class="kicker kicker--on-cream">Announcement</span>
              <h3 class="popup-title" id="popup-title">${json.title}</h3>
              ${annoucementMetaHTML}
              <div class="popup-message">${json.message}</div>
              ${annoucementLinkHTML}
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

        // Backdrop click closes the dialog; a click that lands on the dialog
        // box itself (or anything inside it) must not, since e.target there
        // is never the overlay element itself. Same pattern already used by
        // popup-navigation.js and flyer-lightbox.js elsewhere on this site.
        const popupOverlayEl = document.getElementById("popup");
        if (popupOverlayEl) {
          popupOverlayEl.addEventListener("click", (e) => {
            if (e.target === popupOverlayEl) {
              closePopup();
            }
          });
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
