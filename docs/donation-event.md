# Editing the Donation/Event Section

The featured Donation/Event band (the flyer + "Donations" heading + link button
directly below the Prayer Times strip) is controlled by one file:

```
mainDonation.json
```

This file is plain JSON — you do **not** need to know how to program to edit
it, and you do not need to touch any `.js` file to change what's shown. Just
edit this file and save it.

Standard JSON does not support comments (no `//` or `/* */`), so this file
instead has a `"_readme"` field at the top that just points back to this
document — it isn't read or used by the website itself.

If you're not familiar with JSON: it's plain text with `{ }`, `"quotes"`, and
`:`/`,` punctuation. The safest way to edit it is to change only the text
inside quotes, and leave all the punctuation (brackets, quotes, commas)
exactly where it is.

## The current file

```json
{
  "_readme": "See docs/donation-event.md for how to edit this file.",
  "title": "Donations",
  "image": "images-and-icons/Donation.jpeg",
  "imageAlt": "Fundraiser Iftar flyer",
  "linkUrl": "https://gofund.me/519aa6a79",
  "linkText": "Go To Fund Link",
  "expirationDate": ""
}
```

## Fields

**Required** — the section stays hidden if any of these three are missing or
blank:

- `title` — the heading shown above the link button (e.g. "Donations").
- `image` — the path to the flyer image, used for both the small thumbnail and
  the full-size view when someone taps it. Point this at any image already in
  `images-and-icons/`, or a new file added there.
- `linkUrl` — where the link button goes (e.g. a GoFundMe or other donation
  page).

**Optional** — safe to leave blank; each has a sensible fallback:

- `imageAlt` — describes the image for screen readers. Falls back to a generic
  "Flyer" if left blank; worth filling in with something specific (e.g. what
  the flyer is for) when you change the image.
- `linkText` — the words on the link button (e.g. "Go To Fund Link" or "Donate
  Now"). Falls back to "Learn More" if left blank.
- `expirationDate` — see below. Leave as `""` for content that should keep
  showing indefinitely.

## How expiration works

If `expirationDate` is set to a date (e.g. `"2026-04-01"`), the section will
automatically stop showing itself once that date has passed — you don't need
to remember to come back and turn it off manually. Leave it as an empty string
(`""`) for a donation link or flyer that should keep showing until you
change it yourself.

## How to hide the entire section

Blank out any one of the three required fields — for example, set `"title"`
to `""` — and save the file. The whole Donation/Event band, including its
flyer thumbnail and lightbox, will disappear from the site. No HTML or CSS
needs to change.

## Common mistakes to avoid

- Don't remove the commas between lines, or add a comma after the very last
  entry — this will break the file.
- Don't remove the quotation marks around text values.
- If you're unsure after editing, paste the file's contents into any free
  "JSON validator" website to check it's still valid before saving.
