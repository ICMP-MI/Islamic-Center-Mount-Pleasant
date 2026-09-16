// donation-event.js
// Loads Donation/Event content from mainDonation.json and reveals the featured
// Donation/Event section only if valid, non-expired content is found. Mirrors the
// same fetch -> required-field check -> populate pattern used by announcement.js.
// See docs/donation-event.md for the JSON fields and how to edit/disable this section.

fetch('./mainDonation.json')
    .then((response) => response.json())
    .then((json) => {

      // Required fields: without all three there is nothing meaningful to show.
      if (json.title && json.image && json.linkUrl) {

        // An expired event should behave exactly like unpopulated content: stay
        // hidden rather than showing a stale flyer. Comparing as Date objects
        // (not raw strings) so "in the past" works regardless of date format;
        // an unparseable expirationDate is treated as "no expiration" rather
        // than accidentally hiding valid content.
        if (json.expirationDate) {
          const expiration = new Date(json.expirationDate);
          const isExpired = !isNaN(expiration) && expiration < new Date();
          if (isExpired) {
            console.log("Donation/Event content is expired; section stays hidden.");
            return;
          }
        }

        const imageAlt = json.imageAlt || "Flyer";
        const linkText = json.linkText || "Learn More";

        document.getElementById("donation-title").textContent = json.title;

        // Thumbnail and lightbox are separate <img> elements in the HTML, so both
        // need to be set here to keep them showing the same flyer.
        const thumbnailImg = document.getElementById("donation-thumbnail-img");
        thumbnailImg.src = json.image;
        thumbnailImg.alt = imageAlt;

        const lightboxImg = document.getElementById("donation-lightbox-img");
        lightboxImg.src = json.image;
        lightboxImg.alt = imageAlt;

        const ctaLink = document.getElementById("donation-cta-link");
        ctaLink.href = json.linkUrl;
        ctaLink.textContent = linkText;

        // The section starts hidden in index.html; only reveal it here, after
        // confirming there is real, non-expired content to show.
        document.getElementById("donation-event-section").style.display = "flex";

        console.log("Donation/Event content loaded successfully");
      } else {
        console.log("No Donation/Event content configured");
      }
    })
    .catch((error) => {
      console.error("Failed to load Donation/Event data:", error);
    });
