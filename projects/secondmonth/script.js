
"use strict";

/* =========================================
   1. CONFIGURATION
========================================= */

const CONFIG = {
  recipientEmail: "quinnann.hoang.2010@gmail.com",
  activationDate: "20 October 2026",
  owner: "Jarod Mendes",
  model: "Baby Princess 2000 — Limited Edition"
};


/* =========================================
   2. LOCAL STORAGE KEYS
========================================= */

const DATE_REQUESTS = "loveverse_m02_dates_v1";
const STORAGE = "loveverse_m02_tickets_v1";
const REWARDS = "loveverse_m02_rewards_v1";


/* =========================================
   M02 ↔ M03 SECRET ARCHIVE CONFIGURATION
========================================= */

// Mật mã sẽ được tiết lộ trong M03
const ARCHIVE_CODE = "FIRSTKISS";

// Lưu trạng thái mở khóa trên trình duyệt
const ARCHIVE_UNLOCKED =
  "loveverse_m02_archive003_unlocked_v1";

// Phần thưởng bí mật
const ARCHIVE_REWARD = "One Naughty Wish 😈";


/* =========================================
   3. GLOBAL VARIABLES & HELPERS
========================================= */

const $ = selector => document.querySelector(selector);

const page = $("#page");

let current = "home";


function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}


function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}


function escapeHTML(value) {
  return String(value).replace(
    /[&<>"']/g,
    character => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    })[character]
  );
}


function btn(name, destination) {
  return `
    <button
      class="btn secondary"
      data-go="${destination}"
    >
      ${name} →
    </button>
  `;
}


/* =========================================
   4. NOTIFICATIONS & ANIMATIONS
========================================= */

function toast(message) {
  const element = $("#toast");

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(window.toastTimer);

  window.toastTimer = setTimeout(() => {
    element.classList.remove("show");
  }, 3300);
}


function hearts() {
  const symbols = ["♡", "♥", "💕", "✦"];
  const colors = ["#d56c92", "#e9a9bf", "#b77c91"];

  for (let i = 0; i < 12; i++) {
    const heart = document.createElement("span");

    heart.className = "heart";
    heart.textContent = symbols[i % symbols.length];

    heart.style.left =
      (15 + Math.random() * 70) + "vw";

    heart.style.top =
      (50 + Math.random() * 35) + "vh";

    heart.style.color = colors[i % colors.length];

    heart.style.animationDelay =
      (Math.random() * 0.5) + "s";

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2700);
  }
}


/* =========================================
   5. MODAL SYSTEM
========================================= */

function modal(html) {
  $("#modalContent").innerHTML = html;
  $("#modal").classList.remove("hidden");
}


/* =========================================
   6. TICKET & REWARD MANAGEMENT
========================================= */

function addTicket(
  category,
  detail,
  kind,
  status = "Resolved"
) {
  const tickets = read(STORAGE);

  const id =
    "GF-" + Date.now().toString(36).toUpperCase();

  tickets.unshift({
    id,
    category,
    detail,
    kind,
    status,
    date: new Date().toLocaleString("en-GB")
  });

  save(STORAGE, tickets);

  return id;
}


function grantReward(title) {
  const rewards = read(REWARDS);

  if (!rewards.some(reward => reward.title === title)) {
    rewards.push({
      title,
      redeemed: false,
      id: "RW-" + Date.now().toString(36)
    });

    save(REWARDS, rewards);

    toast("A compensation voucher has been issued! ♡");
  }
}


/* =========================================
   7. COMPLAINT RESOLUTIONS
========================================= */

const REMEDIES = {

  kisses: {
    title: "Extra Kisses Authorization",
    solution:
      "Approved: extra kisses are owed at your next mutually agreed cuddle session. Show this ticket to your girlfriend to claim them.",
    voucher: "Extra Kisses Pass 💋"
  },

  bratty: {
    title: "Bratty Mode Service Notice",
    solution:
      "No hardware fault detected. Recommended fix: one gentle negotiation, one hug, and a kiss if both parties agree.",
    voucher: "Peace Treaty Hug 🧸"
  },

  cute: {
    title: "Excessive Cuteness Clearance",
    solution:
      "This feature cannot be disabled. Compensation: one opportunity to request a kiss and tell your girlfriend how cute she is.",
    voucher: "Cuteness Compensation Kiss ♡"
  },

  missing: {
    title: "Reunion Priority Pass",
    solution:
      "Longing confirmed. Remedy: propose a cozy reunion and spend some uninterrupted time together.",
    voucher: "Reunion Cuddle Pass 🏠"
  },

  attention: {
    title: "Extra Attention Allocation",
    solution:
      "Priority attention requested. Show this pass and tell your girlfriend whether you need a chat, a hug, or quality time.",
    voucher: "Extra Attention Pass 💗"
  },

  date: {
    title: "Private Date Proposal",
    solution:
      "Your date plan has been registered. Show this ticket and agree on the details together before the date is confirmed.",
    voucher: null
  },

  upset: {
    title: "Personal Care Follow-up",
    solution:
      "Your feelings deserve a real conversation. This ticket is a reminder to listen carefully, without jokes or automatic promises.",
    voucher: null
  },

  talk: {
    title: "Conversation Request",
    solution:
      "Set aside a calm moment to talk openly. This ticket is a request for conversation, not a guarantee of immediate availability.",
    voucher: null
  },

  other: {
    title: "Personal Review Requested",
    solution:
      "Your message deserves an individual reply. Please discuss it together when both of you are available.",
    voucher: null
  }

};


/* =========================================
   8. OFFICIAL RESOLUTION TICKETS
========================================= */

function ticketCode() {
  const characters =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  const numbers = new Uint32Array(7);

  if (window.crypto && crypto.getRandomValues) {
    crypto.getRandomValues(numbers);
  } else {
    for (let i = 0; i < numbers.length; i++) {
      numbers[i] = Math.floor(
        Math.random() * 4294967295
      );
    }
  }

  return "QH-" +
    Array.from(
      numbers,
      number => characters[number % characters.length]
    ).join("");
}


function ticketCard(ticket) {
  const remedy = ticket.remedy || {
    title: "Support Request",
    solution: "Please discuss this together.",
    voucher: null
  };

  return `
    <article
      class="resolution-ticket"
      id="ticket-${escapeHTML(ticket.id)}"
    >

      <div class="ticket-header">
        <span>♡ GF CARE · OFFICIAL RESOLUTION</span>

        <span class="ticket-status">
          ${escapeHTML(ticket.status)}
        </span>
      </div>

      <div class="ticket-body">

        <p class="eyebrow">
          COMPLAINT RESOLUTION CERTIFICATE
        </p>

        <h2>${escapeHTML(remedy.title)}</h2>

        <p>
          <strong>Issue:</strong>
          ${escapeHTML(ticket.category)}
        </p>

        <div class="ticket-remedy">
          <strong>✓ Approved resolution</strong>
          <p>${escapeHTML(remedy.solution)}</p>
        </div>

        ${
          remedy.voucher
            ? `
              <p class="ticket-voucher">
                🎟️ Compensation:
                ${escapeHTML(remedy.voucher)}
              </p>
            `
            : ""
        }

        <div class="ticket-code">
          <span>Ticket reference</span>
          <strong>${escapeHTML(ticket.id)}</strong>
        </div>

        <p class="fine">
          Issued ${escapeHTML(ticket.date)} ·
          Valid as a sweet reminder, not an obligation.
          All plans and affection are by mutual agreement.
        </p>

      </div>

      <div class="ticket-footer">
        📸 Screenshot this ticket and show it to your
        girlfriend when you want to claim your resolution.
        Keep the code visible!
      </div>

    </article>
  `;
}


function issueComplaintTicket(
  category,
  detail,
  kind,
  status,
  remedy,
  reference
) {
  const tickets = read(STORAGE);

  const ticket = {
    id: reference || ticketCode(),
    category,
    detail,
    kind,
    status,
    date: new Date().toLocaleString("en-GB"),
    remedy
  };

  tickets.unshift(ticket);

  save(STORAGE, tickets);

  return ticket;
}


/* =========================================
   9. WEBSITE PAGES
========================================= */

const views = {

  /* ---------------------------------------
     9.1 DASHBOARD
  --------------------------------------- */

  home: () => `
    <section class="hero">

      <div class="eyebrow">
        Official Girlfriend After-Sales Department
      </div>

      <h1>Hi, Mr. Mendes! ♡</h1>

      <p>
        Welcome to your exclusive girlfriend care portal.
        Experiencing an unexpected amount of cuteness?
        Missing cuddles?

        Our extremely professional team
        (one tiny girlfriend) is here to help.
      </p>

      <div class="actions">
        <button class="btn" data-go="warranty">
          View My Warranty ♡
        </button>

        <button class="btn outline" data-go="complaints">
          File a Complaint
        </button>
      </div>

    </section>

    <div class="grid">

      <div class="card">
        <div class="iconbox">🪪</div>
        <h3>Product Registration</h3>

        <p>
          One very special girlfriend.
          Limited edition.
          No replacement units available.
        </p>

        ${btn("Warranty Card", "warranty")}
      </div>

      <div class="card">
        <div class="iconbox">🛠️</div>
        <h3>Repair & Diagnostics</h3>

        <p>
          Detect common girlfriend-related issues
          and receive official repair instructions.
        </p>

        ${btn("Run Diagnostics", "diagnostic")}
      </div>

      <div class="card">
        <div class="iconbox">💌</div>
        <h3>Customer Complaints</h3>

        <p>
          Submit feedback.
          All complaints are carefully reviewed
          by the girlfriend herself.
        </p>

        ${btn("Open Support", "complaints")}
      </div>

    </div>

    <div class="card">
      <span class="eyebrow">
        SYSTEM ANNOUNCEMENT
      </span>

      <h3>100% Customer Satisfaction*</h3>

      <p>
        *Based on a survey conducted by the girlfriend,
        who also counted the votes.
      </p>

      <button class="btn outline" id="audit">
        View audit report
      </button>
    </div>
  `,


  /* ---------------------------------------
     9.2 WARRANTY CARD
  --------------------------------------- */

  warranty: () => `
    <div class="eyebrow">
      Official Certificate
    </div>

    <h1 class="section-title">
      Your Girlfriend Warranty Card ♡
    </h1>

    <p class="muted">
      Please keep this certificate safe.
      It is valid for one (1) extremely lucky boyfriend.
    </p>

    <div class="warranty" id="certificate">

      <div class="warranty-top">
        <strong>♡ GF CARE™</strong>
        <span class="tag">✓ ACTIVE</span>
      </div>

      <p class="eyebrow">
        CERTIFICATE OF AUTHENTIC AFFECTION · GF-001
      </p>

      <h2>One (1) Girlfriend ♡</h2>

      <div class="details">

        <div>
          <small>Registered product</small>
          <strong>${escapeHTML(CONFIG.model)}</strong>
        </div>

        <div>
          <small>Registered boyfriend</small>
          <strong>${escapeHTML(CONFIG.owner)}</strong>
        </div>

        <div>
          <small>Activation date</small>
          <strong>${escapeHTML(CONFIG.activationDate)}</strong>
        </div>

        <div>
          <small>Warranty validity</small>
          <strong>Lifetime* ♡</strong>
        </div>

        <div>
          <small>Serial number</small>
          <strong>GF-LOVE-001</strong>
        </div>

        <div>
          <small>Service batch</small>
          <strong>QH-20 · 10</strong>
        </div>

      </div>

      <div class="warranty-top">

        <div>
          <span class="eyebrow">Authorized by</span>
          <br>
          <strong>Your Tiny IT Girlfriend ♡</strong>
        </div>

        <div class="stamp">
          100%<br>
          GIRLFRIEND<br>
          APPROVED ♡
        </div>

      </div>

      <p class="fine">
        *A playful certificate, not a legal guarantee.
        Love, care and consent always matter.
      </p>

    </div>

    <div class="actions">
      <button class="btn" id="printCard">
        Print / Save as PDF
      </button>

      ${btn("Read Warranty Terms", "terms")}
    </div>
  `,


  /* ---------------------------------------
     9.3 WARRANTY TERMS
  --------------------------------------- */

  terms: () => `
    <h1 class="section-title">
      Warranty Coverage & Terms
    </h1>

    <p class="muted">
      Please read the terms before filing a request.
      Failure to read them does not exempt you
      from receiving kisses.
    </p>

    <div class="grid two">

      <div class="card">
        <div class="iconbox">💗</div>
        <h3>Covered by Warranty</h3>

        <p>
          ✓ Insufficient cuddles<br>
          ✓ Sudden girlfriend clinginess<br>
          ✓ Excessive "I miss you" messages<br>
          ✓ Low affection battery<br>
          ✓ Unexpected need for reassurance<br>
          ✓ Emergency kiss deficiency
        </p>
      </div>

      <div class="card">
        <div class="iconbox">⚠️</div>
        <h3>Special Conditions</h3>

        <p>
          • Brattiness is a factory feature, not a defect.<br>
          • The girlfriend requires regular affection to operate.<br>
          • Repairs may require hugs, snacks or quality time.<br>
          • No refunds. Emotional support is available instead.
        </p>
      </div>

    </div>

    <div class="card">
      <h3>Fine Print &amp; Archive</h3>

      <p>
        Every product has a history.
        Some records are filed under a different department,
        and some are meant to be discovered much later.
      </p>

      <button class="btn outline" id="clause12">
        Access Classified File 🔒
      </button>
    </div>

    <div class="notice">
      Important: For genuine disagreements, feelings and
      boundaries are taken seriously. Neither partner owes
      physical affection as a penalty or fee.
    </div>
  `,


  /* ---------------------------------------
     9.4 WARRANTY DIAGNOSTICS
  --------------------------------------- */

  diagnostic: () => `
    <h1 class="section-title">
      Warranty Diagnostics 🛠️
    </h1>

    <p class="muted">
      Please select the symptoms observed
      in your girlfriend experience.
    </p>

    <div class="card form">

      <div class="field">
        <label for="fault">
          Select a symptom
        </label>

        <select id="fault">
          <option value="cuddles">
            Insufficient cuddles
          </option>

          <option value="bratty">
            Girlfriend is being bratty
          </option>

          <option value="missing">
            Girlfriend is missing
          </option>

          <option value="battery">
            Girlfriend's affection battery is low
          </option>

          <option value="sad">
            Something made me sad
          </option>
        </select>
      </div>

      <button class="btn" id="diagnose">
        Run Official Diagnostics ✦
      </button>

      <div id="diagnosticResult"></div>

    </div>
  `,


  /* ---------------------------------------
     9.5 COMPLAINT CENTER
  --------------------------------------- */

  complaints: () => `
    <h1 class="section-title">
      Customer Complaint Center ✉
    </h1>

    <p class="muted">
      We apologize for any inconvenience caused by your girlfriend.
      Every complaint gets its own official resolution ticket.
      Screenshot it and show it to your girlfriend
      to claim your remedy ♡
    </p>

    <div class="card form">

      <form id="complaintForm">

        <!-- Complaint category -->
        <div class="field">

          <label for="complaintCategory">
            Complaint category
          </label>

          <select id="complaintCategory" required>

            <optgroup label="Minor inconveniences">
              <option value="kisses">Not enough kisses</option>
              <option value="bratty">Girlfriend is too bratty</option>
              <option value="cute">Girlfriend is illegally cute</option>
            </optgroup>

            <optgroup label="Affection requests">
              <option value="missing">I miss my girlfriend</option>
              <option value="attention">I need more attention</option>
              <option value="date">I want to plan a date</option>
            </optgroup>

            <optgroup label="Important matters">
              <option value="upset">Something made me sad</option>
              <option value="talk">I want to talk about us</option>
              <option value="other">Something else</option>
            </optgroup>

          </select>
        </div>

        <!-- Date planner -->
        <div id="datePlanner" class="date-planner hidden">

          <h3>♡ Date Planning Request</h3>

          <p class="muted">
            Tell me what kind of time together you would love.
            This is a proposal, not an automatic booking.
          </p>

          <div class="grid two compact-grid">

            <div class="field">
              <label for="dateDay">Preferred date</label>
              <input type="date" id="dateDay">
            </div>

            <div class="field">
              <label for="dateTime">Preferred time</label>
              <input type="time" id="dateTime">
            </div>

          </div>

          <div class="field">

            <label for="dateActivity">
              What shall we do?
            </label>

            <select id="dateActivity">
              <option value="Cozy night in">
                Cozy night in 🏠
              </option>

              <option value="Cuddles and kisses">
                Cuddles & kisses 💋
              </option>

              <option value="Private time together">
                Private time together ❤️
              </option>

              <option value="Stay-in-bed date">
                Stay-in-bed date 🛏️
              </option>

              <option value="Movie and cuddles">
                Movie & cuddles 🎬
              </option>

              <option value="Boyfriend's choice">
                Boyfriend's choice 👑
              </option>

              <option value="Custom">
                Something else (describe below)
              </option>
            </select>
          </div>

          <div class="field">

            <label for="datePlace">
              Place or meeting point (optional)
            </label>

            <input
              id="datePlace"
              maxlength="160"
              placeholder="Your place, my place, or somewhere else..."
            >
          </div>

          <div class="field">

            <label for="datePlan">
              Your dream plan / special requests
            </label>

            <textarea
              id="datePlan"
              rows="3"
              maxlength="1200"
              placeholder="Tell me your ideal evening, any special requests, or a surprise..."
            ></textarea>
          </div>

          <p class="fine">
            Your girlfriend will need to confirm the date and plan.
            No reservation is made here.
          </p>

        </div>

        <!-- Complaint details -->
        <div class="field">

          <label for="complaintDetail">
            Tell us what happened
          </label>

          <textarea
            id="complaintDetail"
            rows="5"
            maxlength="2000"
            placeholder="Dear Girlfriend Support Department..."
          ></textarea>
        </div>

        <!-- Email notification -->
        <div id="emailOption" class="notice hidden">

          <label>
            <input
              type="checkbox"
              id="sendEmail"
              style="width:auto;margin-right:7px"
            >

            Send this request to my girlfriend by email
            (required for date plans)
          </label>

          <p class="fine">
            Email is sent through FormSubmit only after you confirm.
            No live-response guarantee.
          </p>
        </div>

        <button
          class="btn"
          id="submitComplaint"
          type="submit"
        >
          Submit Complaint ♡
        </button>

      </form>

      <div id="complaintResult"></div>

    </div>
  `,


  /* ---------------------------------------
     9.6 COMPENSATION CENTER
  --------------------------------------- */

  rewards: () => `
    <h1 class="section-title">
      Compensation Center 🎁
    </h1>

    <p class="muted">
      Private Boyfriend Benefits™ —
      little invitations to spend quality time together,
      your way.
    </p>

    <div class="card">

      <div class="reward" id="mysteryReward">

        <div class="emoji">🎁</div>

        <h3>Personalized Benefit Selection</h3>

        <p>
          Unlock a cozy, private benefit designed just for us.
          All plans are invitations, never obligations.
        </p>
      </div>

      <div class="actions">
        <button class="btn" id="revealReward">
          Find My Benefit ✨
        </button>
      </div>

    </div>

    <h2 class="section-title">
      My Voucher Wallet
    </h2>

    <div id="rewardWallet"></div>
  `,


  /* ---------------------------------------
     9.7 TICKET HISTORY
  --------------------------------------- */

  history: () => `
    <h1 class="section-title">
      Ticket History ◷
    </h1>

    <p class="muted">
      Records saved in this browser only.
      They do not sync between devices.
    </p>

    <div class="actions">
      <button class="btn outline" id="clearHistory">
        Clear Local History
      </button>
    </div>

    <div id="ticketList"></div>
  `

};


/* =========================================
   10. PAGE NAVIGATION
========================================= */

const titles = {
  home: "Customer Dashboard",
  warranty: "Warranty Certificate",
  terms: "Warranty Policy",
  diagnostic: "Warranty Diagnostics",
  complaints: "Complaint Center",
  rewards: "Compensation Center",
  history: "Ticket History"
};


function go(destination) {
  if (!views[destination]) return;

  current = destination;

  page.innerHTML = views[destination]();

  $("#breadcrumb").textContent = titles[destination];

  document.querySelectorAll(".nav").forEach(nav => {
    nav.classList.toggle(
      "active",
      nav.dataset.page === destination
    );
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

  if (destination === "history") {
    renderHistory();
  }

  if (destination === "rewards") {
    renderRewards();
  }

  if (destination === "complaints") {
    updateEmailOption();
  }
}


/* =========================================
   11. COMPLAINT FORM SETTINGS
========================================= */

function updateEmailOption() {
  const category = $("#complaintCategory");

  if (!category) return;

  const planner = $("#datePlanner");

  if (planner) {
    planner.classList.toggle(
      "hidden",
      category.value !== "date"
    );
  }

  const serious = [
    "missing",
    "attention",
    "date",
    "upset",
    "talk",
    "other"
  ].includes(category.value);

  $("#emailOption").classList.toggle(
    "hidden",
    !serious
  );

  if (!serious) {
    $("#sendEmail").checked = false;
  } else {
    $("#sendEmail").checked = [
      "upset",
      "talk",
      "other",
      "date"
    ].includes(category.value);
  }

  if (category.value === "date") {
    $("#sendEmail").checked = true;
    $("#sendEmail").disabled = true;
  } else {
    $("#sendEmail").disabled = false;
  }
}


/* =========================================
   12. WARRANTY DIAGNOSTICS DATA
========================================= */

const diagnostics = {

  cuddles: [
    "APPROVED ♡",
    "Emergency cuddle session authorized. Please arrange an appointment with your girlfriend.",
    "One Emergency Cuddle"
  ],

  bratty: [
    "NO DEFECT FOUND",
    "Brattiness is a standard feature of the Quanh model. This behavior is working as intended.",
    "One Negotiation Kiss"
  ],

  missing: [
    "REUNION RECOMMENDED",
    "Long-distance affection issue detected. Please arrange quality time together.",
    "One Date Request"
  ],

  battery: [
    "CHARGING REQUIRED",
    "Recommended maintenance: rest, food, a gentle hug and quality time.",
    "One Gentle Hug"
  ],

  sad: [
    "PERSONAL ATTENTION REQUIRED",
    "Your feelings matter. Please use the Complaint Center to send a private message. No jokes for this one.",
    null
  ]

};


/* =========================================
   13. TICKET HISTORY RENDERING
========================================= */

function renderHistory() {
  const tickets = read(STORAGE);

  $("#ticketList").innerHTML = tickets.length
    ? tickets.map(ticket => `
        <div class="ticket">

          <small>
            ${escapeHTML(ticket.id)} ·
            ${escapeHTML(ticket.date)} ·
            ${escapeHTML(ticket.status)}
          </small>

          <h4>${escapeHTML(ticket.category)}</h4>

          <p>
            ${escapeHTML(
              ticket.detail || "No additional details"
            )}
          </p>

          <button
            class="btn secondary"
            data-ticket="${escapeHTML(ticket.id)}"
          >
            View & Screenshot Resolution 🎟️
          </button>

        </div>
      `).join("")
    : `
      <div class="card">
        <p>
          No complaints on record.
          An exceptionally satisfied customer, perhaps? 👀
        </p>
      </div>
    `;
}


/* =========================================
   14. REWARD WALLET RENDERING
========================================= */

function renderRewards() {
  const rewards = read(REWARDS);

  $("#rewardWallet").innerHTML = rewards.length
    ? rewards.map(reward => `
        <div class="ticket">

          <h4>
            🎟️ ${escapeHTML(reward.title)}
          </h4>

          <small>
            ${
              reward.redeemed
  ? (
      reward.title === ARCHIVE_REWARD
        ? "💋 Pending Girlfriend Approval · request sent for review"
        : "Request submitted · awaiting confirmation"
    )
  : "Available"
            }
            · ${escapeHTML(reward.id)}
          </small>

          ${
            reward.redeemed
              ? ""
              : `
                <div class="actions">
                  <button
                    class="btn secondary"
                    data-redeem="${escapeHTML(reward.id)}"
                  >
                    Request Redemption
                  </button>
                </div>
              `
          }

        </div>
      `).join("")
    : `
      <div class="card">
        <p>
          No vouchers yet.
          Try running a warranty diagnostic!
        </p>
      </div>
    `;
}


/* =========================================
   15. FORM SUBMIT EMAIL SERVICE
   Standard HTML Form POST
========================================= */

/*
  Uses the same submission method as
  Love Post Office.

  No AJAX.
  No fetch().
  No JSON response handling.

  The browser navigates to FormSubmit.
*/

function sendViaFormSubmit(category, detail, id) {

  if (!CONFIG.recipientEmail) {
    throw new Error(
      "Recipient email is not configured."
    );
  }

  /* ---------------------------------------
     15.1 CREATE HTML FORM
  --------------------------------------- */

  const form = document.createElement("form");

  form.action =
    "https://formsubmit.co/" +
    CONFIG.recipientEmail;

  form.method = "POST";
  form.target = "_self";

  form.style.display = "none";


  /* ---------------------------------------
     15.2 ADD HIDDEN FIELD HELPER
  --------------------------------------- */

  function addField(name, value) {
    const input = document.createElement("input");

    input.type = "hidden";
    input.name = name;
    input.value = String(value);

    form.appendChild(input);
  }


  /* ---------------------------------------
     15.3 FORM SUBMIT SETTINGS
  --------------------------------------- */

  addField(
    "_subject",
    "💌 GF Warranty — " + category + " — " + id
  );

  addField("_captcha", "false");

  addField(
  "_next",
  "https://quinnann2010.github.io/QAloveJM/thank-you.html"
);

  addField("_template", "table");



  /*
    IMPORTANT:

    No _next during local testing.

    FormSubmit will show its own
    success page after submission.
  */


  /* ---------------------------------------
     15.4 EMAIL INFORMATION
  --------------------------------------- */

  addField(
    "From",
    "Jarod — Girlfriend Warranty & Support"
  );

  addField("Ticket ID", id);

  addField("Category", category);

  addField(
    "message",
    detail || "(No additional details)"
  );


  /* ---------------------------------------
     15.5 SUBMIT HTML FORM
  --------------------------------------- */

  document.body.appendChild(form);

  HTMLFormElement.prototype.submit.call(form);
}


/* =========================================
   16. SECRET EASTER EGGS — M12
========================================= */

/* =========================================
   16. SECRET EASTER EGG — M02 ↔ M03
========================================= */


/* -----------------------------------------
   16.1 CHECK UNLOCK STATUS
----------------------------------------- */

function isArchiveUnlocked() {
  try {
    return (
      localStorage.getItem(ARCHIVE_UNLOCKED) === "true"
    );
  } catch {
    return false;
  }
}


/* -----------------------------------------
   16.2 DISPLAY CLASSIFIED ARCHIVE
----------------------------------------- */

function classified() {

  // Nếu hồ sơ đã được mở khóa
  if (isArchiveUnlocked()) {

    modal(`
      <div class="archive-panel archive-success">

        <div class="archive-symbol">💌</div>

        <p class="eyebrow">
          GF CARE™ · CLASSIFIED BENEFIT
        </p>

        <h2>Archive #003 — Unlocked ♡</h2>

        <span class="archive-status unlocked">
          ✓ ACCESS GRANTED
        </span>

        <p>
          Congratulations, Mr. Mendes!
          Your loyalty has unlocked a benefit
          that wasn't included in your original warranty.
        </p>

        <div class="archive-prize">

  <div class="archive-symbol">😈💋</div>

  <h3>One Naughty Wish</h3>

  <p>
    Congratulations, Mr. Mendes!
  </p>

  <p>
    You've unlocked ONE naughty wish
    to request from your girlfriend.
  </p>

  <p>
    Sweet, spicy, or a little shameless...
    Be creative and make her blush. ♡
  </p>

  <p class="fine">
    Subject to girlfriend approval,
    negotiation, and mutual consent.
    Valid for one wish only.
    No expiration date. 💋
  </p>

</div>

        <button
          class="btn"
          type="button"
          data-go="rewards"
        >
          View My Voucher Wallet ♡
        </button>

      </div>
    `);

    return;
  }


  // Nếu hồ sơ vẫn đang bị khóa
  modal(`
    <div class="archive-panel">

      <div class="archive-symbol">🔒</div>

      <p class="eyebrow">
        GF CARE™ · CONFIDENTIAL ARCHIVE
      </p>

      <h2>File #003 — Access Restricted</h2>

      <span class="archive-status">
        ● AUTHORIZATION PENDING
      </span>

      <p class="muted">
        This record requires credentials
        from another department.
        Authorization has not yet been issued.
      </p>

      <form
        id="archiveUnlockForm"
        class="archive-form"
      >

        <label for="archiveCode">
          Authorization code
        </label>

        <div class="archive-input-row">

          <input
            id="archiveCode"
            type="text"
            autocomplete="off"
            autocapitalize="characters"
            spellcheck="false"
            maxlength="40"
            placeholder="Enter access code"
            required
          >

          <button
            class="btn"
            type="submit"
          >
            Unlock ♡
          </button>

        </div>

        <p
          id="archiveFeedback"
          class="archive-feedback"
          role="status"
          aria-live="polite"
        ></p>

      </form>

      <p class="fine">
        Some things are worth coming back for. ♡
      </p>

    </div>
  `);

  $("#archiveCode")?.focus();
}


/* -----------------------------------------
   16.3 UNLOCK ARCHIVE
----------------------------------------- */

function unlockArchive(event) {

  event.preventDefault();

  const code =
    $("#archiveCode")?.value.trim().toUpperCase() || "";

  // Incorrect password
  if (code !== ARCHIVE_CODE) {

    const feedback = $("#archiveFeedback");

    feedback.textContent =
      "Access denied. Your girlfriend's secrets " +
      "aren't that easy to steal. ♡";

    $("#archiveCode")?.classList.add("archive-error");

    return;
  }


  // Correct password
  try {
    localStorage.setItem(
      ARCHIVE_UNLOCKED,
      "true"
    );
  } catch {
    // Continue even if browser storage is unavailable.
  }


  // Add the secret voucher to the wallet
  grantReward(ARCHIVE_REWARD);


  // Celebration animation
  hearts();


  // Display unlocked archive
  classified();
}


function audit() {
  modal(`
    <div style="font-size:44px">🕵️‍♀️</div>

    <p class="eyebrow">
      Confidential Audit Department
    </p>

    <h2>CASE CLOSED</h2>

    <p>
      Allegations: Excessive cuteness,
      unauthorized teasing and suspicious
      levels of affection.
    </p>

    <h3>
      Verdict: GIRLFRIEND INNOCENT ♡
    </h3>

    <p class="fine">
      Independent investigation conducted
      by the girlfriend herself.
    </p>
  `);
}


/* =========================================
   17. CLICK EVENT HANDLERS
========================================= */

document.addEventListener("click", event => {

  /* ---------------------------------------
     17.1 PAGE NAVIGATION
  --------------------------------------- */

  const navigation = event.target.closest(
    "[data-page], [data-go]"
  );

  if (navigation) {

  // Close popup before navigating
  $("#modal").classList.add("hidden");

  go(
    navigation.dataset.page ||
    navigation.dataset.go
  );

  return;
}


  /* ---------------------------------------
     17.2 CLOSE MODAL
  --------------------------------------- */

  if (
    event.target.id === "closeModal" ||
    event.target.id === "modal"
  ) {
    $("#modal").classList.add("hidden");
    return;
  }


  /* ---------------------------------------
     17.3 SECRET ARCHIVE
  --------------------------------------- */

  if (
    event.target.id === "secret" ||
    event.target.id === "clause12"
  ) {
    classified();
    return;
  }


  /* ---------------------------------------
     17.4 AUDIT REPORT
  --------------------------------------- */

  if (event.target.id === "audit") {
    audit();
    return;
  }


  /* ---------------------------------------
     17.5 PRINT WARRANTY CARD
  --------------------------------------- */

  if (event.target.id === "printCard") {
    window.print();
    return;
  }


  /* ---------------------------------------
     17.6 WARRANTY DIAGNOSTICS
  --------------------------------------- */

  if (event.target.id === "diagnose") {

    const [status, message, reward] =
      diagnostics[$("#fault").value];

    $("#diagnosticResult").innerHTML = `
      <div class="result">

        <strong>${status}</strong>

        <p>${message}</p>

        ${
          reward
            ? `
              <p class="fine">
                A compensation voucher has been added
                to your wallet.
              </p>
            `
            : `
              <button
                class="btn secondary"
                data-go="complaints"
              >
                Contact Girlfriend Support →
              </button>
            `
        }

      </div>
    `;

    if (reward) {
      grantReward(reward);
      hearts();
    }

    return;
  }


  /* ---------------------------------------
     17.7 MYSTERY VOUCHER
  --------------------------------------- */

  if (event.target.id === "revealReward") {

    const options = [
      "Unlimited Cuddle Pass 🧸",
      "Kiss Me Whenever Pass 💋",
      "Stay-in-Bed Date 🛏️",
      "Private Time Together ❤️",
      "Boyfriend’s Choice 👑",
      "Girlfriend’s Special Surprise 🎀",
      "No-Going-Out Date 🏠"
    ];

    const reward =
      options[Math.floor(Math.random() * options.length)];

    grantReward(reward);

    $("#mysteryReward").innerHTML = `
      <div class="emoji">💝</div>

      <h3>${escapeHTML(reward)}</h3>

      <p>
        An invitation, not an obligation.
        Redeemable by mutual agreement.
        No expiration date ♡
      </p>
    `;

    renderRewards();
    hearts();

    return;
  }


  /* ---------------------------------------
     17.8 REDEEM VOUCHER
  --------------------------------------- */

  const redeemButton = event.target.closest(
    "[data-redeem]"
  );

  if (redeemButton) {

    const id = redeemButton.dataset.redeem;

    const item = read(REWARDS).find(
      reward => reward.id === id
    );

    /* =========================================
   SPECIAL VOUCHER — ONE NAUGHTY WISH
========================================= */

if (
  item &&
  !item.redeemed &&
  item.title === ARCHIVE_REWARD
) {

  modal(`
    <div class="naughty-wish-panel">

      <div class="naughty-wish-icon">
        😈💋
      </div>

      <p class="eyebrow">
        GF CARE™ · CLASSIFIED REDEMPTION
      </p>

      <h2>
        One Naughty Wish ♡
      </h2>

      <p>
        <strong>
          So, Mr. Mendes... 👀
        </strong>
      </p>

      <p class="muted">
        What naughty little wish
        do you have in mind?

        <br>

        Don't be shy.
        Your girlfriend is listening. 💋
      </p>

      <form
        id="naughtyWishForm"
        data-voucher="${escapeHTML(id)}"
      >

        <div class="field">

          <label for="naughtyWishText">
            Your secret wish ♡
          </label>

          <textarea
            id="naughtyWishText"
            rows="5"
            maxlength="1500"
            placeholder="Dear girlfriend, my one naughty wish is..."
            required
          ></textarea>

        </div>

        <p class="fine">
          One request only · No expiration date.

          <br>

          Your girlfriend may approve,
          negotiate, or make a counteroffer.

          <br>

          Mutual consent is always required. ♡
        </p>

        <button
          class="btn"
          type="submit"
          id="sendNaughtyWish"
        >
          Send My Naughty Wish 💌
        </button>

        <p
          class="naughty-wish-feedback"
          id="naughtyWishFeedback"
          role="status"
        ></p>

      </form>

    </div>
  `);

  return;
}

    if (item && !item.redeemed) {
      modal(`
        <h2>Redeem a Private Benefit ♡</h2>

        <p>
          <strong>${escapeHTML(item.title)}</strong>
        </p>

        <p class="muted">
          Tell me when and how you'd like to spend
          time together. This is a request,
          not a confirmed plan.
        </p>

        <form
          id="redeemForm"
          data-voucher="${escapeHTML(id)}"
        >

          <div class="grid two compact-grid">

            <div class="field">
              <label for="redeemDay">
                Preferred date
              </label>

              <input
                id="redeemDay"
                type="date"
                required
              >
            </div>

            <div class="field">
              <label for="redeemTime">
                Preferred time
              </label>

              <input
                id="redeemTime"
                type="time"
                required
              >
            </div>

          </div>

          <div class="field">
            <label for="redeemPlace">
              Where?
            </label>

            <select id="redeemPlace">
              <option>Your place</option>
              <option>My place</option>
              <option>To be decided</option>
              <option>Other</option>
            </select>
          </div>

          <div class="field">
            <label for="redeemPlan">
              What would you like us to do?
            </label>

            <textarea
              id="redeemPlan"
              rows="3"
              maxlength="1500"
              placeholder="Your ideal plan, little details, or special requests..."
            ></textarea>
          </div>

          <p class="fine">
            Every activity, including intimacy,
            depends on what we both want and feel
            comfortable with at the time.
          </p>

          <button
            class="btn"
            type="submit"
            id="sendRedemption"
          >
            Send My Request 💌
          </button>

          <div id="redeemResult"></div>

        </form>
      `);
    }

    return;
  }


  /* ---------------------------------------
     17.9 VIEW RESOLUTION TICKET
  --------------------------------------- */

  const ticketButton = event.target.closest(
    "[data-ticket]"
  );

  if (ticketButton) {

    const ticket = read(STORAGE).find(
      item => item.id === ticketButton.dataset.ticket
    );

    if (ticket) {
      modal(
        ticketCard(ticket) +
        `
          <button
            class="btn outline"
            id="printTicket"
          >
            Print / Save as PDF
          </button>
        `
      );
    }

    return;
  }


  /* ---------------------------------------
     17.10 PRINT RESOLUTION TICKET
  --------------------------------------- */

  if (event.target.id === "printTicket") {
    window.print();
    return;
  }


  /* ---------------------------------------
     17.11 CLEAR TICKET HISTORY
  --------------------------------------- */

  if (event.target.id === "clearHistory") {

    if (confirm("Clear locally saved ticket history?")) {
      save(STORAGE, []);
      renderHistory();
      toast("Local ticket history cleared.");
    }

    return;
  }

});


/* =========================================
   18. COMPLAINT CATEGORY CHANGE
========================================= */

document.addEventListener("change", event => {

  if (event.target.id === "complaintCategory") {
    updateEmailOption();
  }

});

/* =========================================
   18.1 SECRET ARCHIVE UNLOCK SUBMISSION
========================================= */

document.addEventListener("submit", event => {

  if (event.target.id === "archiveUnlockForm") {
    unlockArchive(event);
  }

});

/* =========================================
   18.2 ONE NAUGHTY WISH SUBMISSION
========================================= */

document.addEventListener("submit", event => {

  if (event.target.id !== "naughtyWishForm") {
    return;
  }

  event.preventDefault();

  /* ---------------------------------------
     1. COLLECT FORM DATA
  --------------------------------------- */

  const form = event.target;

  const id = form.dataset.voucher;

  const wish = $("#naughtyWishText").value.trim();

  const feedback = $("#naughtyWishFeedback");

  const button = $("#sendNaughtyWish");

  const rewards = read(REWARDS);

  const voucher = rewards.find(
    item => item.id === id
  );


  /* ---------------------------------------
     2. VALIDATE VOUCHER
  --------------------------------------- */

  if (
    !voucher ||
    voucher.title !== ARCHIVE_REWARD ||
    voucher.redeemed
  ) {

    feedback.textContent =
      "This voucher is no longer available. ♡";

    return;
  }


  /* ---------------------------------------
     3. VALIDATE WISH
  --------------------------------------- */

  if (!wish) {

    feedback.textContent =
      "Tell your girlfriend your little wish first. 💋";

    return;
  }


  /* ---------------------------------------
     4. CHECK EMAIL CONFIGURATION
  --------------------------------------- */

  if (!CONFIG.recipientEmail) {

    feedback.textContent =
      "Email isn't configured. Your wish hasn't been sent.";

    return;
  }


  /* ---------------------------------------
     5. PREPARE EMAIL CONTENT
  --------------------------------------- */

  const message = [

    "ONE NAUGHTY WISH — PRIVATE REQUEST 😈💋",

    "Voucher: " + voucher.title,

    "Voucher ID: " + id,

    "",

    "Jarod's naughty wish:",

    wish,

    "",

    "Status: Pending Girlfriend Approval",

    "Girlfriend may approve, negotiate, or counteroffer.",

    "Mutual consent required. Not automatically redeemed.",

    "",

    "Sent through Loveverse ♡"

  ].join("\n");


  /* ---------------------------------------
     6. UPDATE BUTTON
  --------------------------------------- */

  button.disabled = true;

  button.textContent =
    "Sending your little secret... 💌";

  feedback.textContent =
    "Preparing your private request...";


  /* ---------------------------------------
     7. SAVE PENDING STATUS
  --------------------------------------- */

  voucher.redeemed = true;

  voucher.status = "pending_approval";

  voucher.requestedAt = new Date().toISOString();

  save(REWARDS, rewards);


  /* ---------------------------------------
     8. SEND EMAIL VIA FORMSUBMIT
  --------------------------------------- */

  try {

    sendViaFormSubmit(
      "One Naughty Wish 😈💋",
      message,
      id
    );

  } catch (error) {

    /* Restore voucher if submission fails */

    voucher.redeemed = false;

    delete voucher.status;

    delete voucher.requestedAt;

    save(REWARDS, rewards);


    feedback.textContent =
      "Couldn't send your wish: " + error.message;

    button.disabled = false;

    button.textContent =
      "Send My Naughty Wish 💌";
  }

});


/* =========================================
   19. VOUCHER REDEMPTION SUBMISSION
========================================= */

document.addEventListener("submit", event => {

  if (event.target.id !== "redeemForm") return;

  event.preventDefault();

  const form = event.target;
  const id = form.dataset.voucher;

  const voucher = read(REWARDS).find(
    item => item.id === id
  );

  if (!voucher || voucher.redeemed) return;


  /* ---------------------------------------
     19.1 COLLECT FORM DATA
  --------------------------------------- */

  const day = $("#redeemDay").value;
  const time = $("#redeemTime").value;
  const place = $("#redeemPlace").value;
  const plan = $("#redeemPlan").value.trim();

  const result = $("#redeemResult");


  /* ---------------------------------------
     19.2 VALIDATE DATE
  --------------------------------------- */

  if (!day || !time) {
    result.textContent =
      "Please choose a date and time ♡";

    return;
  }

  if (new Date(day + "T" + time) <= new Date()) {
    result.textContent =
      "Please select a future date and time ♡";

    return;
  }


  /* ---------------------------------------
     19.3 CHECK EMAIL CONFIGURATION
  --------------------------------------- */

  if (!CONFIG.recipientEmail) {
    result.textContent =
      "Email is not configured. Nothing has been submitted.";

    return;
  }


  /* ---------------------------------------
     19.4 PREPARE EMAIL
  --------------------------------------- */

  const message = `
VOUCHER REDEMPTION REQUEST

Voucher: ${voucher.title}
Voucher ID: ${id}

Preferred date: ${day}
Preferred time: ${time}
Location: ${place}

Requested plan:
${plan || "To be decided"}

Status:
Proposal only — awaiting mutual confirmation.

Sent by Jarod through Loveverse ♡
  `.trim();


  /* ---------------------------------------
     19.5 SUBMIT REQUEST
  --------------------------------------- */

  const button = $("#sendRedemption");

  button.disabled = true;
  button.textContent = "Sending request... 💌";

  try {

    /*
      Save the request before navigation.

      This records an attempted submission,
      not confirmed email delivery.
    */

    const rewards = read(REWARDS);

    const currentReward = rewards.find(
      item => item.id === id
    );

    if (currentReward) {
      currentReward.redeemed = true;
      currentReward.requestedAt =
        new Date().toISOString();

      save(REWARDS, rewards);
    }

    /*
      Standard HTML form submission.
      Browser navigates to FormSubmit.
    */

    sendViaFormSubmit(
      "Voucher redemption: " + voucher.title,
      message,
      id
    );

  } catch (error) {

    /*
      Restore voucher if the form could
      not even be submitted.
    */

    const rewards = read(REWARDS);

    const currentReward = rewards.find(
      item => item.id === id
    );

    if (currentReward) {
      currentReward.redeemed = false;
      delete currentReward.requestedAt;

      save(REWARDS, rewards);
    }

    result.textContent =
      "Could not submit request: " + error.message;

    button.disabled = false;
    button.textContent = "Send My Request 💌";
  }

});


/* =========================================
   20. COMPLAINT FORM SUBMISSION
========================================= */

document.addEventListener("submit", event => {

  if (event.target.id !== "complaintForm") return;

  event.preventDefault();


  /* ---------------------------------------
     20.1 COLLECT COMPLAINT DATA
  --------------------------------------- */

  const categoryKey = $("#complaintCategory").value;

  const category =
    $("#complaintCategory").selectedOptions[0].textContent.trim();

  let detail = $("#complaintDetail").value.trim();


  /* ---------------------------------------
     20.2 DATE PLANNING DATA
  --------------------------------------- */

  if (categoryKey === "date") {

    const day = $("#dateDay").value;
    const time = $("#dateTime").value;
    const activity = $("#dateActivity").value;
    const place = $("#datePlace").value.trim();
    const plan = $("#datePlan").value.trim();

    if (!day || !time) {
      $("#complaintResult").innerHTML = `
        <div class="result">
          Please choose a preferred date and time first. ♡
        </div>
      `;

      return;
    }

    const selected = new Date(day + "T" + time);

    if (selected <= new Date()) {
      $("#complaintResult").innerHTML = `
        <div class="result">
          Please select a future date and time. ♡
        </div>
      `;

      return;
    }

    detail = `
DATE PROPOSAL

Preferred: ${day} at ${time}
Activity: ${activity}
Place: ${place || "To be decided"}
Plan: ${plan || "Flexible"}
Additional note: ${detail || "None"}

Status: Awaiting mutual confirmation.
    `.trim();
  }


  /* ---------------------------------------
     20.3 EMAIL PREFERENCE
  --------------------------------------- */

  const wantsEmail =
    categoryKey === "date" ||
    (
      !$("#emailOption").classList.contains("hidden") &&
      $("#sendEmail").checked
    );

  const response = $("#complaintResult");
  const submit = $("#submitComplaint");
  const remedy = REMEDIES[categoryKey];


  /* ---------------------------------------
     20.4 CHECK EMAIL CONFIGURATION
  --------------------------------------- */

  if (wantsEmail && !CONFIG.recipientEmail) {
    response.innerHTML = `
      <div class="result">
        💌 Email is not configured.
        Nothing has been submitted.
      </div>
    `;

    return;
  }


  /* ---------------------------------------
     20.5 GENERATE RESOLUTION
  --------------------------------------- */

  submit.disabled = true;

  submit.textContent = wantsEmail
    ? "Sending request..."
    : "Preparing your official resolution...";

  try {

    const reference = ticketCode();

    const status = wantsEmail
      ? "Submitted · awaiting confirmation"
      : "Resolution issued";

    /*
      Save ticket for both local
      and email-based complaints.
    */

    const ticket = issueComplaintTicket(
      category,
      detail,
      wantsEmail ? "email" : "local",
      status,
      remedy,
      reference
    );


    /* -------------------------------------
       20.6 SAVE DATE REQUEST
    ------------------------------------- */

    if (categoryKey === "date") {

      const requests = read(DATE_REQUESTS);

      requests.unshift({
        ticketId: ticket.id,
        detail,
        date: new Date().toISOString(),
        emailed: false,
        submissionAttempted: wantsEmail
      });

      save(DATE_REQUESTS, requests);
    }


    /* -------------------------------------
       20.7 ISSUE VOUCHER
    ------------------------------------- */

    if (remedy.voucher) {
      grantReward(remedy.voucher);
    }


    /* -------------------------------------
       20.8 DISPLAY RESOLUTION TICKET
    ------------------------------------- */

    response.innerHTML = `
      <div class="result">

        <strong>
          ${
            wantsEmail
              ? "REQUEST PREPARED ♡"
              : "YOUR RESOLUTION IS READY ♡"
          }
        </strong>

        <p>
          ${
            wantsEmail
              ? "Your request has been prepared for FormSubmit. Email delivery is not yet confirmed."
              : "Your ticket is saved on this device."
          }
        </p>

      </div>
    ` + ticketCard(ticket);


    /* -------------------------------------
       20.9 ANIMATION
    ------------------------------------- */

    if (!["upset", "talk", "other"].includes(categoryKey)) {
      hearts();
    }


    /* -------------------------------------
       20.10 SEND EMAIL IF REQUESTED
    ------------------------------------- */

    if (wantsEmail) {

      /*
        Native POST navigates away.

        Ticket is already saved locally.
        The user can return to Ticket History.
      */

      sendViaFormSubmit(
        category,
        detail,
        reference
      );

      return;
    }


    /* -------------------------------------
       20.11 RESET LOCAL COMPLAINT FORM
    ------------------------------------- */

    event.target.reset();

    updateEmailOption();

  } catch (error) {

    response.innerHTML = `
      <div class="result">

        <strong>Request could not be completed</strong>

        <p>${escapeHTML(error.message)}</p>

        <p class="fine">
          Please check the request and try again.
        </p>

      </div>
    `;

  } finally {

    submit.disabled = false;
    submit.textContent = "Submit Complaint ♡";
  }

});


/* =========================================
   21. KEYBOARD SHORTCUTS
========================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {
    $("#modal").classList.add("hidden");
  }

});


/* =========================================
   22. INITIALIZE WEBSITE
========================================= */

go("home");
