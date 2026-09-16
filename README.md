# Islamic Center of Mount Pleasant — Website

This is the source for the ICMP website, a static site (plain HTML/CSS/JS, no
build step, no backend) hosted on GitHub Pages.

This README is a short entry point. Documentation for specific parts of the
site lives in `docs/`, so this file can stay short as more gets documented over
time.

## Documentation

- [Prayer Times (Athan)](docs/prayer-times.md) — where Athan times come from,
  and the mosque's calculation settings (location, method, madhab).
- [Iqama Times](docs/iqama-config.md) — how to change Iqama times without
  touching any code.
- [Donation/Event Section](docs/donation-event.md) — how to update or hide the
  featured Donation/Event band without touching any code.

More sections of the site (announcements, accordion, etc.) are not documented
yet; this documentation is being built up gradually.

## Running locally

This site has no build step. To preview it locally, serve the folder with any
static file server, for example:

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000/index.html`.
