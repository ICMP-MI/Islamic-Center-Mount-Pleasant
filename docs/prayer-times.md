# Prayer Times (Athan)

This page's "Today's Prayer Times" table shows two things for each prayer:

- **Athan** — the calculated call-to-prayer time, fetched live from a third-party
  service (the Aladhan API) every time someone loads the page.
- **Iqama** — the mosque's actual congregation time. This is computed from Athan
  plus mosque-specific settings. See [`iqama-config.md`](iqama-config.md) for how
  to change Iqama times — that part is meant to be easy to edit without touching
  any code.

This document covers the **Athan** side only: where the times come from and the
settings that control the calculation.

## Where the code lives

- `home-page-javascript/prayer-times.js` — fetches Athan times and computes Iqama
- `iqamaConfig.json` — Iqama settings (see `iqama-config.md`)
- `home-page-css/prayer-times.css` — styling for the prayer times table

## How it works

There is no backend and no database. On every page load, `prayer-times.js` calls
a free public API — [Aladhan](https://aladhan.com/prayer-times-api) — directly
from the visitor's browser, asking it to calculate today's prayer times for the
mosque's location. Nothing needs to be updated manually for a new day; the
current date is used automatically.

## Settings that control the Athan calculation

These live near the top of `home-page-javascript/prayer-times.js`, as named
constants. They change essentially never — they are a mosque/technical
configuration, not something a non-developer needs to touch day-to-day.

| Setting | Current value | What it means |
|---|---|---|
| Location | `43.597646, -84.766850` | Coordinates for Mount Pleasant, MI. If the mosque ever moves, these would need to change. |
| Time zone | `America/Detroit` | Ensures times are shown in the correct local clock time (Eastern Time). |
| Calculation method | `2` (ISNA) | Which standard body's sun-angle convention is used to calculate Fajr/Isha. ISNA (Islamic Society of North America) is a common choice for US mosques. |
| Madhab / Asr school | `hanafi` | See the important note below. |

### ⚠️ Madhab / Asr school — currently a placeholder, not a confirmed decision

The code currently uses **Hanafi**. **This has not been confirmed by mosque
leadership** — it was used as a functional placeholder so the rest of the system
could be built and tested, matching the temporary/example value used during
early planning.

This setting is not a minor technical detail. It changes what time is displayed
as Asr — and the difference is large:

- **Hanafi** (`school=1`): Asr is calculated later.
- **Shafi'i** (`school=0`): Asr is calculated earlier.

For Mount Pleasant, on the day this was written, the difference between the two
was **54 minutes** — nearly an hour. This is a genuine difference in Islamic
jurisprudence about when the Asr prayer window begins, not a rounding
technicality.

**This must be confirmed by the mosque (typically by whoever leads prayers or
sets mosque policy) before this is treated as final**, not decided by whoever is
editing the website.

**How to change it**: in `home-page-javascript/prayer-times.js`, find this line:

```js
const ASR_SCHOOL = "hanafi"; // "hanafi" or "shafii"
```

Change `"hanafi"` to `"shafii"` (or back) as needed. Nothing else in the file
needs to change — the rest of the code reads this setting by name.

## What happens if the Aladhan API is unavailable

If the API request fails for any reason (the service is down, no internet,
etc.), the Athan and Iqama columns show "Unavailable" / "—" instead of times.
The failure is logged to the browser console for troubleshooting, and the rest
of the page (announcements, accordion, navigation, donations) is unaffected —
this is a separate script from everything else on the page.
