# Islamic Center of Mount Pleasant — Website

This repository contains the entire source of the ICMP website. This README
is split into two parts:

- **[Part 1: For Website Managers](#part-1-for-website-managers)** — no
  coding experience needed. Start here if you're updating content.
- **[Part 2: For Developers](#part-2-for-developers--technical-maintenance)**
  — technical details for anyone doing code-level work on the site.

---

# Part 1: For Website Managers

## 1. What Is This Website?

- This repository (the folder of files on GitHub) **is** the website. Every
  page, image, and piece of text you see on the live site comes from a file
  in here.
- It's a **static website** — there's no server program or database running
  behind it. Every page is a plain file that a web browser reads directly.
  That also means there's nothing to "break" on a server; the worst case is
  a visible mistake on a page, which is easy to fix by editing the file again.
- The live website is hosted by **GitHub Pages** (a free hosting feature
  built into GitHub) at **icmp-mi.org**.
- **How GitHub, branches, and the live site relate:** GitHub stores this
  code online. A **branch** is a separate copy of the code you can safely
  make changes on without affecting the live site — think of it like a
  separate draft of a document. The **`main`** branch is special: whatever
  is in `main` is exactly what visitors see at icmp-mi.org. Other branches
  (like the current `redesign` branch) are drafts/work-in-progress that
  haven't been published yet. A change only goes live once it's merged into
  `main`.

## 2. How Do I Work on the Website?

A **branch** is a separate copy of the code you can edit without touching
the live site. You make your changes there, and only once everything looks
right does it get folded ("merged") into `main` — the live version.

**The basic steps:**

1. **Get the latest version of the site** (pull the newest code from GitHub).
2. **Use the right branch** — don't edit `main` directly. Use the current
   working branch (right now, that's `redesign`) or a new, clearly-named
   branch for your specific change.
3. **Make your change** — edit the relevant file (see the table below).
4. **Test your change** — open the site and look at it (see [Section 5](#5-how-to-test-a-change)).
5. **Commit your change** — save a labeled checkpoint in Git (see [Section 7](#7-making-a-commit-step-by-step)).
6. **Push your branch to GitHub** — upload your commit so others can see it.
7. **Have someone review it**, if appropriate — especially for bigger
   changes.
8. **Merge into `main` only when it's approved and ready to go live.**
   This step is what actually publishes the change.

## 3. Common Website Changes

Find what you want to change below, then follow the "File to edit" and
"What to change" columns. Don't edit anything in the "Don't touch" column —
those parts control how things *work*, not what they *say*.

### Want to change the current announcement banner/popup?

- **File to edit:** `mainAnnouncement.json`
- **What to change:** the `title` and `message` text. Optionally fill in
  `externalLinkIfAnyOP` (a link), `eventDateOP`, and `eventTimeOP`.
- **Don't touch:** `announcement.js`. You never need to open it for a normal
  content change.
- **To remove the announcement entirely:** set `title` and `"message"` to
  empty text (`""`). The banner disappears automatically — you don't need
  to delete or comment anything out.

### Want to change prayer/Iqama times?

- **File to edit:** `iqamaConfig.json`
- **What to change:** the `offsetMinutes` number for any prayer (how many
  minutes after the calculated Athan the Iqama is), or replace it with a
  fixed `"iqama": "6:15 AM"` time if that prayer shouldn't move with Athan.
  Full instructions: [`docs/iqama-config.md`](docs/iqama-config.md).
- **Don't touch:** `prayer-times.js`. The Athan (call-to-prayer) times are
  calculated automatically from a live outside service — nobody needs to
  update them day-to-day.
- **One important exception:** `prayer-times.js` currently has a setting
  (`ASR_SCHOOL`) that is a **placeholder, not yet confirmed by mosque
  leadership** — it affects when Asr is shown and can shift it by up to an
  hour. This is a religious-practice decision, not a normal content edit.
  See [`docs/prayer-times.md`](docs/prayer-times.md) before anyone touches
  this specific setting.

### Want to change the Donation/Event section?

- **File to edit:** `mainDonation.json`
- **What to change:** `title`, `image` (point this at a file already in
  `images-and-icons/`, or add a new image there first), `linkUrl`,
  `linkText`, and `expirationDate`. Full instructions:
  [`docs/donation-event.md`](docs/donation-event.md).
- **Don't touch:** `donation-event.js`.
- **To hide the whole section:** blank out `title`, `image`, or `linkUrl`
  (leave it as `""`). It disappears automatically.

### Want to change the Community Information list (Jummah/Khutbah times, WhatsApp link, Eid times)?

- **File to edit:** `index.html`
- **Where:** search the file for `Community Information` to find the right
  area (it's also marked with an `<!-- Community Information / Accordion
  Section -->` comment).
- **What to change:** only the plain text, for example between
  `<p class="description">` and `</p>`, or inside `<span class="title">...</span>`.
- **Don't touch:** the surrounding `<div>`, `<button>`, or `<i>` tags, or
  anything written as `class="..."`. Those control the expand/collapse
  behavior and styling, not the wording.

### Want to change the "New to the Area" halal food/grocer listings?

- **File to edit:** `get-involved.html`
- **Where:** search for `New to the Area`.
- **What to change:** add, remove, or edit a line like:
  ```html
  <li><strong>Pita Way</strong></li>
  ```
  You can add a short note in parentheses after the name, matching the
  existing style, e.g.:
  ```html
  <li><strong>Panda House</strong> (Upon Request)</li>
  ```
- **Don't touch:** the `<ul class="resource-list">` tags, the `<h3>`/`<h4>`
  city headings, or anything outside the text between `<li>` and `</li>`.

### Want to change the Volunteer section?

- **File to edit:** `get-involved.html`
- **Where:** search for `Volunteer`.
- **What to change:** the text inside the `<h3>` and `<p>` tags within a
  `<div class="volunteer-card">` block.
- **Don't touch:** the `<div class="volunteer-card">` wrapper itself, or the
  `href` on a `<a class="volunteer-cta">` link, unless you specifically mean
  to change where that button sends people.

## 4. A Quick Note on JSON Files

Several of the files above (`mainAnnouncement.json`, `mainDonation.json`,
`iqamaConfig.json`) are **JSON** files. JSON is just a structured, plain-text
way of storing information as `"label": "value"` pairs. A few rules:

- Text goes inside double quotation marks: `"like this"`.
- Every line in a `{ }` group needs a comma after it — **except the very
  last line**, which has no comma.
- Don't rename anything to the *left* of a colon (the label/field name)
  unless you know what you're doing — the website looks for those exact
  names to work.
- Don't accidentally delete a quotation mark.

**A real example**, from this site's own `mainDonation.json`:

```json
{
  "title": "Donations",
  "linkUrl": "https://gofund.me/519aa6a79",
  "linkText": "Go To Fund Link"
}
```

Here, `title`, `linkUrl`, and `linkText` are the field names (don't touch
these) — `"Donations"`, the GoFundMe link, and `"Go To Fund Link"` are the
values (these are what's safe to change).

If you're ever unsure whether a file is still valid after editing, paste its
contents into any free online "JSON validator" before saving.

## 5. How to Test a Change

After saving a file, before committing:

- [ ] Open the page (`index.html` or `get-involved.html`) in a browser.
- [ ] Confirm the specific thing you changed actually appears, and looks right.
- [ ] Check it at a normal desktop window width, then narrow the browser
      window (or check on your phone) to confirm it still looks right on mobile.
- [ ] If you changed the **announcement**: click the gold banner, confirm
      the popup opens with your new text, and that the close button /
      clicking outside the popup / pressing Escape all close it.
- [ ] If you changed **prayer/Iqama times**: confirm the Iqama time shown
      matches what you expect relative to the Athan time next to it.
- [ ] If you changed the **Donation/Event section**: confirm the flyer
      image and link button both work, and that clicking the flyer opens
      the larger view.
- [ ] If you changed **Get Involved content**: click the "New to the Area"
      and "Want to Volunteer?" buttons at the top of that page and confirm
      they jump to the right section; click any link you added/changed to
      confirm it goes to the right place.
- [ ] Check that nothing else on the page looks broken or shifted.
- [ ] If possible, have someone else look at the change before it goes live.

## 6. Change Tracking

Every website change should be traceable to the person who made it. This
matters even more here because some past updates were made under a shared
account (`ICMP-MI`) rather than an individual's name — which means the
account alone doesn't tell anyone later *who* actually made a given change.
Starting your commit message with your name fixes that.

**When you make a change, start your commit message with your name:**

```text
[Your Name] - [What you changed]
```

Examples:

```text
Ahmed - Update Friday announcement
Sarah - Update Saginaw halal food list
John - Fix prayer time display
Mary - Update donation event
```

If it's useful, add a short reason after another dash:

```text
Sarah - Update Saginaw halal food list - added new restaurants
```

**Important:** your name goes in the **commit message** (a record stored in
Git/GitHub), not anywhere on the website itself. Nobody needs to add their
name to any page's content — the live site's text shouldn't change just to
credit an edit. The commit history is where that record lives, and it
effectively becomes the site's change log: anyone can look at GitHub later
and see who changed what, and why.

## 7. Making a Commit, Step by Step

A **commit** is a saved checkpoint — it records exactly what changed and
(thanks to Section 6) who changed it.

```bash
git status
```
Shows which files you've changed. Good to run first so you know what you're
about to commit.

```bash
git add mainAnnouncement.json
```
Stages the specific file you changed — tells Git "include this in the next
checkpoint." Replace the filename with whichever file(s) you actually edited.

```bash
git commit -m "Sarah - Update Saginaw halal food list"
```
Creates the checkpoint, labeled with your name and what changed (see
Section 6).

```bash
git push
```
Uploads your branch, with its new commit, to GitHub.

**Before any of this**, make sure you're on the right branch:

```bash
git branch
```
Shows your current branch (marked with a `*`). If you need to switch to the
current working branch:

```bash
git checkout redesign
```

For a small content edit, working on the existing branch is normally fine.
If a change is large enough to deserve its own branch, that's a decision
for whoever is handling the technical side of the project.

## 8. Saving vs. Committing vs. Publishing

These are three different things, and mixing them up is the most common
point of confusion:

- **Save** → saves the file on your own computer. Nobody else can see it yet.
- **Commit** → records the change in Git's history, with a label (your name
  + what changed). Still only on your computer at this point.
- **Push** → uploads your branch and its commits to GitHub, so others can
  see it.
- **Merge into `main`** → folds an approved change into the live/production
  branch. **This is the step that actually updates icmp-mi.org.**

```text
Edit files
   ↓
Test
   ↓
Commit
   ↓
Push to GitHub
   ↓
Review
   ↓
Merge into main
   ↓
Live website
```

## 9. Current Branches

- **`main`** — the live/production branch. Whatever is here is what's
  currently published at icmp-mi.org.
- **`redesign`** — the current working branch, containing the homepage and
  Get Involved page redesign. It is **not yet merged into `main`**, so none
  of it is live yet. It exists on GitHub so it can be reviewed before that
  happens.

Don't assume any other branches exist beyond these two unless you check
`git branch -a` yourself.

## 10. Troubleshooting

**"I changed something but don't see it."**
Make sure you saved the file, and that you're looking at the right branch's
version of the site (not an old cached page — try a hard refresh). If
you're testing by opening the file directly in a browser, some features
(like the live prayer times) may behave differently than on a real server;
ask a technical person if something seems off only in local testing.

**"I accidentally changed the wrong file."**
Run `git status` to see what's changed, then `git diff <filename>` to see
exactly what was changed in that file. If you haven't committed yet, you can
undo changes to a specific file — ask a technical person for the exact
command rather than guessing, since undo commands can discard work.

**"Git says there are conflicts."**
This means someone else changed the same part of a file you're changing.
Don't try to resolve this by guessing — ask someone technical to help merge
the two versions correctly.

**"The site looks broken after my change."**
Undo your specific content change first (put the old text back) and
re-test. If it's still broken, the problem likely isn't your edit — ask for
help rather than making further guesses.

**"I don't know which file controls something."**
Check the table in [Section 3](#3-common-website-changes) first. If it's
not listed there, don't guess — ask someone familiar with the site.

**"I don't know whether I should change JavaScript."**
You almost certainly shouldn't, for a content change. Every common content
change in this site lives in a `.json` file or as plain text in an `.html`
file — not in a `.js` file. **If you're unsure, do not guess at code. Ask
someone familiar with the site before changing JavaScript, CSS, or the
structure of the website.**

---

# Part 2: For Developers / Technical Maintenance

This is the source for the ICMP website, a static site (plain HTML/CSS/JS,
no build step, no backend) hosted on GitHub Pages, deployed from the `main`
branch, with a custom domain configured via the `CNAME` file.

## Repository structure

```
index.html              Homepage
get-involved.html        "Get Involved" page (New to the Area + Volunteer)
home-page-css/           One stylesheet per feature/section
home-page-javascript/    One script per feature/section
images-and-icons/        All site images
docs/                    Deeper per-feature documentation
mainAnnouncement.json    Announcement banner/popup content
mainDonation.json        Donation/Event band content
iqamaConfig.json         Iqama time configuration
```

## Documentation

- [Prayer Times (Athan)](docs/prayer-times.md) — where Athan times come from,
  and the mosque's calculation settings (location, method, madhab),
  including the unconfirmed Asr-school placeholder.
- [Iqama Times](docs/iqama-config.md) — how `iqamaConfig.json` is structured
  and resolved (fixed time > per-prayer offset > global default).
- [Donation/Event Section](docs/donation-event.md) — how `mainDonation.json`
  drives the featured Donation/Event band, including its expiration logic.

More sections of the site are not documented at this level of detail yet;
this documentation is being built up gradually. Part 1 of this README above
covers day-to-day content changes without needing these docs at all.

## Running locally

This site has no build step. To preview it locally, serve the folder with
any static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.

## Notes for anyone touching code (not just content)

- Each homepage section generally has its own CSS file
  (`home-page-css/<section>.css`) and, where it's dynamic, its own JS file
  (`home-page-javascript/<section>.js`) — follow that convention rather than
  adding logic to an unrelated file.
- `mainAnnouncement.json`, `mainDonation.json`, and `get-involved.html`'s
  content lists are intentionally kept simple enough for non-developers to
  edit directly (see Part 1) — avoid changing their shape/fields without
  also updating the corresponding section of this README and, where one
  exists, the relevant file in `docs/`.
- Some early commits in this repository were made under a shared `ICMP-MI`
  GitHub account rather than an individual's Git author identity. The
  `[Name] - [change]` commit message convention in Part 1 exists specifically
  so that history stays attributable even when individual Git author
  identities aren't set up per-contributor.
