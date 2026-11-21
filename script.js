
'use strict';

/* =========================================
   LOVEVERSE ♡ QUỲNH ANH & JAROD
========================================= */


/* =========================================
   1. ANNIVERSARY COLLECTION
========================================= */

const anniversaries = [
  {
    n: 1,
    date: "2026-11-20",
    title: "Love Subscription",
    desc: "A very special renewal notice for our love.",
    icon: "💌",
    tech: "HTML · CSS · JS",
    path: "./projects/firstmonth/index.html",
    color: "#ffe3ec"
  },
  {
    n: 2,
    date: "2026-12-20",
    title: "Girlfriend Customer Support",
    desc: "Submit a support ticket to your very own girlfriend.",
    icon: "☎️",
    tech: "HTML · CSS · JS",
    path: "./projects/secondmonth/index.html",
    color: "#e9e9ff"
  },
  {
    n: 3,
    date: "2027-01-20",
    title: "Girlfriend Vending Machine",
    desc: "Earn Love Coins and discover the sweetest rewards.",
    icon: "🎰",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#e7f3ee"
  },
  {
    n: 4,
    date: "2027-02-20",
    title: "Girlfriend's Secret Laboratory",
    desc: "Mix ingredients and discover unexpected love potions.",
    icon: "🧪",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#fff0d9"
  },
  {
    n: 5,
    date: "2027-03-20",
    title: "Letters From Your Little Girl",
    desc: "Pick your mood and open a little letter from me.",
    icon: "✉️",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#fce5ee"
  },
  {
    n: 6,
    date: "2027-04-20",
    title: "Pocket Quỳnh Anh",
    desc: "Take care of your tiny virtual girlfriend.",
    icon: "🧸",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#e9f3e2"
  },
  {
    n: 7,
    date: "2027-05-20",
    title: "Love Delivery Tracking",
    desc: "Track a mysterious package sent with love.",
    icon: "📦",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#fff0df"
  },
  {
    n: 8,
    date: "2027-06-20",
    title: "The Girlfriend Investigation Bureau",
    desc: "Investigate the case of a stolen heart.",
    icon: "🔎",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#fbe7ed"
  },
  {
    n: 9,
    date: "2027-07-20",
    title: "Love Claw Machine",
    desc: "Grab a little surprise with the claw machine.",
    icon: "🕹️",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#e7ecfa"
  },
  {
    n: 10,
    date: "2027-08-20",
    title: "Love Arcade",
    desc: "Play a collection of tiny games made for you.",
    icon: "🎮",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#fff0df"
  },
  {
    n: 11,
    date: "2027-09-20",
    title: "The Girlfriend Factory",
    desc: "Build your own adorable chibi girlfriend.",
    icon: "🎀",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#eee8fa"
  },
  {
    n: 12,
    date: "2027-10-20",
    title: "Our Little World — Project 365",
    desc: "Explore a little world and uncover a year of secrets.",
    icon: "🏙️",
    tech: "HTML · CSS · JS",
    path: null,
    color: "#f8e6e8"
  }
];


/* =========================================
   2. SPECIAL OCCASIONS
========================================= */

const specials = [
  {
    date: "2026-12-25",
    title: "A Little Gift for You",
    desc: "Unwrap a tiny Christmas surprise from me.",
    icon: "🎄",
    tech: "Holiday Special",
    path: null,
    color: "#ffe3ec"
  },
  {
    date: "2027-01-01",
    title: "Our First New Year Together",
    desc: "A little time capsule of wishes, promises and love for 2027.",
    icon: "✨",
    tech: "New Year Special",
    path: "specials/new-year/index.html",
    color: "#ffe3ec"
  },
  {
    date: "2027-02-06",
    title: "Mission: Become a Vietnamese Son-in-Law",
    desc: "Can you survive your first Vietnamese Tết mission?",
    icon: "🧧",
    tech: "Holiday Special",
    path: null,
    color: "#e7f3ee"
  },
  {
    date: "2027-02-14",
    title: "Cupid Has Resigned",
    desc: "Cupid quit. You are in charge of love now.",
    icon: "💘",
    tech: "Holiday Special",
    path: null,
    color: "#fff0d9"
  },
  {
    date: "2027-04-01",
    title: "The Unclickable Button",
    desc: "Catch the runaway button to claim a kiss.",
    icon: "🃏",
    tech: "Holiday Special",
    path: null,
    color: "#fce5ee"
  },
  {
    date: "2027-05-25",
    title: "The Jarod Experience™",
    desc: "A VIP birthday experience for one very special boy.",
    icon: "👑",
    tech: "Birthday Special",
    path: null,
    color: "#e9f3e2"
  },
  {
    date: "2027-07-06",
    title: "The Kiss Tax Department",
    desc: "An official audit of your unpaid kisses.",
    icon: "💋",
    tech: "Holiday Special",
    path: null,
    color: "#fff0df"
  },
  {
    date: "2027-10-15",
    title: "The Second First Date",
    desc: "Design another first date for the two of us.",
    icon: "🎟️",
    tech: "First Date Anniversary",
    path: null,
    color: "#fbe7ed"
  }
];


/* =========================================
   3. CONFIGURATION & HELPERS
========================================= */

const START = '2026-10-20';

const $ = selector => document.querySelector(selector);

const parseUTC = date =>
    Date.parse(date + 'T00:00:00Z');


function todayISO() {
    const d = new Date();

    return [
        d.getFullYear(),
        String(d.getMonth() + 1).padStart(2, '0'),
        String(d.getDate()).padStart(2, '0')
    ].join('-');
}


function dateText(date) {
    return new Date(parseUTC(date)).toLocaleDateString(
        'en-GB',
        {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
            timeZone: 'UTC'
        }
    );
}


function daysBetween(start, end) {
    return Math.round(
        (parseUTC(end) - parseUTC(start)) / 86400000
    );
}


/* =========================================
   4. RELATIONSHIP COUNTER
========================================= */

function updateClock() {
    const now = todayISO();

    const days = Math.max(
        0,
        daysBetween(START, now)
    );

    $('#day-count').textContent =
        days.toLocaleString('en-US');

    const currentDate = new Date();

    const startDate = new Date(
        START + 'T00:00:00'
    );

    let months =
        (currentDate.getFullYear() - startDate.getFullYear()) * 12 +
        currentDate.getMonth() - startDate.getMonth();

    if (currentDate.getDate() < startDate.getDate()) {
        months--;
    }

    months = Math.max(0, months);

    $('#time-detail').textContent =
        days === 0
            ? 'Our story begins today!'
            : `${months} full months of little moments`;

    $('#year').textContent =
        currentDate.getFullYear();
}



/* =========================================
   5. AUTOMATIC GIFT UNLOCK SYSTEM ♡
========================================= */

// Number of days before the special date.
const EARLY_UNLOCK_DAYS = 2;

// Use France's timezone.
const LOVEVERSE_TIME_ZONE = "Europe/Paris";

function parisTodayISO() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: LOVEVERSE_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());

  const get = type =>
    parts.find(part => part.type === type).value;

  return `${get("year")}-${get("month")}-${get("day")}`;
}

function daysBeforeISO(date, days) {
  const value = new Date(`${date}T12:00:00Z`);

  value.setUTCDate(
    value.getUTCDate() - days
  );

  return value.toISOString().slice(0, 10);
}

function card(item, special = false) {

  const now = parisTodayISO();

  const unlockDate = daysBeforeISO(
    item.date,
    EARLY_UNLOCK_DAYS
  );

  // Has the unlock date arrived?
  const unlockedByDate = now >= unlockDate;

  // Has the actual project been uploaded?
  const hasProject = Boolean(item.path);

  // Both conditions must be true.
  const ready = unlockedByDate && hasProject;

  const el = document.createElement("article");

  el.className = "gift-card";

  el.dataset.state = ready
    ? "available"
    : "upcoming";

  el.style.setProperty(
    "--card-bg",
    ready ? item.color : "#ffe9ef"
  );

  const dateLabel = special
    ? dateText(item.date)
    : `MONTH ${String(item.n).padStart(2, "0")} · ${dateText(item.date)}`;

  let statusLabel;

  if (ready) {
    statusLabel = "UNLOCKED";
  } else if (unlockedByDate) {
    statusLabel = "COMING SOON";
  } else {
    statusLabel = "SECRET";
  }

  // Hide the title before the unlock date.
  const title = unlockedByDate
    ? item.title
    : "A Secret Little Surprise ♡";

  let description;

  if (ready) {
    description = item.desc;
  } else if (unlockedByDate) {
    description =
      "Your little programmer is preparing something special just for you. A little more patience, please! ♡";
  } else {
    description =
      `Psst... a surprise is coming! Unlocks ${dateText(unlockDate)} ♡`;
  }

  const icon = unlockedByDate
    ? item.icon
    : "🎁";

  const tech = ready
    ? item.tech
    : "TOP SECRET ♡";

  el.innerHTML = `
    <div class="gift-visual">
      <span class="gift-emoji" aria-hidden="true">
        ${icon}
      </span>
    </div>

    <div class="gift-body">

      <div class="gift-meta">
        <span>${dateLabel}</span>

        <span class="status ${ready ? "ready" : ""}">
          ${statusLabel}
        </span>
      </div>

      <h3>${title}</h3>

      <p>${description}</p>

      <div class="gift-bottom">
        <span class="tech">${tech}</span>
      </div>

    </div>
  `;

  const bottom = el.querySelector(".gift-bottom");

  if (ready) {

    const link = document.createElement("a");

    link.className = "open-gift";
    link.href = item.path;

    link.textContent = "Open gift ♡";

    bottom.append(link);

  } else {

    const button = document.createElement("button");

    button.className = "open-gift";
    button.type = "button";
    button.disabled = true;

    button.textContent = unlockedByDate
      ? "Still making magic ✨"
      : "Locked 🔒";

    bottom.append(button);
  }

  return el;
}



/* =========================================
   6. RENDER GIFT COLLECTIONS
========================================= */


function render() {
  const anniversaryGrid = $("#anniversary-grid");
  const specialGrid = $("#special-grid");
  const extrasGrid = $("#extras-grid");

  anniversaryGrid?.replaceChildren(
    ...anniversaries.map(item => card(item))
  );

  specialGrid?.replaceChildren(
    ...specials.map(item => card(item, true))
  );

  extrasGrid?.replaceChildren(
    ...littleExtras.map(item => extraCard(item))
  );

  const activeFilter =
    $(".filter.active")?.dataset.filter || "all";

  applyFilter(activeFilter);
}


/* =========================================
   LITTLE EXTRAS ♡
========================================= */

const littleExtras = [
  {
    title: "How to Deal with Your Dramatic Girlfriend",
    desc: "The official survival guide for Mr. Jarod Mendes. 28 pages of girlfriend secrets, operating modes, and lifetime love warranty.",
    icon: "📖",
    tech: "Girlfriend Manual · Canva",
    path: "https://canva.link/86rmepps8f7yju7",
    color: "#ffe3ec"
  }
];


function extraCard(item) {
  const el = document.createElement("article");

  el.className = "gift-card";
  el.dataset.state = "available";

  el.style.setProperty("--card-bg", item.color);

  el.innerHTML = `
    <div class="gift-visual">
      <span class="gift-emoji" aria-hidden="true">
        ${item.icon}
      </span>
    </div>

    <div class="gift-body">
      <div class="gift-meta">
        <span>LITTLE EXTRAS ♡</span>
        <span class="status ready">AVAILABLE</span>
      </div>

      <h3>${item.title}</h3>
      <p>${item.desc}</p>

      <div class="gift-bottom">
        <span class="tech">${item.tech}</span>

        <a
          class="open-gift"
          href="${item.path}"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read Manual ♡
        </a>
      </div>
    </div>
  `;

  return el;
}




/* =========================================
   7. ANNIVERSARY FILTERS
========================================= */

function applyFilter(filter) {
    document
        .querySelectorAll('#anniversary-grid .gift-card')
        .forEach(cardElement => {

            cardElement.hidden =
                filter !== 'all' &&
                cardElement.dataset.state !== filter;

        });
}


document.querySelectorAll('.filter').forEach(button => {

    button.addEventListener('click', () => {

        document.querySelectorAll('.filter').forEach(
            item => item.classList.remove('active')
        );

        button.classList.add('active');

        applyFilter(button.dataset.filter);
    });
});


/* =========================================
   8. 100 LITTLE LOVE NOTES ♡
========================================= */

const notes = [

    // 01–15: SWEET LITTLE THINGS ♡

    "Out of 8 billion people, somehow I found my favourite one. It's you. ♡",

    "You make my ordinary days feel a little more magical. ✨",

    "I don't need a perfect day. I just need a little time with you.",

    "You're my favourite person to do absolutely nothing with.",

    "I hope you know how happy your little girl gets when she sees your name on her phone. 💗",

    "If I could choose again, I'd still choose to meet you.",

    "I think my heart smiles a little whenever I think about you.",

    "You're one of my favourite things about living in Toulouse.",

    "Sometimes I randomly smile because I remember something silly we did together.",

    "I wish I could put all my hugs into a tiny box and send them to you.",

    "You're my favourite hello and my least favourite goodbye.",

    "Being with you makes even a boring day feel special.",

    "I like the version of myself that smiles so much around you.",

    "If happiness had a notification sound, it would probably be your message arriving.",

    "Just a little reminder that someone thinks you're very, very special. ♡",


    // 16–30: CLINGY GIRLFRIEND MODE 🧸

    "Warning: your girlfriend is currently experiencing a severe hug deficiency. 🥺",

    "Daddyyyy~ your little girl requires immediate attention. This is a very serious emergency.",

    "I don't want much. Just your attention, your hugs, your kisses... okay, maybe that's a lot. 🎀",

    "If I were next to you right now, I'd probably be stealing your arm to cuddle.",

    "Your girlfriend has entered clingy mode. There is no estimated recovery time.",

    "Can I borrow one hug? I promise to return it with interest. 💞",

    "Sometimes I just want to hide my face in your chest and stay there.",

    "My favourite place to be is somewhere close enough to annoy you.",

    "I miss you a normal amount. By normal, I mean an extremely unreasonable amount.",

    "Please remember to recharge your girlfriend with hugs. Battery critically low. 🔋",

    "If I suddenly hug your arm, please understand that it belongs to me for the next five minutes.",

    "I wish I could teleport to you, give you a kiss, and teleport back before you noticed.",

    "Your little girl would like to request five minutes of cuddles. Extensions are highly encouraged.",

    "I don't always need advice. Sometimes I just need my favourite boy to hold me.",

    "If you hear 'Daddyyyy~' in your imagination, that's probably me missing you. ♡",


    // 31–45: SILLY & TEASING 😼

    "Congratulations! You've officially been selected as my favourite victim of affection.",

    "You're cute. Unfortunately, I am legally required to annoy cute people.",

    "I was going to behave today, but then I remembered I have a boyfriend to tease.",

    "If I steal your hoodie, it's not theft. It's girlfriend tax.",

    "I think you should receive an award for tolerating my nonsense. 🏆",

    "You're very handsome. Please don't let this information make you too confident.",

    "Sometimes I look at you and think: wow, that's MY idiot. Affectionately, of course. ♡",

    "I promise to be a good girl today. Terms and conditions may apply.",

    "You have two options: give me a kiss or give me two kisses. Choose wisely.",

    "I think I'm a very reasonable girlfriend. My only unreasonable request is unlimited affection.",

    "I would never annoy you on purpose. Okay, maybe just a tiny little bit. 😇",

    "If I bite your arm, please interpret it as a highly sophisticated love language.",

    "Your girlfriend is small, cute, and occasionally a public safety hazard.",

    "I was perfectly normal before I met you. Actually... no, I wasn't.",

    "I like you so much that I'm willing to share my snacks. That's serious. 🍓",


    // 46–60: LITTLE IT GIRL 💻

    "If love were a programming language, you'd be my favourite line of code.",

    "You're the only bug in my life that I never want to fix. 🐛",

    "My heart runs a very simple algorithm: see Jarod → smile → repeat.",

    "I tried to debug my feelings, but every variable keeps pointing to you.",

    "You have successfully installed yourself into my daily thoughts. Uninstall unavailable.",

    "My love for you has O(∞) complexity. Please don't ask me to optimize it.",

    "Relationship status: connected. Signal strength: maximum. ♡",

    "If I had a database of favourite people, you'd be the primary key.",

    "You're the exception I never want my heart to handle.",

    "I built you a website because apparently saying 'I like you' wasn't nerdy enough.",

    "You're my favourite notification, even when my code is throwing 47 errors.",

    "My brain has 100 tabs open, and somehow 99 of them are about you.",

    "I think my heart has a memory leak. It keeps storing more and more moments with you.",

    "You make my dopamine levels behave like an overfitted machine learning model.",

    "Error 404: Girlfriend's motivation not found. Suggested fix: one kiss from Jarod. 💋",


    // 61–75: MISSING YOU 🌙

    "I wish the distance between us could be measured in seconds instead of kilometres.",

    "If you're reading this while we're apart, imagine me giving you a tiny forehead kiss.",

    "Sometimes I wish I could pause time when we're together.",

    "I hope your day is going well. Somewhere, your little girl is cheering for you.",

    "I miss your hugs. They're much better than my blanket.",

    "I wonder what you're doing right now. Hopefully thinking about your extremely adorable girlfriend.",

    "The best part of a busy week is knowing I might get to see you at the end of it.",

    "I wish I could send you a real kiss through this screen. Technology is disappointing.",

    "If today feels long, remember there's a little girl looking forward to seeing you again.",

    "I like our random conversations almost as much as our dates.",

    "Good morning, my favourite boy. I hope something makes you smile today. ☀️",

    "Good night, Jarod. Consider this a tiny virtual cuddle from me. 🌙",

    "Sometimes I don't have anything important to say. I just want to talk to you.",

    "I hope the next time we say goodbye, the next hello comes very quickly.",

    "I can't wait to collect more little memories with you. ♡",


    // 76–90: COMFORT & ENCOURAGEMENT 🌷

    "In case nobody told you today: I'm proud of you.",

    "You don't have to be productive every second. You're allowed to rest, handsome.",

    "I hope you remember that you're appreciated, even on the days when you feel exhausted.",

    "If the world feels too loud today, I hope you find a little peace.",

    "I believe in you, even when things don't go exactly as planned.",

    "You're allowed to have bad days. I'll still think you're wonderful.",

    "Don't forget to drink water and eat something, okay? Your girlfriend is watching. 👀",

    "You work hard, and I hope you give yourself credit for that.",

    "If you need a break, imagine us doing something silly together.",

    "I hope today gives you at least one reason to smile. If not, here's one: 🧸",

    "You don't need to impress me every day. I like the ordinary you, too.",

    "Whatever happens today, I hope you remember how much you matter.",

    "I wish I could take a little bit of your stress away and replace it with cuddles.",

    "Even the strongest boys deserve gentle hugs sometimes.",

    "Your little programmer is sending you +100 confidence and +200 affection. ✨",


    // 91–100: OUR LITTLE FUTURE 💌

    "I wonder how many more silly stories we'll have to tell someday.",

    "I hope we keep finding new little adventures together.",

    "One day, I want us to look back at this website and laugh at how ridiculously cute it was.",

    "I want to discover more of your favourite foods, places, songs, and little habits.",

    "I don't know every chapter of our story yet, but I'm enjoying writing this one with you.",

    "I hope we keep learning how to understand each other a little better every day.",

    "There are so many places I haven't visited yet. I hope some of them become our memories.",

    "I want more ordinary afternoons, spontaneous dates, and ridiculous conversations with you.",

    "If you ever wonder why I made this little universe, the answer is simple: you make me want to create cute things.",

    "And if you've read all 100 notes... surprise! Your little girl still has more love to give. ♡"
];


/* =========================================
   9. LITTLE NOTES — SHUFFLE SYSTEM

   All 100 notes appear before repeating.
========================================= */

let remainingNotes = [];
let lastNoteIndex = -1;


function shuffleNotes() {
    remainingNotes = notes.map((_, index) => index);

    for (let i = remainingNotes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [remainingNotes[i], remainingNotes[j]] =
            [remainingNotes[j], remainingNotes[i]];
    }

    // Avoid repeating the last note across cycles.
    if (
        remainingNotes.length > 1 &&
        remainingNotes[remainingNotes.length - 1] === lastNoteIndex
    ) {
        [remainingNotes[0], remainingNotes[remainingNotes.length - 1]] =
            [remainingNotes[remainingNotes.length - 1], remainingNotes[0]];
    }
}


document.querySelector('#new-note').addEventListener('click', () => {
    if (remainingNotes.length === 0) {
        shuffleNotes();
    }

    const index = remainingNotes.pop();

    lastNoteIndex = index;

    const noteElement = document.querySelector('#love-note');

    noteElement.style.opacity = '0';

    setTimeout(() => {
        noteElement.textContent = notes[index];
        noteElement.style.opacity = '1';
    }, 180);
});


/* =========================================
   10. TOAST NOTIFICATIONS
========================================= */

let toastTimer;

function toast(message) {
    const element = $('#toast');

    element.textContent = message;
    element.classList.add('visible');

    clearTimeout(toastTimer);

    toastTimer = setTimeout(() => {
        element.classList.remove('visible');
    }, 2600);
}


/* =========================================
   11. DIGITAL KISSES & FLOATING HEARTS
========================================= */

let kisses = 0;

$('#kiss-button').addEventListener('click', event => {

    kisses++;

    const kissLabel =
        kisses === 1 ? 'kiss' : 'kisses';

    $('#kiss-count').textContent =
        `${kisses} ${kissLabel} sent this visit`;

    toast('Mwah! One little kiss delivered ♡');

    const rect =
        event.currentTarget.getBoundingClientRect();

    for (let i = 0; i < 20; i++) {

        const heart = document.createElement('span');

        heart.className = 'floating-heart';

        heart.textContent =
            ['♡', '♥', '✦'][i % 3];

        heart.style.color =
            ['#e98fa8', '#dba4bb', '#e2c390'][i % 3];

        heart.style.left =
            (
                rect.left +
                rect.width / 2 +
                (Math.random() - 0.5) * 190
            ) + 'px';

        heart.style.top =
            (rect.top + Math.random() * 35) + 'px';

        heart.style.animationDelay =
            (Math.random() * 0.4) + 's';

        document.body.append(heart);

        setTimeout(() => {
            heart.remove();
        }, 2500);
    }
});


/* =========================================
   12. ACTIVE SIDEBAR NAVIGATION
========================================= */

const sections = [
    ...document.querySelectorAll('main section[id]')
];

const observer = new IntersectionObserver(
    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                document.querySelectorAll('.nav-link')
                    .forEach(link => {

                        link.classList.toggle(
                            'active',
                            link.hash === '#' + entry.target.id
                        );

                    });
            }

        });

    },
    {
        rootMargin: '-20% 0px -65% 0px'
    }
);

sections.forEach(section => {
    observer.observe(section);
});


/* =========================================
   13. INITIALIZATION
========================================= */

updateClock();
render();

// Refresh dates and gift availability every minute.
setInterval(() => {
    updateClock();
    render();
}, 60000);

// Refresh when the user returns to the tab.
document.addEventListener('visibilitychange', () => {

    if (!document.hidden) {
        updateClock();
        render();
    }

});



/* =========================================
   14. LOVE POST OFFICE ♡
========================================= */

const LOVE_MAIL_EMAIL =
  "quinnann.hoang.2010@gmail.com";

const loveMailForm =
  document.querySelector("#love-mail-form");

const noteInput =
  document.querySelector("#jarod-note");

const noteLength =
  document.querySelector("#note-length");

const mailStatus =
  document.querySelector("#mail-status");

const sendMailButton =
  document.querySelector("#send-love-note");

noteInput?.addEventListener("input", () => {
  if (noteLength) {
    noteLength.textContent =
      `${noteInput.value.length} / 2000`;
  }
});

function setLoveMailField(form, name, value) {

  let field = Array.from(
    form.querySelectorAll('input[type="hidden"]')
  ).find(input => input.name === name);

  if (!field) {
    field = document.createElement("input");
    field.type = "hidden";
    field.name = name;
    form.appendChild(field);
  }

  field.value = value;
}

loveMailForm?.addEventListener("submit", event => {

  event.preventDefault();

  const message = noteInput?.value.trim() || "";

  if (!message) {
    if (mailStatus) {
      mailStatus.textContent =
        "Write a little something first, handsome! ♡";
    }

    noteInput?.focus();
    return;
  }

  const stamp =
    loveMailForm.querySelector(
      'input[name="stamp"]:checked'
    )?.value || "💗";

  const subject =
    `${stamp} A Little Love Letter from Jarod`;

  const body =
`Dear Quỳnh Anh,

${message}

Love,
Jarod ♡

Sent with love from our little Loveverse ${stamp}`;

  loveMailForm.action =
    `https://formsubmit.co/${LOVE_MAIL_EMAIL}`;

  loveMailForm.method = "POST";
  loveMailForm.target = "_self";

  const thankYouURL =
    "https://quinnann2010.github.io/QAloveJM/thank-you.html";

  setLoveMailField(
    loveMailForm,
    "_subject",
    subject
  );

  setLoveMailField(
    loveMailForm,
    "_next",
    thankYouURL
  );

  setLoveMailField(
    loveMailForm,
    "_template",
    "table"
  );

  setLoveMailField(
    loveMailForm,
    "_captcha",
    "true"
  );

  setLoveMailField(
    loveMailForm,
    "message",
    body
  );

  setLoveMailField(
    loveMailForm,
    "From",
    "Jarod — Loveverse"
  );

  setLoveMailField(
    loveMailForm,
    "Stamp",
    stamp
  );
  

  // Avoid duplicate message fields.
  if (noteInput?.name === "message") {
    noteInput.name = "loveverse_draft";
  }

  if (mailStatus) {
    mailStatus.textContent =
      "Sending your letter... 💌";
  }

  if (sendMailButton) {
    sendMailButton.disabled = true;
  }

  // Submit the actual HTML form.
  HTMLFormElement.prototype.submit.call(
    loveMailForm
  );
});



/* =========================================
   SHARED LOVE WALLET — ALL CHAPTERS
   Keep legacy M02 storage to preserve vouchers.
========================================= */
const LOVE_WALLET_KEY = "loveverse_m02_rewards_v1";
const LOVE_WALLET_EMAIL = "quinnann.hoang.2010@gmail.com";
const LOVE_WALLET_THANKS = "https://quinnann2010.github.io/QAloveJM/thank-you.html";

function walletRead() {
  try {
    const items = JSON.parse(localStorage.getItem(LOVE_WALLET_KEY) || "[]");
    return Array.isArray(items) ? items : [];
  } catch { return []; }
}
function walletSave(items) {
  localStorage.setItem(LOVE_WALLET_KEY, JSON.stringify(items));
}
function walletEscape(value) {
  return String(value ?? "").replace(/[&<>"']/g, c =>
    ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
}
function walletRender() {
  const list = document.getElementById("love-wallet-list");
  const summary = document.getElementById("wallet-summary");
  if (!list || !summary) return;
  const rewards = walletRead();
  const available = rewards.filter(r => !r.redeemed).length;
  summary.textContent = `${rewards.length} collected ♡  ·  ${available} available`;
  list.innerHTML = rewards.length ? rewards.map(r => {
    const pending = r.status === "pending_approval" || r.redeemed;
    return `<article class="wallet-voucher">
      <div class="wallet-voucher-top"><span>🎟️ LOVEVERSE REWARD</span><span>${pending ? "💌 REQUESTED" : "✨ AVAILABLE"}</span></div>
      <h3>${walletEscape(r.title)}</h3>
      <p>${pending ? "Request submitted · awaiting girlfriend confirmation" : "A little gift from your girlfriend, just for you ♡"}</p>
      <small>Voucher ID: ${walletEscape(r.id)}</small>
      ${pending ? "" : `<button class="wallet-redeem" data-wallet-redeem="${walletEscape(r.id)}">Request Redemption ♡</button>`}
    </article>`;
  }).join("") : `<div class="wallet-empty">🎀<h3>No vouchers yet!</h3><p>Explore our chapters to collect your first little surprise. ♡</p></div>`;
}
function walletOpen(id) {
  const reward = walletRead().find(r => r.id === id && !r.redeemed);
  if (!reward) return;
  const naughty = reward.title === "One Naughty Wish 😈";
  const body = document.getElementById("wallet-dialog-body");
  body.innerHTML = `<div class="wallet-modal-head">💌<h2>${walletEscape(reward.title)}</h2>
    <p>${naughty ? "So, Mr. Mendes... what's your one naughty little wish? 😈💋" : "Tell your girlfriend how you'd like to use this little reward."}</p></div>
    <form id="wallet-redeem-form" data-voucher="${walletEscape(reward.id)}">
    ${naughty ? `<label>Your secret wish ♡<textarea name="wish" maxlength="1500" required placeholder="Dear girlfriend, my one naughty wish is..."></textarea></label>`
    : `<label>Preferred date<input name="day" type="date" required></label>
       <label>Preferred time<input name="time" type="time" required></label>
       <label>Where?<select name="place"><option>Your place</option><option>My place</option><option>To be decided</option><option>Other</option></select></label>
       <label>What would you like us to do?<textarea name="plan" maxlength="1500" placeholder="Your ideal plan..."></textarea></label>`}
    <p class="wallet-note">This is a request, not automatic approval. Mutual consent always matters. ♡</p>
    <p class="wallet-error" id="wallet-error" role="status"></p>
    <button type="submit" class="wallet-redeem">Send My Request 💌</button></form>`;
  document.getElementById("wallet-dialog").showModal();
}
document.addEventListener("click", e => {
  const button = e.target.closest("[data-wallet-redeem]");
  if (button) walletOpen(button.dataset.walletRedeem);
  if (e.target.id === "wallet-close") document.getElementById("wallet-dialog").close();
});
document.getElementById("wallet-dialog")?.addEventListener("click", e => {
  if (e.target.id === "wallet-dialog") e.target.close();
});
document.addEventListener("submit", e => {
  if (e.target.id !== "wallet-redeem-form") return;
  e.preventDefault();
  const form = e.target, id = form.dataset.voucher;
  const rewards = walletRead();
  const reward = rewards.find(r => r.id === id && !r.redeemed);
  if (!reward) return;
  const naughty = reward.title === "One Naughty Wish 😈";
  const data = new FormData(form);
  const error = document.getElementById("wallet-error");
  if (!naughty && new Date(`${data.get("day")}T${data.get("time")}`) <= new Date()) {
    error.textContent = "Please choose a future date and time ♡"; return;
  }
  const message = naughty
    ? `ONE NAUGHTY WISH — PRIVATE REQUEST 😈💋\nVoucher: ${reward.title}\nVoucher ID: ${id}\n\nJarod's naughty wish:\n${data.get("wish")}\n\nStatus: Pending Girlfriend Approval\nMutual consent required.`
    : `VOUCHER REDEMPTION REQUEST\nVoucher: ${reward.title}\nVoucher ID: ${id}\n\nPreferred date: ${data.get("day")}\nPreferred time: ${data.get("time")}\nLocation: ${data.get("place")}\nRequested plan: ${data.get("plan") || "To be decided"}\n\nAwaiting mutual confirmation.`;
  const submit = form.querySelector('[type="submit"]');
  submit.disabled = true;
  submit.textContent = "Preparing your request... 💌";
  // Save attempted request before navigation, consistent with original M02 behavior.
  reward.redeemed = true;
  reward.status = "pending_approval";
  reward.requestedAt = new Date().toISOString();
  try {
    walletSave(rewards);
    const post = document.createElement("form");
    post.method = "POST";
    post.action = "https://formsubmit.co/" + LOVE_WALLET_EMAIL;
    post.target = "_self";
    post.style.display = "none";
    const fields = {
      _subject: `💌 Loveverse — ${reward.title} — ${id}`,
      _next: LOVE_WALLET_THANKS,
      _template: "table",
      _captcha: "false",
      From: "Jarod — Loveverse Love Wallet",
      "Voucher ID": id,
      Category: reward.title,
      message
    };
    Object.entries(fields).forEach(([name, value]) => {
      const input = document.createElement("input");
      input.type = "hidden"; input.name = name; input.value = value;
      post.appendChild(input);
    });
    document.body.appendChild(post);
    HTMLFormElement.prototype.submit.call(post);
  } catch (err) {
    reward.redeemed = false;
    delete reward.status;
    delete reward.requestedAt;
    try { walletSave(rewards); } catch {}
    error.textContent = "Couldn't prepare request: " + err.message;
    submit.disabled = false;
    submit.textContent = "Send My Request 💌";
  }
});
window.addEventListener("pageshow", walletRender);
window.addEventListener("storage", walletRender);
walletRender();
