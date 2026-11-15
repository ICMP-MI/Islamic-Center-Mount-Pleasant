// prayer-times.js
// Fetches today's Athan (call to prayer) times from the Aladhan API and computes
// Iqama (congregation) times from iqamaConfig.json. See docs/prayer-times.md and
// docs/iqama-config.md for full explanations of the settings below.

// ─── Mosque location & Aladhan calculation settings ───
// These determine how Athan times are calculated. This is a deliberate mosque/
// technical configuration, not something to change casually. See docs/prayer-times.md
// before changing anything in this section.

const MOSQUE_LATITUDE = 43.597646;   // Mount Pleasant, MI
const MOSQUE_LONGITUDE = -84.766850; // Mount Pleasant, MI
const MOSQUE_TIMEZONE = "America/Detroit";

// Calculation method: which standard body's Fajr/Isha sun-angle convention is used.
// 2 = Islamic Society of North America (ISNA) — a common choice for US mosques.
const CALCULATION_METHOD = 2; // ISNA

// Madhab / Asr school: determines how Asr is calculated.
//   "hanafi" -> later Asr time
//   "shafii" -> earlier Asr time
//
// PLACEHOLDER — NOT YET CONFIRMED BY MOSQUE LEADERSHIP.
// Hanafi is used here temporarily so the system is functional.s
// See docs/prayer-times.md for details before changing this.
const ASR_SCHOOL = "shafii"; // "hanafi" or "shafii"

const ASR_SCHOOL_CODES = { hanafi: 1, shafii: 0 };

// ─── Which rows this page displays, and how they map to the Aladhan API's field names ───
const PRAYER_ROWS = [
  { aladhanKey: "Fajr", id: "fajr", hasIqama: true },
  { aladhanKey: "Sunrise", id: "sunrise", hasIqama: false },
  { aladhanKey: "Dhuhr", id: "dhuhr", hasIqama: true },
  { aladhanKey: "Asr", id: "asr", hasIqama: true },
  { aladhanKey: "Maghrib", id: "maghrib", hasIqama: true },
  { aladhanKey: "Isha", id: "isha", hasIqama: true },
];

const DEFAULT_IQAMA_OFFSET_MINUTES_FALLBACK = 10; // used only if iqamaConfig.json fails to load

function buildAthanApiUrl() {
  const schoolCode = ASR_SCHOOL_CODES[ASR_SCHOOL];
  return (
    "https://api.aladhan.com/v1/timings" +
    "?latitude=" + MOSQUE_LATITUDE +
    "&longitude=" + MOSQUE_LONGITUDE +
    "&method=" + CALCULATION_METHOD +
    "&school=" + schoolCode +
    "&timezonestring=" + MOSQUE_TIMEZONE
  );
}

function fetchAthanTimes() {
  return fetch(buildAthanApiUrl())
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      return data.data.timings;
    })
    .catch(function (error) {
      console.error("Failed to load Athan times:", error);
      return null;
    });
}

function fetchIqamaConfig() {
  return fetch("./iqamaConfig.json")
    .then(function (response) {
      return response.json();
    })
    .catch(function (error) {
      console.error("Failed to load iqamaConfig.json, using default offset only:", error);
      return null;
    });
}

// Strips any trailing text (Aladhan sometimes appends a timezone abbreviation) and
// converts a 24-hour "HH:MM" string to a 12-hour "h:MM AM/PM" string.
function to12Hour(time24) {
  const clean = time24.split(" ")[0];
  const parts = clean.split(":");
  let hour = parseInt(parts[0], 10);
  const minute = parts[1];
  const period = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  hour = hour ? hour : 12;
  return hour + ":" + minute + " " + period;
}

// Adds minutesToAdd to a 24-hour "HH:MM" string, wrapping around midnight if needed.
function addMinutesTo24Hour(time24, minutesToAdd) {
  const clean = time24.split(" ")[0];
  const parts = clean.split(":");
  const hour = parseInt(parts[0], 10);
  const minute = parseInt(parts[1], 10);
  const totalMinutes = (hour * 60 + minute + minutesToAdd + 1440) % 1440;
  const newHour = Math.floor(totalMinutes / 60);
  const newMinute = totalMinutes % 60;
  const pad = function (n) {
    return n < 10 ? "0" + n : String(n);
  };
  return pad(newHour) + ":" + pad(newMinute);
}

// Precedence: fixed Iqama time -> per-prayer offset -> global default offset.
function resolveIqamaDisplay(athanTime24, prayerId, iqamaConfig) {
  const prayerConfig = (iqamaConfig && iqamaConfig.prayers && iqamaConfig.prayers[prayerId]) || {};

  if (prayerConfig.iqama) {
    return prayerConfig.iqama;
  }

  let offsetMinutes;
  if (typeof prayerConfig.offsetMinutes === "number") {
    offsetMinutes = prayerConfig.offsetMinutes;
  } else if (iqamaConfig && typeof iqamaConfig.defaultIqamaOffsetMinutes === "number") {
    offsetMinutes = iqamaConfig.defaultIqamaOffsetMinutes;
  } else {
    offsetMinutes = DEFAULT_IQAMA_OFFSET_MINUTES_FALLBACK;
  }

  return to12Hour(addMinutesTo24Hour(athanTime24, offsetMinutes));
}

function renderPrayerTimes(athanTimes, iqamaConfig) {
  PRAYER_ROWS.forEach(function (row) {
    const athanCell = document.getElementById("athan-" + row.id);
    const iqamaCell = document.getElementById("iqama-" + row.id);

    if (!athanTimes) {
      if (athanCell) {
        athanCell.textContent = "Unavailable";
      }
      if (iqamaCell) {
        iqamaCell.textContent = "—";
      }
      return;
    }

    const athan24 = athanTimes[row.aladhanKey];

    if (athanCell) {
      athanCell.textContent = to12Hour(athan24);
    }

    if (iqamaCell) {
      iqamaCell.textContent = row.hasIqama
        ? resolveIqamaDisplay(athan24, row.id, iqamaConfig)
        : "—";
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  Promise.all([fetchAthanTimes(), fetchIqamaConfig()]).then(function (results) {
    renderPrayerTimes(results[0], results[1]);
  });
});
