# Editing Iqama Times

Iqama times (when the congregation actually prays, as opposed to the calculated
Athan/call-to-prayer time) are controlled by one file:

```
iqamaConfig.json
```

This file is plain JSON — you do **not** need to know how to program to edit it,
and you do not need to touch any `.js` file to change an Iqama time. Just edit
this file and save it.

If you're not familiar with JSON: it's plain text with `{ }`, `"quotes"`, and
`:`/`,` punctuation. The safest way to edit it is to change only the numbers or
text inside quotes, and leave all the punctuation (brackets, quotes, commas)
exactly where it is.

## The two ways to set an Iqama time

For each prayer, you can either:

1. **Use an offset** — Iqama is set automatically as some number of minutes
   after Athan. This is the default approach.
2. **Use a fixed time** — Iqama is set to an exact clock time, ignoring Athan
   entirely. Use this when a prayer's Iqama time doesn't move with the
   calculated Athan time.

## The current file

```json
{
  "_readme": "See docs/iqama-config.md for how to edit this file.",
  "defaultIqamaOffsetMinutes": 10,
  "prayers": {
    "fajr": { "offsetMinutes": 10 },
    "dhuhr": { "offsetMinutes": 10 },
    "asr": { "offsetMinutes": 10 },
    "maghrib": { "offsetMinutes": 5 },
    "isha": { "offsetMinutes": 10 }
  }
}
```

- `defaultIqamaOffsetMinutes` is the fallback used for any prayer that doesn't
  have its own setting below it.
- Each prayer under `"prayers"` can override that default with its own
  `offsetMinutes`, as Maghrib does here (+5 minutes instead of +10).
- **Sunrise is intentionally not listed** — it isn't a congregational prayer, so
  it never has an Iqama. The website always shows a dash ("—") for it. You don't
  need to (and shouldn't) add a `"sunrise"` entry.

## How to change the default offset for every prayer

Change the number after `defaultIqamaOffsetMinutes`:

```json
"defaultIqamaOffsetMinutes": 15,
```

This affects any prayer below that doesn't have its own `offsetMinutes`.

## How to change one prayer's offset

Find that prayer under `"prayers"` and change its number, for example to change
Fajr from +10 to +15 minutes after Athan:

```json
"fajr": { "offsetMinutes": 15 },
```

## How to set a fixed Iqama time instead of an offset

Replace `"offsetMinutes": 10` with `"iqama"` and a time string, for example to
fix Fajr's Iqama at 6:15 AM regardless of what Athan calculates to:

```json
"fajr": { "iqama": "6:15 AM" },
```

Write the time exactly like that — hour, colon, minutes, a space, then `AM` or
`PM`.

**Important**: if a prayer has both `"iqama"` and `"offsetMinutes"` set, the
fixed `"iqama"` time always wins — the offset is ignored. Only include one or
the other for a given prayer to keep things unambiguous.

## Priority order (which setting wins)

For each prayer, the website decides its Iqama time in this order:

1. A fixed `"iqama"` time on that prayer, if set.
2. That prayer's own `"offsetMinutes"`, if set.
3. The global `"defaultIqamaOffsetMinutes"`, if neither of the above is set.

## Common mistakes to avoid

- Don't remove the commas between lines, or add a comma after the very last
  entry in a `{ }` group — this will break the file.
- Don't remove the quotation marks around text values like `"6:15 AM"`.
- If you're unsure after editing, you can paste the file's contents into any
  free "JSON validator" website to check it's still valid before saving.

## What is safe to change here

Everything in this file is meant to be edited by mosque staff without needing a
developer — offsets and fixed times for any prayer, and the global default.

Settings that affect how Athan itself is calculated (location, calculation
method, madhab) are **not** in this file — see
[`prayer-times.md`](prayer-times.md) for those, which requires more care since
they involve real technical/religious-practice decisions.
