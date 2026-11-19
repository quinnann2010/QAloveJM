
'use strict';

/* =========================================
   LOVEVERSE ♡ QUỲNH ANH & JAROD

   Repository structure:

   QAloveJM/
   ├── index.html
   ├── style.css
   ├── script.js
   ├── assets/
   └── projects/
       ├── firstmonth/
       │   ├── index.html
       │   ├── style.css
       │   └── script.js
       ├── secondmonth/
       └── ...

   path: null = unfinished / secret gift
   path: './projects/folder/index.html'
         = completed gift

   Month 01 is always unlocked.
========================================= */


/* =========================================
   ANNIVERSARY COLLECTION
========================================= */

const anniversaries = [
    {
        n: 1,
        date: '2026-11-20',
        title: 'Love Subscription',
        desc: 'An adorable renewal notice for a love that deserves a lifetime subscription.',
        icon: '💌',
        tech: 'HTML · CSS · JS',
        path: './projects/firstmonth/index.html',
        color: '#ffe3ec'
    },
    {
        n: 2,
        date: '2026-12-20',
        title: 'LoveOS',
        desc: 'A tiny desktop with little apps and surprises, made just for you.',
        icon: '💻',
        tech: 'JavaScript',
        path: null,
        color: '#e9e9ff'
    },
    {
        n: 3,
        date: '2027-01-20',
        title: 'Us Wrapped',
        desc: 'Our first three months, told through cute charts and little statistics.',
        icon: '📊',
        tech: 'Python · Plotly',
        path: null,
        color: '#e7f3ee'
    },
    {
        n: 4,
        date: '2027-02-20',
        title: 'Girlfriend Vending Machine',
        desc: 'Exchange love coins for kisses, dates, and very special coupons.',
        icon: '🎟️',
        tech: 'Java · Spring',
        path: null,
        color: '#fff0d9'
    },
    {
        n: 5,
        date: '2027-03-20',
        title: 'Letters From Your Little Girl',
        desc: 'Pick a mood and receive a little love letter made for you.',
        icon: '✉️',
        tech: 'Python · Pillow',
        path: null,
        color: '#fce5ee'
    },
    {
        n: 6,
        date: '2027-04-20',
        title: 'Love Passport',
        desc: 'A scrapbook map of all the places our story takes us.',
        icon: '🗺️',
        tech: 'Python · Folium',
        path: null,
        color: '#e9f3e2'
    },
    {
        n: 7,
        date: '2027-05-20',
        title: 'Jarod.exe',
        desc: 'A very scientific boyfriend system check — with a birthday surprise.',
        icon: '🎂',
        tech: 'Python · JS',
        path: null,
        color: '#fff0df'
    },
    {
        n: 8,
        date: '2027-06-20',
        title: 'Pocket Quỳnh Anh',
        desc: 'Your own tiny virtual girlfriend, with hugs and lots of personality.',
        icon: '🧸',
        tech: 'Java · OOP',
        path: null,
        color: '#fbe7ed'
    },
    {
        n: 9,
        date: '2027-07-20',
        title: 'Girlfriend Mood Decoder',
        desc: 'A playfully trained model to decode your little programmer.',
        icon: '🧠',
        tech: 'Python · ML',
        path: null,
        color: '#e7ecfa'
    },
    {
        n: 10,
        date: '2027-08-20',
        title: 'Recipe for Us',
        desc: 'Our favourite meals, recipes, and cooking memories.',
        icon: '🍓',
        tech: 'Python · SQLite',
        path: null,
        color: '#fff0df'
    },
    {
        n: 11,
        date: '2027-09-20',
        title: 'Our Little Photobooth',
        desc: 'Make photo strips with frames, stickers, and our memories.',
        icon: '📸',
        tech: 'JS · Pillow',
        path: null,
        color: '#eee8fa'
    },
    {
        n: 12,
        date: '2027-10-20',
        title: 'Museum of Us',
        desc: 'A little museum for our first year, one memory at a time.',
        icon: '🏛️',
        tech: 'Web · Python',
        path: null,
        color: '#f8e6e8'
    }
];


/* =========================================
   SPECIAL OCCASIONS
========================================= */

const specials = [
    {
        date: '2026-12-25',
        title: 'Our Little Christmas',
        desc: 'A tiny festive surprise, wrapped in pixels and love.',
        icon: '🎄',
        tech: 'Holiday special',
        path: null,
        color: '#e8f3e6'
    },
    {
        date: '2027-02-06',
        title: 'Lucky Love Envelope',
        desc: 'A little Vietnamese Tết gift, just for you.',
        icon: '🧧',
        tech: 'Lunar New Year',
        path: null,
        color: '#fff0df'
    },
    {
        date: '2027-02-14',
        title: "Cupid's Delivery Service",
        desc: 'A mysterious Valentine package from your little girl.',
        icon: '💘',
        tech: "Valentine's Day",
        path: null,
        color: '#ffe3ec'
    },
    {
        date: '2027-05-25',
        title: 'Jarod Appreciation Awards',
        desc: 'A very exclusive birthday ceremony celebrating you.',
        icon: '🏆',
        tech: "Jarod's birthday",
        path: null,
        color: '#fff0d9'
    },
    {
        date: '2027-10-20',
        title: "Your Girlfriend's Birthday Quest",
        desc: 'A tiny quest with a very cute birthday wishlist.',
        icon: '🎀',
        tech: "Quỳnh Anh's birthday",
        path: null,
        color: '#f7e7f4'
    },
    {
        date: '2027-10-31',
        title: 'The Haunted Love House',
        desc: 'A silly little haunted house full of heart-shaped mysteries.',
        icon: '👻',
        tech: 'Halloween',
        path: null,
        color: '#eee8fa'
    }
];


/* =========================================
   CONFIGURATION & HELPERS
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
   RELATIONSHIP COUNTER
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
   SECRET GIFT CARD SYSTEM

   MONTH 01:
   - Always unlocked
   - Opens firstmonth/index.html directly

   OTHER PROJECTS:
   - path exists = unlocked
   - path null = secret

   No date restriction for completed gifts.
========================================= */

function card(item, special = false) {
    const now = todayISO();

    const published = item.date <= now;

    const isFirstMonth =
        !special && item.n === 1;

    const ready = isFirstMonth
        ? true
        : Boolean(item.path);

    const el = document.createElement('article');

    el.className = 'gift-card';

    el.dataset.state =
        ready ? 'available' : 'upcoming';

    el.style.setProperty(
        '--card-bg',
        ready ? item.color : '#ffe9ef'
    );

    const dateLabel = special
        ? dateText(item.date)
        : `MONTH ${String(item.n).padStart(2, '0')} · ${dateText(item.date)}`;

    const statusLabel = ready
        ? 'UNLOCKED'
        : published
            ? 'IN PROGRESS'
            : 'SECRET';

    const title = ready
        ? item.title
        : 'A Secret Little Surprise ♡';

    const description = ready
        ? item.desc
        : published
            ? 'Your little programmer is preparing something special just for you. A little more patience, please! ♡'
            : 'Psst... this one is still a secret! Come back on our special day to see what your little girl has made.';

    const icon = ready
        ? item.icon
        : '🎁';

    const tech = ready
        ? item.tech
        : 'TOP SECRET ♡';

    el.innerHTML = `
        <div class="gift-visual">
            <span class="gift-emoji" aria-hidden="true">
                ${icon}
            </span>
        </div>

        <div class="gift-body">

            <div class="gift-meta">
                <span>${dateLabel}</span>

                <span class="status ${ready ? 'ready' : ''}">
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

    const bottom = el.querySelector('.gift-bottom');

    if (ready) {
        const link = document.createElement('a');

        link.className = 'open-gift';

        // Open the HTML file directly.
        // Works locally and on GitHub Pages.
        link.href = isFirstMonth
            ? './projects/firstmonth/index.html'
            : item.path;

        link.textContent = 'Open gift ♡';

        bottom.append(link);

    } else {
        const button = document.createElement('button');

        button.className = 'open-gift';
        button.type = 'button';
        button.disabled = true;

        button.textContent = published
            ? 'Still making magic ✨'
            : 'Locked 🔒';

        bottom.append(button);
    }

    return el;
}


/* =========================================
   RENDER GIFT COLLECTIONS
========================================= */

function render() {
    const anniversaryGrid = $('#anniversary-grid');
    const specialGrid = $('#special-grid');

    anniversaryGrid.replaceChildren(
        ...anniversaries.map(item => card(item))
    );

    specialGrid.replaceChildren(
        ...specials.map(item => card(item, true))
    );

    const activeFilter =
        $('.filter.active')?.dataset.filter || 'all';

    applyFilter(activeFilter);
}


/* =========================================
   ANNIVERSARY FILTERS
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
   100 LITTLE LOVE NOTES ♡
   Made by your little programmer
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
   LITTLE NOTES — SHUFFLE SYSTEM
   All 100 notes appear before repeating
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
   TOAST NOTIFICATIONS
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
   DIGITAL KISSES & FLOATING HEARTS
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
   ACTIVE SIDEBAR NAVIGATION
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
   INITIALIZATION
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
   LOVE POST OFFICE ♡
========================================= */

const LOVE_MAIL_EMAIL = 'quinnann.hoang.2010@gmail.com';

const loveMailForm = document.querySelector('#love-mail-form');
const noteInput = document.querySelector('#jarod-note');
const noteLength = document.querySelector('#note-length');
const mailStatus = document.querySelector('#mail-status');
const sendMailButton = document.querySelector('#send-love-note');

noteInput.addEventListener('input', () => {
    noteLength.textContent =
        `${noteInput.value.length} / 2000`;
});

loveMailForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    if (!noteInput.value.trim()) {
        mailStatus.textContent =
            'Write a little something first, handsome! ♡';
        return;
    }

    if (LOVE_MAIL_EMAIL === 'YOUR_EMAIL@example.com') {
        mailStatus.textContent =
            'Love Mail is not configured yet. ♡';
        return;
    }

    const stamp = loveMailForm.querySelector(
        'input[name="stamp"]:checked'
    ).value;

    const payload = {
        name: 'Jarod ♡',
        message: noteInput.value.trim(),
        stamp: stamp,
        _subject: '💌 New Loveverse note from Jarod!',
        _captcha: 'true',
        _template: 'table'
    };

    sendMailButton.disabled = true;
    sendMailButton.textContent = 'Sending your love... 💌';
    mailStatus.textContent = '';

    try {
        const response = await fetch(
            `https://formsubmit.co/ajax/${encodeURIComponent(LOVE_MAIL_EMAIL)}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            }
        );

        const result = await response.json();

        if (!response.ok || result.success === false ||
            result.success === 'false') {
            throw new Error('Mail submission failed');
        }

        mailStatus.textContent =
            'Your little love letter has been sent! 💗';

        loveMailForm.reset();
        noteLength.textContent = '0 / 2000';

        // Cute floating hearts
        for (let i = 0; i < 18; i++) {
            const heart = document.createElement('span');

            heart.className = 'floating-heart';
            heart.textContent = ['💗', '♡', '✦'][i % 3];

            const rect =
                sendMailButton.getBoundingClientRect();

            heart.style.left =
                (rect.left + Math.random() * rect.width) + 'px';

            heart.style.top =
                (rect.top + Math.random() * rect.height) + 'px';

            document.body.appendChild(heart);

            setTimeout(() => heart.remove(), 2500);
        }

    } catch (error) {
        mailStatus.textContent =
            'Oops! The letter could not be sent. Please try again. 💌';
    } finally {
        sendMailButton.disabled = false;
        sendMailButton.textContent =
            'Send to my little girl 💌';
    }
});
