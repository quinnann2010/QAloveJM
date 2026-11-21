
"use strict";

/* =========================================================
   LOVEVERSE — NEW YEAR 2027
   Greeting Card • Resolutions • Future Mail • Fortune Cookies
   ========================================================= */


/* =========================================================
   1. CONFIGURATION
   ========================================================= */

// Google Apps Script endpoint.
// Never put Google credentials in frontend code.

const FUTURE_MAIL_ENDPOINT =
  "https://script.google.com/macros/s/AKfycbxzjS8mGWbwfWl4a6xdtJOeZaStdqP9bfs2GsL_wVaW2Y09hxXlklOw-N5u0K10tweZ/exec";

// LocalStorage keys
const RES_KEY = "loveverse.newyear2027.resolutions.v1";
const COOKIE_KEY = "loveverse.newyear2027.cookies.v2";
const NEW_YEAR_CARD_KEY = "loveverse_newyear_memories_v1";

// Future letter unlock date:
// December 31, 2027 — 8:00 PM, Paris time

const LETTER_UNLOCK_AT = Date.parse(
  "2027-12-31T20:00:00+01:00"
);

// DOM helper
const $ = (selector) => document.querySelector(selector);


/* =========================================================
   2. FUTURE LETTER — QUỲNH ANH TO JAROD
   ========================================================= */

const QUYNH_ANH_LETTER = `My dear Jarod,

If you're reading this, we've reached the last evening of 2027.

I'm writing this without knowing what the year ahead will bring us. Maybe there will be happy surprises, little adventures and memories that make us laugh. Maybe there will also be misunderstandings, arguments, hard days or moments when loving each other takes a little more patience.

I don't know how much we'll have changed by then. But I hope that, after everything, we're still together.

Not because every day was perfect, but because we kept listening, learning, and choosing each other. I hope we haven't forgotten why we chose each other in the first place.

Right now, as I'm writing this, I'm choosing you. And I hope that when you're reading it, we're still choosing each other, with the same sincerity and perhaps a little more understanding than before.

If 2027 was a difficult year, I hope we can look back and say, “We made it.” And if it was a beautiful one, I hope we're already dreaming of all the things we'll do next.

Thank you for the memories we've made, and for all the ones I can't imagine yet.

Here's to us, and hopefully many more years of choosing each other.

With all my love,
Your little girlfriend,
Quỳnh Anh ♡`;


/* ---------------------------------------------------------
   2.1 Update Future Letter Countdown
   --------------------------------------------------------- */

function updateFutureLetter() {
  const unlocked = Date.now() >= LETTER_UNLOCK_AT;

  $("#qa-locked").hidden = unlocked;
  $("#qa-open").hidden = !unlocked;

  if (unlocked) {
    $("#qa-letter").textContent = QUYNH_ANH_LETTER;
  } else {
    const diff = Math.max(
      0,
      LETTER_UNLOCK_AT - Date.now()
    );

    const days = Math.floor(diff / 86400000);

    const hours = Math.floor(
      (diff % 86400000) / 3600000
    );

    const minutes = Math.floor(
      (diff % 3600000) / 60000
    );

    $("#qa-countdown").textContent =
      `Sealed for ${days} days, ` +
      `${hours} hours and ${minutes} minutes more ♡`;
  }
}

// Initial countdown
updateFutureLetter();

// Update every minute
setInterval(updateFutureLetter, 60000);


/* =========================================================
   3. NEW YEAR GREETING CARD
   ========================================================= */

// This card is a keepsake.
// It is separate from Future Mail and daily activities.

const greetingDialog = $("#newyear-greeting-dialog");
const greetingEnvelope = $("#greeting-envelope");
const greetingLetter = $("#greeting-letter");
const greetingStatus = $("#greeting-save-status");


/* ---------------------------------------------------------
   3.1 Open Greeting Card
   --------------------------------------------------------- */

function openGreetingCard() {
  greetingEnvelope.hidden = false;
  greetingLetter.hidden = true;
  greetingStatus.textContent = "";

  greetingDialog.showModal();
}


/* ---------------------------------------------------------
   3.2 Greeting Card Events
   --------------------------------------------------------- */

// Open the card
$("#open-greeting").addEventListener(
  "click",
  openGreetingCard
);

// Close the card
$("#close-greeting").addEventListener("click", () => {
  greetingDialog.close();
});

// Unfold the letter
$("#reveal-greeting").addEventListener("click", () => {
  greetingEnvelope.hidden = true;
  greetingLetter.hidden = false;

  greetingDialog.scrollTop = 0;
});

// Fold the letter
$("#fold-greeting").addEventListener("click", () => {
  greetingLetter.hidden = true;
  greetingEnvelope.hidden = false;

  greetingDialog.scrollTop = 0;
});

// Close when clicking outside the card
greetingDialog.addEventListener("click", (event) => {
  if (event.target === greetingDialog) {
    greetingDialog.close();
  }
});


/* ---------------------------------------------------------
   3.3 Save Greeting Card to Memory Drawer
   --------------------------------------------------------- */

$("#save-greeting").addEventListener("click", () => {
  try {
    const existing = JSON.parse(
      localStorage.getItem(NEW_YEAR_CARD_KEY) || "[]"
    );

    const saved = Array.isArray(existing)
      ? existing.filter(
          (item) => item?.id !== "new-year-greeting-2027"
        )
      : [];

    saved.push({
      id: "new-year-greeting-2027",
      savedAt: new Date().toISOString()
    });

    localStorage.setItem(
      NEW_YEAR_CARD_KEY,
      JSON.stringify(saved)
    );

    greetingStatus.textContent =
      "Saved to your Memory Drawer! ♡ " +
      "Open Memories on this browser to find it.";

    $("#save-greeting").textContent =
      "Saved to Memory Drawer ✓";

  } catch {
    greetingStatus.textContent =
      "Could not save on this browser. " +
      "Please enable local storage and try again.";
  }
});


/* =========================================================
   4. LOCAL STORAGE HELPERS
   ========================================================= */

// Read saved data
const read = (key, fallback) => {
  try {
    return JSON.parse(localStorage.getItem(key)) ?? fallback;
  } catch {
    return fallback;
  }
};

// Save data
const save = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
};

// Escape text before inserting into innerHTML
const esc = (value) =>
  String(value).replace(
    /[&<>"']/g,
    (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[char]
  );


/* =========================================================
   5. OUR 2027 RESOLUTIONS
   ========================================================= */

// Load existing resolutions
let resolutions = read(RES_KEY, []);

if (!Array.isArray(resolutions)) {
  resolutions = [];
}


/* ---------------------------------------------------------
   5.1 Render Resolution List
   --------------------------------------------------------- */

function renderRes() {
  const ul = $("#resolution-list");

  ul.replaceChildren();

  // Empty state
  if (!resolutions.length) {
    const p = document.createElement("li");

    p.textContent =
      "Your little adventures will appear here ♡";

    ul.append(p);
  }

  resolutions.forEach((resolution, index) => {
    const li = document.createElement("li");

    li.className = resolution.done ? "done" : "";

    // Completion checkbox
    const check = document.createElement("input");

    check.type = "checkbox";
    check.checked = !!resolution.done;

    check.setAttribute(
      "aria-label",
      "Mark resolution complete"
    );

    check.onchange = () => {
      resolution.done = check.checked;

      save(RES_KEY, resolutions);
      renderRes();
    };

    // Resolution text
    const span = document.createElement("span");

    span.textContent = resolution.text;

    // Delete button
    const del = document.createElement("button");

    del.textContent = "×";

    del.setAttribute(
      "aria-label",
      "Delete resolution"
    );

    del.onclick = () => {
      resolutions.splice(index, 1);

      save(RES_KEY, resolutions);
      renderRes();
    };

    li.append(check, span, del);
    ul.append(li);
  });
}


/* ---------------------------------------------------------
   5.2 Add New Resolution
   --------------------------------------------------------- */

function addRes(text) {
  text = text.trim();

  if (!text || resolutions.length >= 100) {
    return;
  }

  resolutions.push({
    text,
    done: false
  });

  save(RES_KEY, resolutions);
  renderRes();
}


/* ---------------------------------------------------------
   5.3 Resolution Form
   --------------------------------------------------------- */

$("#resolution-form").onsubmit = (event) => {
  event.preventDefault();

  addRes($("#resolution-text").value);

  $("#resolution-text").value = "";
};


/* ---------------------------------------------------------
   5.4 Suggested Resolutions
   --------------------------------------------------------- */

document
  .querySelectorAll("[data-suggest]")
  .forEach((button) => {
    button.onclick = () => {
      addRes(button.dataset.suggest);
    };
  });

// Initial rendering
renderRes();


/* ---------------------------------------------------------
   5.5 Export Resolutions
   --------------------------------------------------------- */

$("#export-resolutions").onclick = () => {
  const blob = new Blob(
    [
      JSON.stringify(
        {
          type: "loveverse-resolutions-2027",
          items: resolutions
        },
        null,
        2
      )
    ],
    {
      type: "application/json"
    }
  );

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");

  link.href = url;
  link.download = "our-2027-resolutions.json";

  link.click();

  setTimeout(() => {
    URL.revokeObjectURL(url);
  }, 1000);
};


/* ---------------------------------------------------------
   5.6 Import Resolutions
   --------------------------------------------------------- */

$("#import-resolutions").onchange = async (event) => {
  const file = event.target.files[0];

  if (!file) {
    return;
  }

  try {
    const data = JSON.parse(await file.text());

    const valid =
      data.type === "loveverse-resolutions-2027" &&
      Array.isArray(data.items) &&
      data.items.length <= 100 &&
      data.items.every(
        (item) =>
          typeof item.text === "string" &&
          item.text.length <= 160 &&
          typeof item.done === "boolean"
      );

    if (!valid) {
      throw new Error("Invalid backup");
    }

    if (
      confirm(
        "Replace the resolutions saved in this browser?"
      )
    ) {
      resolutions = data.items;

      save(RES_KEY, resolutions);
      renderRes();
    }

  } catch {
    alert("Invalid resolutions backup.");
  }

  event.target.value = "";
};


/* =========================================================
   6. NAVIGATION TABS
   ========================================================= */

document
  .querySelectorAll("[data-tab]")
  .forEach((button) => {
    button.onclick = () => {
      // Update active tab
      document
        .querySelectorAll("[data-tab]")
        .forEach((tab) => {
          tab.classList.toggle(
            "active",
            tab === button
          );
        });

      // Show corresponding page
      document
        .querySelectorAll(".page")
        .forEach((page) => {
          page.classList.toggle(
            "active",
            page.id === button.dataset.tab
          );
        });
    };
  });


/* =========================================================
   7. FUTURE MAIL — JAROD TO QUỲNH ANH
   ========================================================= */

const form = $("#letter-form");


/* ---------------------------------------------------------
   7.1 Configure Google Apps Script
   --------------------------------------------------------- */

if (FUTURE_MAIL_ENDPOINT) {
  form.action = FUTURE_MAIL_ENDPOINT;
} else {
  $("#mail-status").textContent =
    "Setup required: the owner must deploy " +
    "Google Apps Script and paste its URL into " +
    "script.js before letters can be scheduled.";
}


/* ---------------------------------------------------------
   7.2 Submit Future Letter
   --------------------------------------------------------- */

form.onsubmit = (event) => {
  if (!FUTURE_MAIL_ENDPOINT) {
    event.preventDefault();

    alert(
      "Future Mail is not configured yet. " +
      "Ask the site owner to connect the " +
      "Apps Script endpoint."
    );

    return;
  }

  const confirmed = confirm(
    "Seal this letter for December 31, 2027? " +
    "The confirmation will open in a new tab."
  );

  if (!confirmed) {
    event.preventDefault();
    return;
  }

  $("#mail-status").textContent =
    "Check the new tab for the server confirmation. " +
    "This page cannot verify whether your letter was saved.";
};


/* =========================================================
   8. FORTUNE COOKIES
   ========================================================= */


/* ---------------------------------------------------------
   8.1 Get Current Date in Paris
   --------------------------------------------------------- */

function parisDay() {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Paris",
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date());
}


/* ---------------------------------------------------------
   8.2 Load Saved Fortune Cookies
   --------------------------------------------------------- */

let cookies = read(COOKIE_KEY, {
  days: {},
  seen: []
});

if (
  !cookies ||
  typeof cookies !== "object" ||
  !cookies.days ||
  !Array.isArray(cookies.seen)
) {
  cookies = {
    days: {},
    seen: []
  };
}


/* ---------------------------------------------------------
   8.3 Render Daily Fortune Cookie
   --------------------------------------------------------- */

function renderCookie() {
  const day = parisDay();

  const id = cookies.days[day];

  const fortune = FORTUNES.find(
    (item) => item.id === id
  );

  const element = $("#cookie-content");

  // Already opened today's cookie
  if (fortune) {
    element.innerHTML = `
      <div class="fortune-paper">
        <small>
          FORTUNE #${fortune.id} · ${esc(day)}
        </small>

        <p>
          “${esc(fortune.text)}”
        </p>
      </div>

      <p>
        Come back tomorrow for another little surprise ♡
      </p>
    `;

  } else {
    // Cookie not opened yet
    element.innerHTML = `
      <p>
        ${100 - cookies.seen.length}
        little messages left to discover.
      </p>

      <button
        class="primary"
        id="crack"
      >
        Open today's cookie ♡
      </button>
    `;

    $("#crack").onclick = () => {
      const pool = FORTUNES.filter(
        (item) => !cookies.seen.includes(item.id)
      );

      if (!pool.length) {
        return;
      }

      const randomIndex = Math.floor(
        Math.random() * pool.length
      );

      const selected = pool[randomIndex];

      cookies.days[day] = selected.id;
      cookies.seen.push(selected.id);

      save(COOKIE_KEY, cookies);
      renderCookie();
    };
  }
}


/* ---------------------------------------------------------
   8.4 Fortune Cookie Collection
   --------------------------------------------------------- */

$("#cookie-collection").onclick = () => {
  const archive = $("#cookie-archive");

  archive.hidden = !archive.hidden;

  if (!archive.hidden) {
    archive.innerHTML = `
      <h3>
        Collected fortunes (${cookies.seen.length}/100)
      </h3>

      <div class="archive-list">
        ${cookies.seen
          .map((id) => {
            const fortune = FORTUNES.find(
              (item) => item.id === id
            );

            return fortune
              ? `
                <div>
                  ✦ #${id}
                  <p>${esc(fortune.text)}</p>
                </div>
              `
              : "";
          })
          .join("")}
      </div>
    `;
  }
};


// Initial rendering
renderCookie();
