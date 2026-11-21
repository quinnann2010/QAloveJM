
"use strict";

/* =========================================================
   LOVEVERSE — CHRISTMAS SPECIAL 2026
   SCRIPT.JS

   1. Helpers & Canvas
   2. Christmas Tree Particles
   3. Christmas Tree Rendering
   4. Background Sparkles
   5. Screen Navigation & Hearts
   6. Sound Effects
   7. Tree Interaction & Secret Star
   8. Magical Tree-to-Heart Transition
   9. Christmas Wish & Letter Navigation
   10. Winter Date Voucher
   11. Christmas Card Keepsake
   ========================================================= */


/* =========================================================
   1. HELPERS & CANVAS SETUP
   ========================================================= */

const $ = id => document.getElementById(id);

const canvas = $("tree");
const ctx = canvas.getContext("2d");

const TAU = Math.PI * 2;

const rand = (a, b) =>
  a + Math.random() * (b - a);

let angle = 0;
let last = 0;
let phase = 0;
let playing = true;

let soundOn = false;
let audio = null;


/* =========================================================
   2. CHRISTMAS TREE PARTICLES
   ========================================================= */

/* ---------------------------------------------------------
   2.1 Glowing Tree Dots
   --------------------------------------------------------- */

const dots = [];

for (let i = 0; i < 2100; i++) {
  const h = Math.random();
  const turn = rand(0, TAU);
  const radius = (1 - h) * rand(0.68, 1.06);

  dots.push({
    h,
    turn,
    radius,
    twinkle: rand(0, TAU),
    size: rand(0.65, 2.5),
    kind: Math.random()
  });
}


/* ---------------------------------------------------------
   2.2 Christmas Ornaments
   --------------------------------------------------------- */

const ornaments = [];

for (let i = 0; i < 135; i++) {
  const h = rand(0.04, 0.94);
  const a = rand(0, TAU);

  ornaments.push({
    h,
    a,
    r: rand(3.2, 7.3),
    kind: i % 5,
    tw: rand(0, TAU)
  });
}


/* ---------------------------------------------------------
   2.3 Floating Background Dust
   --------------------------------------------------------- */

const dust = Array.from(
  { length: 120 },
  () => ({
    x: rand(30, 730),
    y: rand(45, 720),
    r: rand(0.5, 2.1),
    t: rand(0, TAU)
  })
);


/* =========================================================
   3. CHRISTMAS TREE RENDERING
   ========================================================= */

/* ---------------------------------------------------------
   3.1 Draw a Glowing Dot
   --------------------------------------------------------- */

function glowDot(x, y, r, color, alpha = 1, blur = 12) {
  ctx.globalAlpha = alpha;

  ctx.shadowColor = color;
  ctx.shadowBlur = blur;

  ctx.fillStyle = color;

  ctx.beginPath();
  ctx.arc(x, y, r, 0, TAU);
  ctx.fill();

  ctx.globalAlpha = 1;
  ctx.shadowBlur = 0;
}


/* ---------------------------------------------------------
   3.2 Calculate 3D Tree Position
   --------------------------------------------------------- */

function position(h, a, rad = 1) {
  const depth = Math.sin(a);
  const width = 246 * (1 - h) * rad;

  return {
    x: 380 + Math.cos(a) * width,
    y: 645 - h * 550 + depth * 12,
    depth
  };
}


/* ---------------------------------------------------------
   3.3 Render Christmas Tree
   --------------------------------------------------------- */

function render(t) {
  const w = canvas.width;
  const h = canvas.height;

  ctx.clearRect(0, 0, w, h);

  const dt = Math.min(40, t - last || 16);

  last = t;
  angle += dt * 0.00032;
  phase += dt * 0.0015;


  /* Floating Distant Stars */

  for (const d of dust) {
    glowDot(
      d.x,
      d.y,
      d.r,
      "#f6d4a7",
      0.16 + 0.23 * (1 + Math.sin(phase * 2 + d.t)) / 2,
      7
    );
  }


  /* Velvet Glow Under the Tree */

  const halo = ctx.createRadialGradient(
    380, 626, 10,
    380, 626, 270
  );

  halo.addColorStop(0, "#d9b57b29");
  halo.addColorStop(0.65, "#e7a7d00b");
  halo.addColorStop(1, "#e7a7d000");

  ctx.fillStyle = halo;

  ctx.beginPath();
  ctx.ellipse(380, 620, 280, 95, 0, 0, TAU);
  ctx.fill();


  /* Glowing Tree Base */

  ctx.strokeStyle = "#edca8b88";
  ctx.lineWidth = 3;
  ctx.shadowColor = "#ffd68d";
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.ellipse(380, 645, 220, 23, 0, 0, TAU);
  ctx.stroke();

  ctx.shadowBlur = 0;


  /* Dense Fairy Lights */

  const all = dots
    .map(p => ({
      pos: position(
        p.h,
        p.turn + angle,
        p.radius / (1 - p.h)
      ),
      p
    }))
    .sort((a, b) => a.pos.depth - b.pos.depth);

  for (const { pos, p } of all) {
    const tw = 0.72 + 0.28 * Math.sin(
      phase * 3 + p.twinkle
    );

    const r =
      p.size *
      (0.75 + (pos.depth + 1) * 0.32) *
      tw;

    const color =
      p.kind < 0.18 ? "#ff9fc6" :
      p.kind < 0.41 ? "#ffdf9e" :
      p.kind < 0.59 ? "#b7e4ff" :
      p.kind < 0.75 ? "#fffaf0" :
      "#b6f5c9";

    glowDot(
      pos.x,
      pos.y,
      Math.max(0.55, r),
      color,
      0.42 + (pos.depth + 1) * 0.26,
      7 + r * 3
    );
  }


  /* Three Rotating Light Ribbons */

  for (let ribbon = 0; ribbon < 3; ribbon++) {
    for (let i = 0; i < 460; i++) {
      const h = i / 460 * 0.97;

      const a =
        angle +
        TAU * (h * 3.8 + ribbon / 3) +
        ribbon * 0.38;

      const pos = position(h, a, 1.025);

      const bright =
        0.36 +
        0.64 * Math.max(0, (pos.depth + 1) / 2);

      const color =
        ribbon === 0 ? "#ffe6a5" :
        ribbon === 1 ? "#ffb5d8" :
        "#e4efff";

      glowDot(
        pos.x,
        pos.y,
        1.1 + bright * 1.5,
        color,
        bright * 0.9,
        8
      );
    }
  }


  /* Glowing Christmas Ornaments */

  for (const o of ornaments) {
    const q = position(
      o.h,
      o.a + angle,
      1.02
    );

    const color = [
      "#ff668e",
      "#ffe49c",
      "#a8e4ff",
      "#d9b7ff",
      "#fff2d8"
    ][o.kind];

    glowDot(
      q.x,
      q.y,
      o.r * (0.75 + (q.depth + 1) * 0.15),
      color,
      0.65 + (q.depth + 1) * 0.17,
      18
    );

    glowDot(
      q.x - o.r * 0.25,
      q.y - o.r * 0.25,
      1.1,
      "#ffffff",
      0.8,
      3
    );
  }


  /* Christmas Star — Glowing Rays */

  const sx = 380;
  const sy = 69 + Math.sin(phase * 2) * 3;

  for (let i = 0; i < 12; i++) {
    const a = i * TAU / 12 + phase * 0.16;
    const rr = 39 + Math.sin(phase * 2) * 4;

    ctx.strokeStyle = "#ffe6a344";
    ctx.lineWidth = 1.8;
    ctx.shadowColor = "#ffe5a4";
    ctx.shadowBlur = 13;

    ctx.beginPath();

    ctx.moveTo(
      sx + Math.cos(a) * 13,
      sy + Math.sin(a) * 13
    );

    ctx.lineTo(
      sx + Math.cos(a) * rr,
      sy + Math.sin(a) * rr
    );

    ctx.stroke();
  }


  /* Christmas Star — Main Shape */

  ctx.shadowBlur = 38;
  ctx.shadowColor = "#ffda7b";
  ctx.fillStyle = "#fff0b0";

  ctx.beginPath();

  for (let i = 0; i < 10; i++) {
    const a = -Math.PI / 2 + i * Math.PI / 5;
    const r = i % 2 ? 12 : 28;

    const x = sx + Math.cos(a) * r;
    const y = sy + Math.sin(a) * r;

    if (i) {
      ctx.lineTo(x, y);
    } else {
      ctx.moveTo(x, y);
    }
  }

  ctx.closePath();
  ctx.fill();

  ctx.shadowBlur = 0;

  glowDot(
    sx,
    sy,
    5,
    "#ffffff",
    1,
    28
  );


  /* Continue Animation */

  if (playing) {
    requestAnimationFrame(render);
  }
}


/* Start Christmas Tree Animation */

requestAnimationFrame(render);


/* =========================================================
   4. BACKGROUND SPARKLES
   ========================================================= */

const sky = $("sparkles");

for (let i = 0; i < 85; i++) {
  const e = document.createElement("i");

  e.className = "particle";

  e.style.left = rand(0, 100) + "%";
  e.style.top = rand(0, 100) + "%";
  e.style.opacity = rand(0.15, 0.7);
  e.style.animationDelay = rand(0, 4) + "s";

  sky.appendChild(e);
}


/* =========================================================
   5. SCREEN NAVIGATION & HEART EFFECTS
   ========================================================= */

/* ---------------------------------------------------------
   5.1 Show Selected Screen
   --------------------------------------------------------- */

function show(id) {
  for (const section of document.querySelectorAll(
    "main > section"
  )) {
    section.hidden = section.id !== id;
  }

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* ---------------------------------------------------------
   5.2 Floating Hearts
   --------------------------------------------------------- */

function hearts() {
  for (let i = 0; i < 35; i++) {
    const e = document.createElement("span");

    e.className = "float-heart";

    e.textContent = [
      "♡",
      "✧",
      "💗",
      "✦"
    ][i % 4];

    e.style.left = rand(0, 100) + "%";
    e.style.top = rand(65, 100) + "%";
    e.style.fontSize = rand(14, 30) + "px";
    e.style.animationDelay = rand(0, 1.2) + "s";

    document.body.appendChild(e);

    setTimeout(() => {
      e.remove();
    }, 4000);
  }
}


/* =========================================================
   6. SOUND EFFECTS

   Currently disabled because soundOn = false.
   No external music files are used.
   ========================================================= */

function tone(freq = 600, dur = 0.18) {
  if (!soundOn) return;

  try {
    audio ||= new (
      window.AudioContext ||
      window.webkitAudioContext
    )();

    const osc = audio.createOscillator();
    const gain = audio.createGain();

    osc.type = "sine";
    osc.frequency.value = freq;

    gain.gain.setValueAtTime(
      0.0001,
      audio.currentTime
    );

    gain.gain.exponentialRampToValueAtTime(
      0.065,
      audio.currentTime + 0.025
    );

    gain.gain.exponentialRampToValueAtTime(
      0.0001,
      audio.currentTime + dur
    );

    osc.connect(gain);
    gain.connect(audio.destination);

    osc.start();
    osc.stop(audio.currentTime + dur + 0.01);

  } catch (error) {
    // Sound effects are optional.
  }
}


/* =========================================================
   7. TREE INTERACTION & SECRET STAR
   ========================================================= */

let dragging = false;
let lastPointerX = 0;
let secretClicks = 0;
let transitioning = false;

const shell = document.querySelector(".tree-shell");


/* ---------------------------------------------------------
   7.1 Drag to Rotate Christmas Tree
   --------------------------------------------------------- */

shell.addEventListener("pointerdown", event => {
  if (event.target.closest("button")) return;

  dragging = true;
  lastPointerX = event.clientX;

  shell.classList.add("dragging");
  shell.setPointerCapture(event.pointerId);
});


shell.addEventListener("pointermove", event => {
  if (!dragging) return;

  angle += (event.clientX - lastPointerX) * 0.009;
  lastPointerX = event.clientX;
});


const stopDrag = () => {
  dragging = false;
  shell.classList.remove("dragging");
};

shell.addEventListener("pointerup", stopDrag);
shell.addEventListener("pointercancel", stopDrag);


/* ---------------------------------------------------------
   7.2 Hidden Pink Star
   --------------------------------------------------------- */

$("secretStar").addEventListener("click", () => {
  secretClicks++;

  $("secretHint").textContent =
    secretClicks >= 5
      ? "Your tiny programmer girlfriend loves you ♡"
      : "You found something Santa tried to hide... 👀";

  hearts();
});


/* =========================================================
   8. MAGICAL TREE-TO-HEART TRANSITION
   ========================================================= */

function magicalMorph(done) {
  const c = $("morph");
  const g = c.getContext("2d");

  const start = performance.now();
  const duration = 3000;


  /* Create Magical Particles */

  const particles = Array.from(
    { length: 1100 },
    (_, i) => {
      const h = Math.random();
      const a = Math.random() * TAU;

      const r =
        (1 - h) *
        Math.sqrt(Math.random()) *
        215;

      const sx = 380 + Math.cos(a) * r;
      const sy = 565 - h * 485;

      const t = Math.random() * TAU;
      const u = Math.sqrt(Math.random());

      const hx =
        16 * Math.pow(Math.sin(t), 3);

      const hy =
        13 * Math.cos(t) -
        5 * Math.cos(2 * t) -
        2 * Math.cos(3 * t) -
        Math.cos(4 * t);

      return {
        sx,
        sy,
        ex: 380 + hx * u * 13,
        ey: 315 - hy * u * 13,
        delay: Math.random() * 0.25,
        size: Math.random() * 2.2 + 1.2,
        col: [
          "#ffb4d5",
          "#ffde94",
          "#fff9ed",
          "#e9c3ff"
        ][i % 4]
      };
    }
  );


  /* Smooth Animation Easing */

  function ease(x) {
    return x < 0.5
      ? 4 * x * x * x
      : 1 - Math.pow(-2 * x + 2, 3) / 2;
  }


  /* Animate Tree Particles into a Heart */

  function frame(now) {
    const progress = Math.min(
      1,
      (now - start) / duration
    );

    g.clearRect(
      0,
      0,
      c.width,
      c.height
    );

    for (const p of particles) {
      const k = ease(
        Math.max(
          0,
          Math.min(
            1,
            (progress - p.delay) / 0.75
          )
        )
      );

      const x = p.sx + (p.ex - p.sx) * k;
      const y = p.sy + (p.ey - p.sy) * k;

      const sparkle =
        0.7 +
        0.3 * Math.sin(now * 0.009 + p.sx);

      g.fillStyle = p.col;

      g.globalAlpha =
        (progress > 0.86
          ? (1 - progress) / 0.14
          : 1) * sparkle;

      g.shadowColor = p.col;
      g.shadowBlur = 12;

      g.beginPath();

      g.arc(
        x,
        y,
        p.size * (1 + 0.4 * k),
        0,
        TAU
      );

      g.fill();
    }

    g.globalAlpha = 1;
    g.shadowBlur = 0;

    if (progress < 1) {
      requestAnimationFrame(frame);
    } else {
      done();
    }
  }

  requestAnimationFrame(frame);
}


/* =========================================================
   9. CHRISTMAS WISH & LETTER NAVIGATION
   ========================================================= */

/* ---------------------------------------------------------
   9.1 Start Christmas Wish
   --------------------------------------------------------- */

$("wishBtn").addEventListener("click", () => {
  tone(660);
  show("wish");
});


/* ---------------------------------------------------------
   9.2 Send Wish to the Stars
   --------------------------------------------------------- */

$("sendWish").addEventListener("click", () => {
  if (transitioning) return;

  transitioning = true;

  const wish = $("wishText").value.trim();
  const w = $("jarodWish");

  w.hidden = !wish;

  if (wish) {
    $("jarodWishText").textContent = wish;
  }

  $("revealContent").hidden = true;
  $("magicTransition").hidden = false;

  show("reveal");
  hearts();

  magicalMorph(() => {
    $("magicTransition").hidden = true;
    $("revealContent").hidden = false;

    hearts();

    transitioning = false;
  });
});


/* ---------------------------------------------------------
   9.3 Open Christmas Letter
   --------------------------------------------------------- */

$("letterBtn").addEventListener("click", () => {
  tone(880, 0.3);
  show("card");
  hearts();
});


/* ---------------------------------------------------------
   9.4 Replay Christmas Tree
   --------------------------------------------------------- */

$("again").addEventListener("click", () => {
  show("intro");
});


/* ---------------------------------------------------------
   9.5 Reveal Secret Winter Date Voucher
   --------------------------------------------------------- */

$("psButton").addEventListener("click", () => {
  $("psSecret").hidden = !$("psSecret").hidden;

  if (!$("psSecret").hidden) {
    hearts();
  }
});


/* =========================================================
   10. WINTER DATE VOUCHER

   Saved in Love Wallet, not Memory Drawer.
   ========================================================= */

const CHRISTMAS_MEMORY_KEY =
  "loveverse_christmas_memories_v1";

const WINTER_WALLET_KEY =
  "loveverse_m02_rewards_v1";

const WINTER_VOUCHER_ID =
  "christmas-winter-date-2026";


/* ---------------------------------------------------------
   10.1 Collect Winter Date Voucher
   --------------------------------------------------------- */

function collectWinterDate() {
  try {
    const stored = JSON.parse(
      localStorage.getItem(WINTER_WALLET_KEY) || "[]"
    );

    const vouchers = Array.isArray(stored)
      ? stored
      : [];

    const alreadyCollected = vouchers.some(
      item => item && item.id === WINTER_VOUCHER_ID
    );

    if (!alreadyCollected) {
      vouchers.push({
        id: WINTER_VOUCHER_ID,

        title: "One Cozy Winter Date ♡",

        description:
          "Chocolate bombs, baking, a cozy movie night, " +
          "Christmas lights, or our own winter adventure. " +
          "Your choice ♡",

        redeemed: false,

        createdAt: new Date().toISOString()
      });

      localStorage.setItem(
        WINTER_WALLET_KEY,
        JSON.stringify(vouchers)
      );
    }

    $("winterStatus").textContent =
      "Voucher collected! Find it in your Love Wallet ♡";

    $("collectWinter").textContent = "Collected ✓";

    hearts();

  } catch (error) {
    $("winterStatus").textContent =
      "Couldn't save the voucher in this browser.";
  }
}


/* ---------------------------------------------------------
   10.2 Voucher Button Event
   --------------------------------------------------------- */

$("collectWinter").addEventListener(
  "click",
  collectWinterDate
);


/* ---------------------------------------------------------
   10.3 Restore Previously Collected Voucher
   --------------------------------------------------------- */

try {
  const items = JSON.parse(
    localStorage.getItem(WINTER_WALLET_KEY) || "[]"
  );

  if (
    Array.isArray(items) &&
    items.some(
      item => item && item.id === WINTER_VOUCHER_ID
    )
  ) {
    $("collectWinter").textContent = "Collected ✓";
  }

} catch (error) {
  // Keep the default button state.
}


/* =========================================================
   11. CHRISTMAS CARD KEEPSAKE

   Saved in the Memory Museum's Keepsake Drawer.
   ========================================================= */

const CHRISTMAS_MEMORY_ID =
  "christmas-first-2026";


/* ---------------------------------------------------------
   11.1 Save Christmas Card
   --------------------------------------------------------- */

function collectChristmasCard() {
  let items = [];

  try {
    const stored = JSON.parse(
      localStorage.getItem(CHRISTMAS_MEMORY_KEY) || "[]"
    );

    if (Array.isArray(stored)) {
      items = stored;
    }

  } catch (error) {
    // Start with an empty collection.
  }


  /* Read Jarod's Christmas Wish */

  const wish = $("wishText").value.trim();


  /* Create Christmas Keepsake */

  const memory = {
    id: CHRISTMAS_MEMORY_ID,

    title: "Our First Christmas ♡",

    date: "25 December 2026",

    kind: "christmas_card",

    wish: wish.slice(0, 300)
  };


  /* Update Existing Card or Add New Card */

  const idx = items.findIndex(
    item => item && item.id === CHRISTMAS_MEMORY_ID
  );

  if (idx >= 0) {
    items[idx] = memory;
  } else {
    items.push(memory);
  }


  /* Save to Browser Storage */

  try {
    localStorage.setItem(
      CHRISTMAS_MEMORY_KEY,
      JSON.stringify(items)
    );

    $("saveStatus").textContent =
      "Saved! Your Christmas letter is " +
      "in the Keepsake Drawer ♡";

    $("saveCard").textContent = "Card saved ✓";

    hearts();

  } catch (error) {
    $("saveStatus").textContent =
      "Unable to save in this browser. " +
      "Please check browser storage settings.";
  }
}


/* ---------------------------------------------------------
   11.2 Save Christmas Card Button
   --------------------------------------------------------- */

$("saveCard").addEventListener(
  "click",
  collectChristmasCard
);
