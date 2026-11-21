
"use strict";

// ============================================================
// M03 — GIRLFRIEND VENDING MACHINE
// Three Months of Us ♡
// ============================================================

// ------------------------------------------------------------
// 1. STORAGE KEYS
// ------------------------------------------------------------

const KEY = "loveverse_m03_game_v2";
const OLD_KEY = "loveverse_m03_game_v1";

const WALLET_KEY = "loveverse_m02_rewards_v1";
const M02_ARCHIVE_KEY = "loveverse_m02_archive003_unlocked_v1";

const LETTER_KEY = "loveverse_m03_anniversary_letter_v1";
const LETTER_ID = "m03-three-month-letter-2027";

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];


// ------------------------------------------------------------
// 2. ANNIVERSARY LETTER
// ------------------------------------------------------------

const ANNIVERSARY_LETTER = {
  id: LETTER_ID,
  date: "2027-01-20",
  title: "Three Months of Us ♡",
  emoji: "💌",
  photo: "",
  story: "A little love letter from your little IT girlfriend.",
  detail: "20 January 2027 · Almost 100 days of us",

  paragraphs: [
    "My dearest Jarod,",

    "Three months. It sounds like such a small number, doesn't it? Just three little months. And yet, somehow, you've already become part of so many of my favourite memories.",

    "I still think about the girl who was getting ready for our first date, with absolutely no idea that one ordinary October afternoon would turn into this whole little universe of ours. If I could whisper something to her, I'd say: take your time, smile, and remember every second. You're about to meet someone who will make a lot of ordinary days feel special.",

    "I love our tiny adventures, our silly conversations, the meals we share, and the moments when we don't even need to do anything extraordinary. I love discovering new things about you. And I love that, out of all the people in this enormous world, somehow we found each other in Toulouse.",

    "You know I'm an IT girl, so I could pretend this website is made of JavaScript, CSS, and a suspicious number of bugs. But the truth is, every little button, every ridiculous game, and every pink heart is just another way of saying something I'm sometimes too shy to say out loud: you matter to me. A lot.",

    "We're almost at our first hundred days, too. I can't promise that every day will be perfect, or that we'll always agree on everything. But I hope we keep being gentle with each other, laughing at the little things, making new memories, and choosing to understand one another as we go.",

    "If love were a vending machine, I'd probably break it. Because there aren't enough coins, coupons, or secret rewards in the whole Loveverse to measure how much care I put into loving you.",

    "Happy three months, my favourite human. Thank you for being part of my story. I hope there are so many more chapters waiting for us — some romantic, some ridiculous, and all beautifully ours.",

    "With all the little hearts I couldn't fit into this website,",

    "Your little IT girlfriend, Quỳnh Anh ♡"
  ]
};


// ------------------------------------------------------------
// 3. SHOP PRODUCTS
// ------------------------------------------------------------

const PRODUCTS = [
  {
    id: "movie",
    icon: "🎬",
    title: "Movie Night, Your Rules",
    price: 35,
    desc: "You pick the movie and we make a cozy cinema at home."
  },
  {
    id: "workshop",
    icon: "🎨",
    title: "Creative Date Workshop",
    price: 50,
    desc: "Let's try pottery, painting, candle-making or something completely new."
  },
  {
    id: "roulette",
    icon: "🎡",
    title: "Mystery Date Roulette",
    price: 60,
    desc: "Spin for a surprise activity neither of us has tried together."
  },
  {
    id: "picnic",
    icon: "🧺",
    title: "Secret Picnic Adventure",
    price: 65,
    desc: "A picnic in a pretty spot, with a little surprise planned by me."
  },
  {
    id: "spoil",
    icon: "👑",
    title: "Boyfriend Spoil Day",
    price: 70,
    desc: "You are the main character for an entire date."
  },
  {
    id: "afterdark",
    icon: "💌",
    title: "After Dark Envelope",
    price: 80,
    desc: "A private, playful surprise for just the two of us."
  },
  {
    id: "daytrip",
    icon: "🚆",
    title: "New City Quest",
    price: 95,
    desc: "Pick a nearby town or city and let's explore it together."
  },
  {
    id: "handmade",
    icon: "🧶",
    title: "Make Something Together",
    price: 100,
    desc: "One shared DIY project and a little keepsake of our date."
  },
  {
    id: "travel",
    icon: "🧳",
    title: "Our Little Getaway",
    price: 160,
    desc: "A future trip planned together, with destination and budget agreed by both of us."
  }
];


// ------------------------------------------------------------
// 4. MYSTERY BOX SURPRISES
// ------------------------------------------------------------

const BOX_SURPRISES = [
  {
    id: "breakfast",
    icon: "🥞",
    title: "Breakfast Date Pass",
    desc: "Let's make a special breakfast together."
  },
  {
    id: "stargazing",
    icon: "🌙",
    title: "Stargazing Date",
    desc: "An evening outside, just us and the sky."
  },
  {
    id: "photobooth",
    icon: "📸",
    title: "Photobooth Memory",
    desc: "A photobooth date and a tiny souvenir to keep."
  },
  {
    id: "baking",
    icon: "🍪",
    title: "Bake Something New",
    desc: "We choose a recipe we've never made together."
  },
  {
    id: "museum",
    icon: "🗺️",
    title: "Surprise Discovery Date",
    desc: "A surprise museum, exhibition or unusual place to explore."
  },
  {
    id: "games",
    icon: "🎲",
    title: "Couple Challenge Night",
    desc: "A night of silly games and tiny challenges."
  }
];


// ------------------------------------------------------------
// 5. LEGENDARY REWARD
// ------------------------------------------------------------

const LEGEND = {
  id: "golden",
  icon: "💍",
  title: "The One-Day Wife Experience",
  price: 250,
  desc: "One playful day pretending we're already married: a cozy morning, cooking together, dreaming up our future home, and ending with a special date. Just for fun, with no real-life promises required. Only one exists."
};


// ------------------------------------------------------------
// 6. MISSIONS
// ------------------------------------------------------------

const MISSIONS = [
  {
    id: "catch",
    icon: "💗",
    title: "Catch My Heart",
    desc: "Catch hearts, dodge heartbreak",
    reward: 30
  },
  {
    id: "factory",
    icon: "📦",
    title: "Love Factory",
    desc: "Sort a chaotic conveyor belt",
    reward: 40
  },
  {
    id: "emergency",
    icon: "🚨",
    title: "Girlfriend Emergency",
    desc: "Choose your own funny ending",
    reward: 45
  },
  {
    id: "meltdown",
    icon: "⚡",
    title: "Vending Machine Meltdown",
    desc: "Repair the overloaded love circuit",
    reward: 65
  }
];


// ============================================================
// 7. GAME SAVE SYSTEM
// ============================================================

function fresh() {
  return {
    coins: 20,
    energy: 0,
    done: [],
    purchased: [],
    archiveClue: false,
    archiveSolved: false,
    boxes: 0,
    plays: {},
    history: [],
    endingSeen: false
  };
}

function load() {
  try {
    const current = JSON.parse(localStorage.getItem(KEY));

    if (current && typeof current === "object") {
      return {
        ...fresh(),
        ...current
      };
    }

    const previous = JSON.parse(localStorage.getItem(OLD_KEY));

    if (previous && typeof previous === "object") {
      return {
        ...fresh(),
        coins: Number(previous.coins) || 20,
        purchased: Array.isArray(previous.purchased)
          ? previous.purchased
          : [],
        archiveClue: !!previous.archiveClue,
        archiveSolved: !!previous.archiveSolved,
        boxes: previous.boxes || 0,
        history: previous.history || []
      };
    }
  } catch (error) {
    console.warn("M03 save could not be loaded:", error);
  }

  return fresh();
}

let s = load();

let active = null;
let round = null;
let timer = null;
let raf = null;

const day = () => new Date().toLocaleDateString("en-CA");

function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch (error) {
    toast("Progress could not be saved.");
  }

  render();
}

function toast(message) {
  const element = $("#toast");

  if (!element) return;

  element.textContent = message;
  element.classList.add("show");

  clearTimeout(toast.timeout);

  toast.timeout = setTimeout(() => {
    element.classList.remove("show");
  }, 2800);
}

function screen(message) {
  const element = $("#machineScreen");

  if (element) {
    element.textContent = message;
  }
}

function plays(id) {
  return s.plays[id]?.day === day()
    ? s.plays[id].n
    : 0;
}

function markPlay(id) {
  s.plays[id] = {
    day: day(),
    n: plays(id) + 1
  };
}

function completed(id) {
  return s.done.includes(id);
}

function unlocked(index) {
  return index === 0 ||
    completed(MISSIONS[index - 1].id);
}

function legendOpen() {
  return (
    s.endingSeen &&
    s.archiveSolved &&
    s.purchased.some(id => id !== "golden")
  );
}


// ============================================================
// 8. LOVE WALLET
// ============================================================

function wallet() {
  try {
    const data = JSON.parse(
      localStorage.getItem(WALLET_KEY) || "[]"
    );

    return Array.isArray(data) ? data : null;
  } catch {
    return null;
  }
}

function buy(item) {
  if (!item) return;

  if (s.purchased.includes(item.id)) {
    return toast("Already in your Wallet ♡");
  }

  if (item.id === "golden" && !legendOpen()) {
    return toast("Complete the secret conditions first ♡");
  }

  if (s.coins < item.price) {
    return toast("Not enough Love Coins ♡");
  }

  const existing = wallet();

  if (!existing) {
    return toast("Wallet unavailable. No coins charged.");
  }

  const rewardId = `M03-${item.id}`;

  if (existing.some(reward => reward.id === rewardId)) {
    return toast("This reward already exists in your Wallet ♡");
  }

  const reward = {
    id: rewardId,
    title: `${item.icon} ${item.title}`,
    description: item.desc,
    redeemed: false,
    source: "M03",
    issuedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(
      WALLET_KEY,
      JSON.stringify([...existing, reward])
    );
  } catch {
    return toast("Wallet save failed. No coins charged.");
  }

  s.coins -= item.price;
  s.purchased.push(item.id);

  save();

  toast(`${item.title} saved to Love Wallet ♡`);
}


// ============================================================
// 9. ANNIVERSARY LETTER & MEMORY DRAWER
// ============================================================

function letterSaved() {
  try {
    const data = JSON.parse(
      localStorage.getItem(LETTER_KEY) || "[]"
    );

    return (
      Array.isArray(data) &&
      data.some(item => item?.id === LETTER_ID)
    );
  } catch {
    return false;
  }
}

function saveAnniversaryLetter() {
  try {
    const data = JSON.parse(
      localStorage.getItem(LETTER_KEY) || "[]"
    );

    if (!Array.isArray(data)) {
      return toast("Memory Drawer data is unavailable ♡");
    }

    if (!data.some(item => item?.id === LETTER_ID)) {
      localStorage.setItem(
        LETTER_KEY,
        JSON.stringify([...data, ANNIVERSARY_LETTER])
      );
    }

    toast("Our three-month letter has been saved ♡");

    const button = $("#saveM03Letter");

    if (button) {
      button.disabled = true;
      button.textContent = "Saved in Memory Drawer ✓";
    }

    const note = $("#m03LetterNote");

    if (note) {
      note.innerHTML = `
        <a href="../../memories/index.html#keepsakes">
          Open Memory Drawer ↗
        </a>
      `;
    }

    render();
  } catch {
    toast("Could not save the letter. Please try again ♡");
  }
}

function addLetterStyles() {
  if ($("#m03-letter-styles")) return;

  const style = document.createElement("style");

  style.id = "m03-letter-styles";

  style.textContent = `
    .m03-anniversary-slot {
      margin: 24px 0;
      padding: 28px 22px;
      text-align: center;
      border: 1px solid #f0c6d8;
      border-radius: 22px;
      background: linear-gradient(
        145deg,
        #fff7fa,
        #ffe8f1
      );
      box-shadow: 0 12px 30px #d977a51a;
    }

    .m03-anniversary-slot h3 {
      color: #a44c78;
      margin: 10px 0;
    }

    .m03-anniversary-slot p {
      max-width: 450px;
      margin: 12px auto;
      line-height: 1.7;
    }

    .m03-anniversary-slot small {
      display: block;
      margin-top: 14px;
      color: #a16d88;
    }

    .m03-anniversary-slot button {
      border: none;
      border-radius: 100px;
      padding: 13px 22px;
      background: #d06d9c;
      color: white;
      font-weight: 700;
      cursor: pointer;
    }

    #m03LetterDialog {
      width: min(92vw, 680px);
      max-height: 88vh;
      overflow-y: auto;
      padding: 16px;
      border: 1px solid #f1c9d9;
      border-radius: 26px;
      background: #fff8fa;
      color: #644057;
      box-shadow: 0 25px 80px #4d234d70;
    }

    #m03LetterDialog::backdrop {
      background: #3a203b99;
      backdrop-filter: blur(4px);
    }

    .m03-letter-paper {
      padding: clamp(20px, 5vw, 44px);
      border: 1px solid #f0dce4;
      border-radius: 18px;
      background: #fffefa;
      font: 16px/1.85 Georgia, serif;
    }

    .m03-letter-ornament {
      text-align: center;
      color: #d88cb0;
      font-size: 25px;
    }

    .m03-letter-paper > small {
      display: block;
      text-align: center;
      color: #b86c91;
      letter-spacing: 0.12em;
      font: 700 10px sans-serif;
    }

    .m03-letter-paper h2 {
      margin: 16px 0;
      text-align: center;
      color: #9f5178;
      font: 700 clamp(26px, 5vw, 38px) Georgia, serif;
    }

    .m03-letter-subtitle {
      text-align: center;
      font-style: italic;
      color: #ab7392;
    }

    .m03-letter-paper p {
      margin: 0 0 20px;
    }

    .m03-letter-actions {
      margin-top: 30px;
      padding-top: 24px;
      border-top: 1px solid #f1d8e2;
      text-align: center;
    }

    .m03-letter-actions button {
      border: none;
      border-radius: 100px;
      padding: 14px 22px;
      background: #ce6a97;
      color: white;
      font-weight: 700;
      cursor: pointer;
    }

    .m03-letter-actions button:disabled {
      opacity: 0.65;
      cursor: default;
    }

    .m03-letter-close {
      position: sticky;
      top: 0;
      float: right;
      z-index: 2;
      border: none;
      border-radius: 50%;
      background: white;
      color: #8e5877;
      font-size: 26px;
      cursor: pointer;
    }
  `;

  document.head.appendChild(style);
}

function openAnniversaryLetter() {
  addLetterStyles();

  let dialog = $("#m03LetterDialog");

  if (!dialog) {
    dialog = document.createElement("dialog");
    dialog.id = "m03LetterDialog";

    dialog.innerHTML = `
      <button
        class="m03-letter-close"
        type="button"
        aria-label="Close letter"
      >
        ×
      </button>

      <div class="m03-letter-paper">
        <div class="m03-letter-ornament">
          ✦ ♡ ✦
        </div>

        <small>
          LOVEVERSE · CHAPTER THREE · 20 JANUARY 2027
        </small>

        <h2>Three Months of Us ♡</h2>

        <p class="m03-letter-subtitle">
          A little letter to my favourite human
        </p>

        ${ANNIVERSARY_LETTER.paragraphs
          .map(paragraph => `<p>${paragraph}</p>`)
          .join("")}

        <div class="m03-letter-actions">
          <button id="saveM03Letter" type="button">
            💌 Keep this letter in Memory Drawer
          </button>

          <p id="m03LetterNote"></p>
        </div>
      </div>
    `;

    document.body.appendChild(dialog);

    dialog.querySelector(".m03-letter-close").onclick =
      () => dialog.close();

    dialog.addEventListener("click", event => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    dialog.querySelector("#saveM03Letter").onclick =
      saveAnniversaryLetter;
  }

  const saved = letterSaved();
  const button = dialog.querySelector("#saveM03Letter");
  const note = dialog.querySelector("#m03LetterNote");

  button.disabled = saved;

  button.textContent = saved
    ? "Saved in Memory Drawer ✓"
    : "💌 Keep this letter in Memory Drawer";

  note.innerHTML = saved
    ? `
      <a href="../../memories/index.html#keepsakes">
        Open Memory Drawer ↗
      </a>
    `
    : "";

  dialog.showModal();
}


// ============================================================
// 10. RENDER MAIN INTERFACE
// ============================================================

function render() {
  $("#coins").textContent = s.coins;
  $("#energy").textContent = s.energy;
  $("#missions").textContent = `${s.done.length}/4`;

  // Mission selection

  $("#missionlist").innerHTML = MISSIONS.map((mission, index) => {
    const available = unlocked(index);
    const done = completed(mission.id);

    return `
      <button
        class="mission
          ${done ? "done" : ""}
          ${active === mission.id ? "selected" : ""}"
        data-mission="${mission.id}"
        ${!available ? "disabled" : ""}
      >
        <span class="symbol">
          ${available ? mission.icon : "🔒"}
        </span>

        <b>
          ${index + 1}. ${mission.title}
          ${done ? "✓" : ""}
        </b>

        <small>
          ${available
            ? mission.desc
            : "Complete the previous mission first"}
        </small>

        <small>
          +${mission.reward} LC first clear
        </small>
      </button>
    `;
  }).join("");

  // Shop

  $("#products").innerHTML = PRODUCTS.map(product => `
    <article class="product">
      <div class="emoji">${product.icon}</div>

      <h3>${product.title}</h3>

      <p>${product.desc}</p>

      <strong>🪙 ${product.price} LC</strong>

      <button
        data-buy="${product.id}"
        ${s.purchased.includes(product.id) ? "disabled" : ""}
      >
        ${s.purchased.includes(product.id)
          ? "In Wallet ✓"
          : "Get coupon ♡"}
      </button>
    </article>
  `).join("");

  // Legendary slot

  $("#legend").innerHTML = legendOpen()
    ? `
      <h3>💍 ${LEGEND.title}</h3>

      <p>${LEGEND.desc}</p>

      <strong>🪙 ${LEGEND.price} LC</strong>

      <br>

      <button
        data-buy="golden"
        ${s.purchased.includes("golden") ? "disabled" : ""}
      >
        ${s.purchased.includes("golden")
          ? "In Wallet ✓"
          : "Claim legendary ticket ♡"}
      </button>
    `
    : `
      <h3>🔒 Legendary slot: ???</h3>

      <p>
        Complete the system meltdown,
        solve the first-date archive clue,
        and purchase at least one regular coupon.
      </p>
    `;

  // First-date archive clue

  $("#archive").innerHTML = s.archiveClue
    ? `
      <div style="font-size:38px;text-align:center">
        🗝️
      </div>

      <h3 style="text-align:center">
        A Little Trip Down Memory Lane
      </h3>

      <blockquote>
        What happened on our very first date
        that made it a little more than just
        a first date?
      </blockquote>

      <p style="text-align:center">
        Two words. One special moment. ♡
      </p>

      ${s.archiveSolved
        ? `
          <p class="status">
            ♡ Correct. Some memories are worth
            more than Love Coins.
          </p>

          <p>
            <a href="../secondmonth/index.html">
              Return to First Date Archive →
            </a>
          </p>
        `
        : `
          <form id="riddle">
            <input
              id="answer"
              aria-label="Archive answer"
              placeholder="Your answer"
              autocomplete="off"
              required
            >

            <button type="submit">
              Unlock clue ♡
            </button>
          </form>
        `}
    `
    : `
      <h3>🔒 Classified Archive</h3>

      <p>
        One of the Mystery Boxes contains
        an old ticket dated 15 October 2026.
      </p>

      <p>
        Find it to uncover a forgotten question.
      </p>
    `;

  // ----------------------------------------------------------
  // ANNIVERSARY LETTER — ALWAYS VISIBLE
  // ----------------------------------------------------------

  $("#anniversaryLetterSlot")?.remove();

  const slot = document.createElement("div");

  slot.id = "anniversaryLetterSlot";
  slot.className = "m03-anniversary-slot";

  slot.innerHTML = `
    <div style="font-size:44px">
      💌
    </div>

    <h3>Three Months of Us ♡</h3>

    <p>
      Three little months, almost a hundred days,
      and a thousand tiny reasons to smile.
    </p>

    <p>
      A letter from your little IT girlfriend.
      Some things cannot be bought with Love Coins.
    </p>

    <button id="readM03Letter" type="button">
      Open your anniversary letter ♡
    </button>

    <small>
      ${letterSaved()
        ? "Saved in Memory Drawer ✓"
        : "Read it first, then choose to keep it forever ♡"}
    </small>
  `;

  $("#archive").after(slot);

  slot.querySelector("#readM03Letter").onclick =
    openAnniversaryLetter;

  // ----------------------------------------------------------
  // SECRET PROGRESS
  // ----------------------------------------------------------

  $("#progress").innerHTML = `
    <b>Secret ending progress</b>

    <p>
      ${s.archiveClue ? "✅" : "🔒"}
      Find the first-date clue ·

      ${s.archiveSolved ? "✅" : "🔒"}
      Solve the riddle ·

      ${s.done.length === 4 ? "✅" : "🔒"}
      Clear four missions ·

      ${s.purchased.length ? "✅" : "🔒"}
      Purchase a coupon
    </p>

    <small>
      ${localStorage.getItem(M02_ARCHIVE_KEY) === "true"
        ? "M02 archive already unlocked on this browser ♡"
        : "The One Naughty Wish is claimed inside M02, never here."}
    </small>
  `;

  // Secret ending

  $("#ending").innerHTML = s.endingSeen
    ? `
      <h3>
        💗 ERROR 143:
        UNEXPECTED FEELINGS DETECTED
      </h3>

      <p>
        Calculating your Love Coins...<br>
        Calculating your rewards...<br>
        Calculating how much your girlfriend loves you...
      </p>

      <p>
        <strong>
          ERROR: VALUE EXCEEDS SYSTEM LIMIT.
        </strong>
      </p>

      <p>
        <em>
          Silly boy. Did you really think
          you needed coins to earn my love?
        </em>
      </p>

      <p>
        Thank you for playing,
        my favourite human. ♡
      </p>

      ${legendOpen()
        ? `
          <p>
            🌟 The legendary vending slot
            is now open in the Shop!
          </p>
        `
        : `
          <p>
            There's still a secret waiting
            for you in the Archive and Shop...
          </p>
        `}
    `
    : "";

  $("#machineSecret").innerHTML = s.endingSeen
    ? "💝<small>LOVE</small>"
    : "🔒<small>???</small>";

  // Mystery Boxes can be reused on later days.

  $$("[data-box]").forEach(button => {
    button.disabled =
      plays("box") >= 1 ||
      s.coins < 30;
  });
}


// ============================================================
// 11. NAVIGATION & GAME CONTROL
// ============================================================

function stop() {
  clearInterval(timer);
  cancelAnimationFrame(raf);

  timer = null;
  raf = null;
  round = null;
}

function switchTab(id) {
  stop();

  active = null;

  $$(".tabs button").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.tab === id
    );
  });

  $$(".panel").forEach(panel => {
    panel.classList.toggle(
      "active",
      panel.id === id
    );
  });

  render();

  window.scrollTo({
    top: Math.min(220, window.scrollY),
    behavior: "smooth"
  });
}

function game(id) {
  stop();

  active = id;

  render();

  if (id === "catch") catchGame();
  if (id === "factory") factory();
  if (id === "emergency") emergency();
  if (id === "meltdown") meltdown();
}

function finish(id, extra = 0) {
  if (!completed(id)) {
    const mission = MISSIONS.find(
      item => item.id === id
    );

    s.done.push(id);
    s.coins += mission.reward;
    s.energy += 25;

    toast(
      `Mission cleared! +${mission.reward} Love Coins ♡`
    );
  } else {
    s.coins += extra;

    toast(
      extra
        ? `Replay bonus +${extra} LC ♡`
        : "Mission replayed ♡"
    );
  }

  save();

  if (id === "meltdown") {
    s.endingSeen = true;

    save();

    screen(
      "ERROR 143: TOO MUCH LOVE DETECTED ♡"
    );

    setTimeout(() => {
      switchTab("secret");
    }, 1100);
  } else {
    screen(
      "MISSION COMPLETE ♡\nLove dispenser recharging..."
    );
  }
}


// ============================================================
// 12. GAME 1 — CATCH MY HEART
// ============================================================

function catchGame() {
  const area = $("#gameArea");

  area.innerHTML = `
    <h3>💗 Catch My Heart</h3>

    <p>
      Move the basket with your mouse,
      finger or ← → keys.
      Catch 9 hearts. Avoid 💔!
    </p>

    <div class="gamebar">
      <span id="catchScore">0 / 9 hearts</span>
      <span id="catchTime">25s</span>
    </div>

    <div class="catchfield" id="field">
      <div class="basket" id="basket">🧺</div>
    </div>

    <button id="startCatch">
      Start catching ♡
    </button>
  `;

  $("#startCatch").onclick = () => {
    if (plays("catch") >= 3) {
      return toast(
        "Three runs per day — come back tomorrow ♡"
      );
    }

    markPlay("catch");
    save();

    $("#startCatch").disabled = true;

    const field = $("#field");
    const basket = $("#basket");

    let items = [];
    let basketX = 0.5;
    let score = 0;
    let remaining = 25;
    let last = performance.now();
    let spawn = 0;
    let ended = false;

    function move(event) {
      const rect = field.getBoundingClientRect();

      basketX = Math.max(
        0.07,
        Math.min(
          0.93,
          (event.clientX - rect.left) / rect.width
        )
      );

      basket.style.left = basketX * 100 + "%";
    }

    function key(event) {
      if (
        event.key !== "ArrowLeft" &&
        event.key !== "ArrowRight"
      ) {
        return;
      }

      event.preventDefault();

      basketX = Math.max(
        0.07,
        Math.min(
          0.93,
          basketX +
            (event.key === "ArrowLeft" ? -0.09 : 0.09)
        )
      );

      basket.style.left = basketX * 100 + "%";
    }

    field.addEventListener("pointermove", move);
    field.addEventListener("pointerdown", move);

    window.addEventListener("keydown", key);

    basket.style.left = "50%";

    function end(win) {
      if (ended) return;

      ended = true;

      window.removeEventListener("keydown", key);

      cancelAnimationFrame(raf);
      round = null;

      if (win) {
        finish("catch", 10);
      } else {
        save();
        toast("So close! Try catching more hearts ♡");
      }

      area.insertAdjacentHTML(
        "beforeend",
        `
          <p class="status">
            ${win
              ? "You caught my heart! 💗"
              : "Time's up! 💔"}

            Score: ${score}/9
          </p>

          <button id="retryCatch">
            Try again
          </button>
        `
      );

      $("#retryCatch").onclick =
        () => game("catch");
    }

    round = {
      type: "catch"
    };

    function frame(now) {
      if (!round || round.type !== "catch") return;

      const dt = Math.min(
        0.05,
        (now - last) / 1000
      );

      last = now;
      remaining -= dt;
      spawn += dt;

      while (spawn > 0.58) {
        spawn -= 0.58;

        const element = document.createElement("span");
        const bad = Math.random() < 0.24;

        element.className = "fall";
        element.textContent = bad ? "💔" : "💗";

        field.appendChild(element);

        items.push({
          el: element,
          x: 0.05 + Math.random() * 0.9,
          y: -0.12,
          bad,
          speed: 0.38 + Math.random() * 0.2
        });
      }

      const width = field.clientWidth;
      const height = field.clientHeight;

      for (const item of items) {
        item.y += dt * item.speed;

        item.el.style.left =
          item.x * width - 14 + "px";

        item.el.style.top =
          item.y * height + "px";

        if (
          item.y > 0.78 &&
          item.y < 0.98 &&
          Math.abs(item.x - basketX) < 0.11
        ) {
          item.hit = true;

          if (item.bad) {
            score = Math.max(0, score - 2);
          } else {
            score++;
          }

          $("#catchScore").textContent =
            `${score} / 9 hearts`;
        }

        if (item.y > 1.05) {
          item.hit = true;
        }

        if (item.hit) {
          item.el.remove();
        }
      }

      items = items.filter(item => !item.hit);

      $("#catchTime").textContent =
        Math.max(0, Math.ceil(remaining)) + "s";

      if (score >= 9) return end(true);
      if (remaining <= 0) return end(false);

      raf = requestAnimationFrame(frame);
    }

    raf = requestAnimationFrame(frame);
  };
}


// ============================================================
// 13. GAME 2 — LOVE FACTORY
// ============================================================

const GOODS = [
  { icon: "🫂", name: "Warm hugs", ok: true },
  { icon: "🎨", name: "New adventures", ok: true },
  { icon: "💌", name: "Sweet notes", ok: true },

  { icon: "🍰", name: "Banana cake", ok: false },
  { icon: "🍫", name: "Ferrero Rocher", ok: false },
  { icon: "🥥", name: "Raffaello", ok: true },

  { icon: "💗", name: "Gentle words", ok: true },
  { icon: "🥛", name: "Spoiled milk", ok: false },
  { icon: "📢", name: "Yelling", ok: false },
  { icon: "👻", name: "Ghosting", ok: false },
  { icon: "🔁", name: "The same boring date", ok: false },
  { icon: "💔", name: "Broken promises", ok: false }
];

function factory() {
  const area = $("#gameArea");

  area.innerHTML = `
    <h3>📦 Love Factory · Quality Control</h3>

    <p>
      Accept sweet things, reject the bad ones.
      Sort 12 packages before they leave the belt!
    </p>

    <div class="gamebar">
      <span id="factoryScore">0 / 12 sorted</span>
      <span id="factoryClock">8s each</span>
    </div>

    <div class="conveyor" id="conveyor">📦</div>

    <p id="packageName" style="text-align:center">
      Ready for inspection?
    </p>

    <div class="choices">
      <button id="reject">↩ REJECT</button>
      <button id="accept">♡ ACCEPT</button>
    </div>

    <button id="factoryStart">
      Start factory
    </button>
  `;

  $("#reject").disabled = true;
  $("#accept").disabled = true;

  $("#factoryStart").onclick = () => {
    if (plays("factory") >= 3) {
      return toast("Three shifts per day ♡");
    }

    markPlay("factory");
    save();

    $("#factoryStart").remove();

    let count = 0;
    let correct = 0;
    let seconds = 8;
    let current = null;

    const used = [];

    function next() {
      clearInterval(timer);

      if (count >= 12) {
        $("#reject").disabled = true;
        $("#accept").disabled = true;

        $("#conveyor").textContent =
          correct >= 7 ? "🎉" : "📦";

        $("#packageName").textContent =
          `Shift finished: ${correct}/12 correct`;

        if (correct >= 7) {
          finish("factory", 10);
        } else {
          toast("7 correct packages needed. Try again!");
        }

        area.insertAdjacentHTML(
          "beforeend",
          `
            <button id="factoryRetry">
              New shift
            </button>
          `
        );

        $("#factoryRetry").onclick =
          () => game("factory");

        return;
      }

      const remaining = GOODS.filter(
        item => !used.includes(item.name)
      );

      current = remaining[
        Math.floor(Math.random() * remaining.length)
      ];

      used.push(current.name);

      $("#conveyor").textContent = current.icon;
      $("#packageName").textContent = current.name;

      seconds = Math.max(
        3,
        8 - Math.floor(count / 3)
      );

      $("#factoryClock").textContent =
        seconds + "s left";

      timer = setInterval(() => {
        seconds--;

        $("#factoryClock").textContent =
          seconds + "s left";

        if (seconds <= 0) {
          answer(null);
        }
      }, 1000);
    }

    function answer(value) {
      clearInterval(timer);

      if (value === current.ok) {
        correct++;
      }

      count++;

      $("#factoryScore").textContent =
        `${count} / 12 sorted · ${correct} correct`;

      next();
    }

    $("#reject").disabled = false;
    $("#accept").disabled = false;

    $("#reject").onclick = () => answer(false);
    $("#accept").onclick = () => answer(true);

    next();
  };
}


// ============================================================
// 14. GAME 3 — GIRLFRIEND EMERGENCY
// ============================================================

const SCENES = [
  {
    q: "Your girlfriend says she's not hungry, but keeps looking at your snack. What now?",
    opts: [
      {
        t: "Offer her a bite ♡",
        reaction: "Girlfriend.exe has acquired 1 snack and 100 happiness points.",
        v: 2
      },
      {
        t: "Guard the snack dramatically",
        reaction: "She laughs. You are now in a highly competitive snack war.",
        v: 1
      },
      {
        t: "Order something to share",
        reaction: "Co-op mode unlocked. Excellent teamwork!",
        v: 2
      }
    ]
  },
  {
    q: "She says: 'I have a surprise for you.'",
    opts: [
      {
        t: "Ask for 47 spoilers",
        reaction: "Surprise integrity compromised. Girlfriend.exe pouts.",
        v: 1
      },
      {
        t: "Close your eyes and trust her",
        reaction: "Maximum suspense. A tiny happy dance has been detected.",
        v: 2
      },
      {
        t: "Guess it's a secret spaceship",
        reaction: "She wasn't expecting that. Both of you burst out laughing.",
        v: 2
      }
    ]
  },
  {
    q: "Your girlfriend has had a long, exhausting day.",
    opts: [
      {
        t: "Offer a hug and ask what she needs",
        reaction: "Comfort mode activated. You understood the assignment.",
        v: 2
      },
      {
        t: "Tell a ridiculous joke",
        reaction: "Critical giggle detected. Still, maybe ask what she needs too.",
        v: 1
      },
      {
        t: "Suggest a quiet activity together",
        reaction: "Peaceful co-op ending unlocked.",
        v: 2
      }
    ]
  }
];

function emergency() {
  const area = $("#gameArea");

  if (plays("emergency") >= 3) {
    area.innerHTML = `
      <h3>🚨 Girlfriend Emergency</h3>

      <p>
        Three simulations per day.
        Come back tomorrow ♡
      </p>
    `;

    return;
  }

  let index = 0;
  let points = 0;

  area.innerHTML = `
    <h3>🚨 Girlfriend Emergency Simulator</h3>

    <p>
      No trick questions.
      Just tiny moments, silly choices,
      and different endings.
    </p>

    <div id="scenario"></div>
  `;

  function scene() {
    if (index === SCENES.length) {
      markPlay("emergency");
      save();

      const title = points >= 5
        ? "🌟 Certified Girlfriend Whisperer"
        : "💞 Adorably Chaotic Boyfriend";

      $("#scenario").innerHTML = `
        <h3>${title}</h3>

        <p>
          Relationship simulations completed.
          Girlfriend.exe is smiling.
        </p>

        <button id="againEmergency">
          Play again
        </button>
      `;

      if (!completed("emergency")) {
        finish("emergency");
      } else {
        s.coins += 10;
        save();

        toast("Replay bonus +10 LC ♡");
      }

      $("#againEmergency").onclick =
        () => game("emergency");

      return;
    }

    const question = SCENES[index];

    $("#scenario").innerHTML = `
      <p class="status">
        SCENARIO ${index + 1}/3
      </p>

      <h3>${question.q}</h3>

      <div id="options"></div>
      <div id="reaction"></div>
    `;

    question.opts.forEach(option => {
      const button = document.createElement("button");

      button.className = "choice";
      button.textContent = option.t;

      button.onclick = () => {
        points += option.v;

        $("#options").innerHTML = "";

        $("#reaction").textContent =
          option.reaction;

        const next = document.createElement("button");

        next.textContent = "Next scenario →";

        next.onclick = () => {
          index++;
          scene();
        };

        $("#reaction").append(
          document.createElement("br"),
          next
        );
      };

      $("#options").appendChild(button);
    });
  }

  scene();
}


// ============================================================
// 15. GAME 4 — VENDING MACHINE MELTDOWN
// ============================================================

// Directions: UP, RIGHT, DOWN, LEFT

const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1]
];

function meltdown() {
  const area = $("#gameArea");

  area.innerHTML = `
    <h3>⚡ Vending Machine Meltdown</h3>

    <p>
      ERROR 143: Too much love!
      Help the machine restore its heart circuit.
    </p>

    <div class="meltdown-help">
      <b>HOW TO PLAY ♡</b>

      <p>
        Click a pipe to rotate it 90° clockwise.
        Make one continuous path from
        💗 START to 💝 END.
      </p>

      <small>
        Pink glowing pipes are connected to START.
        You do not need all 9 tiles.
      </small>
    </div>

    <div class="meltdown-layout">
      <div class="meltdown-start">
        <span>💗</span>
        <b>START</b>
        <small>Energy enters from the left</small>
      </div>

      <div
        class="meltdown-board"
        id="circuit"
        aria-label="3 by 3 rotating pipe puzzle"
      ></div>

      <div class="meltdown-end">
        <span>💝</span>
        <b>END</b>
        <small>Energy exits to the right</small>
      </div>
    </div>

    <p
      class="meltdown-progress"
      id="circuitProgress"
      aria-live="polite"
    ></p>

    <div class="choices">
      <button id="checkCircuit" type="button">
        ⚡ Restore the system ♡
      </button>

      <button id="shuffleCircuit" type="button">
        ↻ Shuffle pipes
      </button>
    </div>

    <p
      id="circuitMsg"
      class="meltdown-message"
      aria-live="polite"
    ></p>
  `;

  // ----------------------------------------------------------
  // PIPE STYLES
  // ----------------------------------------------------------

  if (!$("#meltdown-enhanced-styles")) {
    const style = document.createElement("style");

    style.id = "meltdown-enhanced-styles";

    style.textContent = `
      .meltdown-help {
        padding: 14px 18px;
        border: 1px solid #f2c4d8;
        border-radius: 16px;
        background: #fff2f8;
        margin: 14px 0;
        color: #70475e;
      }

      .meltdown-help p {
        margin: 8px 0;
      }

      .meltdown-layout {
        display: grid;
        grid-template-columns:
          minmax(70px, 1fr)
          minmax(0, 330px)
          minmax(70px, 1fr);
        gap: 10px;
        align-items: center;
        margin: 22px auto;
        max-width: 640px;
      }

      .meltdown-start,
      .meltdown-end {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 5px;
        text-align: center;
        color: #8b4568;
      }

      .meltdown-start span,
      .meltdown-end span {
        font-size: 30px;
      }

      .meltdown-start b,
      .meltdown-end b {
        font-size: 13px;
        letter-spacing: 0.07em;
      }

      .meltdown-start small,
      .meltdown-end small {
        font-size: 10px;
        line-height: 1.3;
      }

      .meltdown-board {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        gap: 8px;
        width: 100%;
        padding: 9px;
        border: 2px solid #f4cadc;
        border-radius: 18px;
        background: #fff6fa;
        box-shadow: 0 12px 28px #e58bb32b;
      }

      .meltdown-board .pipe-tile {
        position: relative;
        display: grid;
        place-items: center;
        aspect-ratio: 1;
        width: 100%;
        min-width: 0;
        padding: 0 !important;
        border: 2px solid #e7c9d7 !important;
        border-radius: 13px !important;
        background: #f6eaf1 !important;
        color: #86657a !important;
        box-shadow: none !important;
        transform: none !important;
        cursor: pointer;
        transition:
          background 0.18s,
          box-shadow 0.18s,
          border-color 0.18s;
      }

      .meltdown-board .pipe-glyph {
        font-family: Arial, sans-serif;
        font-size: clamp(29px, 5vw, 53px);
        line-height: 1;
        font-weight: 700;
        pointer-events: none;
      }

      .meltdown-board .pipe-tile.powered {
        background: #ffc4df !important;
        border-color: #e36caa !important;
        color: #9c286a !important;
        box-shadow:
          0 0 0 2px #ffe3f0,
          0 0 18px #f38abd !important;
        animation:
          pipe-pulse 1.5s ease-in-out infinite alternate;
      }

      .meltdown-board .start-tile::after {
        content: "IN";
        position: absolute;
        top: 3px;
        left: 5px;
        font-size: 9px;
        color: #477e5c;
        font-weight: 800;
      }

      .meltdown-board .end-tile::after {
        content: "OUT";
        position: absolute;
        bottom: 3px;
        right: 4px;
        font-size: 9px;
        color: #a45d2b;
        font-weight: 800;
      }

      .meltdown-progress,
      .meltdown-message {
        text-align: center;
        margin: 12px 0;
        font-weight: 700;
        color: #a04477;
      }

      @keyframes pipe-pulse {
        from { filter: brightness(1); }
        to { filter: brightness(1.09); }
      }

      @media (max-width: 520px) {
        .meltdown-layout {
          grid-template-columns: 1fr;
          max-width: 330px;
        }

        .meltdown-start,
        .meltdown-end {
          flex-direction: row;
          justify-content: center;
        }

        .meltdown-board {
          order: 2;
        }

        .meltdown-end {
          order: 3;
        }

        .meltdown-start small,
        .meltdown-end small {
          display: none;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .meltdown-board .pipe-tile.powered {
          animation: none;
        }
      }
    `;

    document.head.appendChild(style);
  }

  // ----------------------------------------------------------
  // PIPE CONFIGURATION
  // ----------------------------------------------------------

  // A valid route is:
  // 0 -> 3 -> 6 -> 7 -> 8
  //
  // START enters tile 0 from LEFT.
  // END exits tile 8 to RIGHT.

  const types = [
    "corner", "corner", "straight",
    "straight", "straight", "corner",
    "corner", "straight", "straight"
  ];

  const solution = [
    2, 0, 0,
    0, 0, 0,
    0, 1, 1
  ];

  let rotations = [];
  let solved = false;

  function base(type) {
    return type === "corner"
      ? [0, 1]
      : [0, 2];
  }

  function connections(index) {
    return base(types[index]).map(
      direction => (direction + rotations[index]) % 4
    );
  }

  function glyph(index) {
    const links = connections(index);

    if (types[index] === "straight") {
      return links.includes(0) ? "│" : "─";
    }

    if (links.includes(0) && links.includes(1)) {
      return "└";
    }

    if (links.includes(1) && links.includes(2)) {
      return "┌";
    }

    if (links.includes(2) && links.includes(3)) {
      return "┐";
    }

    return "┘";
  }

  // ----------------------------------------------------------
  // TRACE LOVE ENERGY
  // ----------------------------------------------------------

  function trace() {
    const powered = new Set();

    // Begin at top-left tile, entering from LEFT.
    const queue = [[0, 3]];

    let success = false;

    while (queue.length) {
      const [index, incoming] = queue.shift();

      if (powered.has(index)) continue;

      const links = connections(index);

      if (!links.includes(incoming)) continue;

      powered.add(index);

      if (index === 8 && links.includes(1)) {
        success = true;
        break;
      }

      const row = Math.floor(index / 3);
      const col = index % 3;

      for (const direction of links) {
        if (direction === incoming) continue;

        const [dr, dc] = DIRS[direction];

        const nextRow = row + dr;
        const nextCol = col + dc;

        if (
          nextRow < 0 ||
          nextRow >= 3 ||
          nextCol < 0 ||
          nextCol >= 3
        ) {
          continue;
        }

        const neighbor = nextRow * 3 + nextCol;
        const opposite = (direction + 2) % 4;

        if (connections(neighbor).includes(opposite)) {
          queue.push([neighbor, opposite]);
        }
      }
    }

    return {
      powered,
      success
    };
  }

  // ----------------------------------------------------------
  // DRAW THE BOARD
  // ----------------------------------------------------------

  function paint() {
    const result = trace();
    const board = $("#circuit");

    board.replaceChildren();

    types.forEach((type, index) => {
      const tile = document.createElement("button");

      tile.type = "button";

      tile.className = [
        "pipe-tile",
        result.powered.has(index) ? "powered" : "",
        index === 0 ? "start-tile" : "",
        index === 8 ? "end-tile" : ""
      ].filter(Boolean).join(" ");

      tile.setAttribute(
        "aria-label",
        `Row ${Math.floor(index / 3) + 1}, ` +
        `column ${index % 3 + 1}. ` +
        "Click to rotate clockwise."
      );

      tile.innerHTML = `
        <span class="pipe-glyph" aria-hidden="true">
          ${glyph(index)}
        </span>
      `;

      tile.disabled = solved;

      tile.onclick = () => {
        if (solved) return;

        rotations[index] =
          (rotations[index] + 1) % 4;

        $("#circuitMsg").textContent = "";

        paint();
      };

      board.appendChild(tile);
    });

    $("#circuitProgress").textContent = result.success
      ? "💗 Connected! The love energy reached END!"
      : `💗 ${result.powered.size} / 9 pipes glowing. Follow the pink path!`;

    return result;
  }

  // ----------------------------------------------------------
  // SHUFFLE THE PUZZLE
  // ----------------------------------------------------------

  function shuffle() {
    solved = false;

    rotations = solution.map(rotation =>
      (rotation + Math.floor(Math.random() * 4)) % 4
    );

    // Avoid presenting an already-completed board.

    if (trace().success) {
      rotations[0] = (rotations[0] + 1) % 4;
    }

    $("#checkCircuit").disabled = false;
    $("#shuffleCircuit").disabled = false;

    $("#circuitMsg").textContent =
      "Connect the glowing path from START to END ♡";

    paint();
  }

  // ----------------------------------------------------------
  // CHECK THE SOLUTION
  // ----------------------------------------------------------

  $("#checkCircuit").onclick = () => {
    if (solved) return;

    const result = trace();

    if (!result.success) {
      $("#circuitMsg").textContent =
        "Not connected yet! Rotate the pipes " +
        "until the pink glow reaches END ♡";

      return;
    }

    solved = true;

    $("#checkCircuit").disabled = true;
    $("#shuffleCircuit").disabled = true;

    $("#circuitMsg").textContent =
      "SYSTEM RESTORED! 💗 Why is the machine still blushing?";

    paint();

    finish("meltdown", 15);
  };

  $("#shuffleCircuit").onclick = shuffle;

  shuffle();
}


// ============================================================
// 16. MYSTERY BOX
// ============================================================

function openBox(index) {
  if (plays("box") >= 1) {
    return toast(
      "One surprise per day ♡ Come back tomorrow and pick any box again!"
    );
  }

  if (s.coins < 30) {
    return toast(
      "You need 30 LC to open a Mystery Box ♡"
    );
  }

  const first = !s.archiveClue;
  const random = Math.random();

  const tier =
    random < 0.50 ? "Common" :
    random < 0.80 ? "Rare" :
    random < 0.96 ? "Epic" :
    "Legendary";

  const coinBonus = {
    Common: 10,
    Rare: 25,
    Epic: 45,
    Legendary: 90
  };

  const isCoupon = random >= 0.50;

  const surprise = isCoupon
    ? BOX_SURPRISES[
        Math.floor(Math.random() * BOX_SURPRISES.length)
      ]
    : null;

  // Save coupon rewards to Love Wallet.
  // Each prize receives a unique ID.

  if (surprise) {
    const existing = wallet();

    if (!existing) {
      return toast(
        "Wallet unavailable. No coins charged."
      );
    }

    const reward = {
      id: `M03-BOX-${Date.now()}-${s.boxes + 1}`,
      title: `${surprise.icon} ${surprise.title}`,
      description: surprise.desc,
      redeemed: false,
      source: "M03",
      issuedAt: new Date().toISOString()
    };

    try {
      localStorage.setItem(
        WALLET_KEY,
        JSON.stringify([...existing, reward])
      );
    } catch {
      return toast(
        "Could not save the surprise. No coins charged."
      );
    }
  }

  markPlay("box");

  s.coins -= 30;
  s.boxes++;

  // First opening reveals the M02 clue.
  s.archiveClue = true;

  if (!surprise) {
    s.coins += coinBonus[tier];
  }

  s.history.push({
    date: day(),
    box: index + 1,
    tier,
    bonus: surprise ? 0 : coinBonus[tier],
    surprise: surprise?.id || null
  });

  save();

  $$("[data-box]").forEach((button, i) => {
    button.innerHTML = `
      ${i === index ? "💝" : "🎁"}
      <small>BOX 0${i + 1}</small>
    `;
  });

  const prizeHTML = surprise
    ? `
      <p class="status">
        ${surprise.icon} ${surprise.title}
      </p>

      <p>${surprise.desc}</p>

      <p>
        🎟️ Saved to your Love Wallet ♡
      </p>
    `
    : `
      <p class="status">
        🪙 +${coinBonus[tier]} Love Coins!
      </p>
    `;

  $("#boxResult").innerHTML = `
    <h3>✨ ${tier} Mystery Box!</h3>

    ${prizeHTML}

    ${first
      ? `
        <p class="status">
          🗝️ BONUS DISCOVERY:
          An old ticket dated 15 OCT 2026!
        </p>

        <p>
          Remember what happened
          on our very first date?
        </p>

        <button id="toArchive" type="button">
          Read the archive clue →
        </button>
      `
      : `
        <p>
          Tomorrow, you can choose any
          of the three boxes again. ♡
        </p>
      `}
  `;

  const archiveButton = $("#toArchive");

  if (archiveButton) {
    archiveButton.onclick =
      () => switchTab("secret");
  }
}


// ============================================================
// 17. EVENT LISTENERS
// ============================================================

document.addEventListener("click", event => {
  const tab = event.target.closest("[data-tab]");

  if (tab) {
    switchTab(tab.dataset.tab);
    return;
  }

  const mission = event.target.closest("[data-mission]");

  if (mission) {
    game(mission.dataset.mission);
    return;
  }

  const product = event.target.closest("[data-buy]");

  if (product) {
    const item = [...PRODUCTS, LEGEND].find(
      reward => reward.id === product.dataset.buy
    );

    buy(item);
    return;
  }

  const box = event.target.closest("[data-box]");

  if (box) {
    openBox(Number(box.dataset.box));
  }
});


// ------------------------------------------------------------
// 18. FIRST DATE RIDDLE
// ------------------------------------------------------------

document.addEventListener("submit", event => {
  if (event.target.id !== "riddle") return;

  event.preventDefault();

  const answer = $("#answer")
    .value
    .toUpperCase()
    .replace(/[^A-Z]/g, "");

  if (answer === "FIRSTKISS") {
    s.archiveSolved = true;

    save();

    toast("A beautiful memory unlocked ♡");

    screen(
      "MEMORY FOUND: OUR FIRST KISS ♡"
    );
  } else {
    toast(
      "Not quite. Think of a special first moment ♡"
    );
  }
});


// ============================================================
// 19. INITIALIZE LOVEVERSE M03
// ============================================================

addLetterStyles();
render();
