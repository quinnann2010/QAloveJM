
'use strict';

/* LOVEVERSE MEMORY MUSEUM ♡
   Add memories here. No need to change the HTML.
   Images are stored in assets/memories/ at the Loveverse root.
   Image paths are relative to memories/index.html.
   Example: photo: '../assets/memories/our-picture.jpg'
   Leave photo: '' to display a cute placeholder.
*/

const memories = [
  {
    id: 'getting-ready',
    date: '2026-10-15',
    title: 'Before Our First Date',
    subtitle: 'A little mirror selfie before meeting you ♡',
    photos: ['../assets/memories/getting-ready.jpg'],
    photo: '../assets/memories/getting-ready.jpg',
    emoji: '🌷',
    story: 'This was me getting ready to see you for the first time. A little photo from the very beginning of our story.',
    detail: '15 October 2026 · Before our first date',
    featured: true
  },
  {
    id: 'first-sunset',
    date: '2026-10-27',
    title: 'Our First Sunset Together',
    subtitle: 'A sunset I wanted to remember 🌅',
    photos: [
      '../assets/memories/first-sunset.jpg',
      '../assets/memories/sunset-group.jpg',
      '../assets/memories/sunset-kiss.jpg',
      '../assets/memories/sunset-closeup.jpg'
    ],
    photo: '../assets/memories/first-sunset.jpg',
    emoji: '🌅',
    story: 'The first time we watched the sunset together. The sky was beautiful, and this moment deserved a little place in our museum.',
    detail: '',
    featured: true
  },
  {
    id: 'family-dinner',
    date: '2026-10-27',
    title: 'Our First Dinner with Việt Anh & Thu',
    subtitle: 'A little evening with family ♡',
    photos: [
      '../assets/memories/family-dinner.jpg',
      '../assets/memories/dinner-jarod.jpg',
      '../assets/memories/dinner-kiss.jpg'
    ],
    photo: '../assets/memories/family-dinner.jpg',
    emoji: '🍽️',
    story: 'Our first meal together with my younger brother Việt Anh and his girlfriend Thu. One of our early little milestones.',
    detail: '',
    featured: true
  },
  {
    id: 'first-visit',
    date: '',
    title: 'My First Visit to Your Home',
    subtitle: 'And a plate of something delicious 🥐',
    photos: ['../assets/memories/first-visit.jpg'],
    photo: '../assets/memories/first-visit.jpg',
    emoji: '🏡',
    story: 'The first time I came over to your place. I kept this little food photo as a reminder of that visit.',
    detail: '',
    featured: true
  },
  {
    id: 'temple-date',
    date: '',
    title: 'Our First Temple Visit',
    subtitle: 'A little adventure together ⛩️',
    photos: ['../assets/memories/temple-date.jpg'],
    photo: '../assets/memories/temple-date.jpg',
    emoji: '⛩️',
    story: 'Our first time going to a temple together. Another little chapter in our growing collection of memories.',
    detail: '',
    featured: true
  },
  {
    id: 'first-month-gift',
    date: '2026-11-20',
    title: 'Our First-Month Anniversary Gift',
    subtitle: 'One month, one handmade surprise 🧶',
    photos: ['../assets/memories/first-month-gift.jpg'],
    photo: '../assets/memories/first-month-gift.jpg',
    emoji: '🧶',
    story: 'A handmade gift for our first month together. Every stitch carries a little bit of love.',
    detail: '20 November 2026 · Our first monthly anniversary',
    featured: true
  }
];

// The Christmas letter is a keepsake,
// not a Timeline or Polaroid memory.
let christmasCard = null;

try {
  const items = JSON.parse(
    localStorage.getItem('loveverse_christmas_memories_v1') || '[]'
  );

  if (Array.isArray(items)) {
    christmasCard = items.find(
      item => item && item.id === 'christmas-first-2026'
    ) || null;
  }
} catch (error) {
  console.warn('Christmas card could not be loaded', error);
}

// New Year greeting is added only after Jarod presses “Keep This Memory”.
let newYearGreetingSaved = false;
try {
  const cards = JSON.parse(localStorage.getItem('loveverse_newyear_memories_v1') || '[]');
  newYearGreetingSaved = Array.isArray(cards) && cards.some(item => item?.id === 'new-year-greeting-2027');
} catch (error) {
  console.warn('New Year greeting could not be loaded', error);
}

/* Add a keepsake by replacing the example below.
   To keep the drawer empty for now, leave the array empty. */
const keepsakes = [
  // New Year Card:
  // Only appears after Jarod saves it from the New Year page.
  
  ...(christmasCard ? [{
    id: 'christmas-first-2026',
    date: '2026-12-25',
    title: 'Our First Christmas Letter ♡',
    emoji: '💌',
    photo: '../assets/christmas/quynh-anh-christmas.png',
    story: "Our very first Christmas together — and my first real Christmas celebration. I studied in Canada, but grew up with Eastern traditions and never really celebrated Christmas myself. This year I got to share it with you, and I hope it's only the first of many, many more. ♡",
    detail: christmasCard.wish
      ? "Jarod's Christmas wish: " + christmasCard.wish
      : '25 December 2026 · A letter from your little girl'
  }] : []),

  ...(newYearGreetingSaved ? [{
    id: 'new-year-greeting-2027',
    date: '2027-01-01',
    title: 'Our First New Year Card ♡',
    emoji: '💌',
    photo: '../assets/new-year/new-year-chibi.png',
    story: 'A little letter to begin our first New Year together.',
    detail: '1 January 2027 · From Quỳnh Anh to Jarod'
  }] : []),

  // New Year 2027 is now a resolutions + future-mail experience.
  // Letters are stored by Apps Script, not in browser memory or this drawer.
  ...(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('loveverse.newyear2027.resolutions.v1') || '[]');
      if (!Array.isArray(saved) || !saved.length) return [];
      return [{id:'new-year-2027-resolutions',date:'2027-01-01',title:'Our 2027 Resolutions ♡',emoji:'✨',photo:'',story:'Little promises and adventures we hope to share in 2027.',detail:saved.map(x => (x.done?'✓ ':'○ ')+String(x.text||'')).join(' · ')}];
    } catch { return []; }
  })(),

  // { id: 'ticket-1', title: 'Our First Ticket', date: '2026-10-15', emoji: '🎟️', photo: '', story: 'A tiny souvenir from our day.' }
];

const $ = selector => document.querySelector(selector);

const formatDate = value =>
  new Date(`${value}T00:00:00Z`).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  });

const dialog = $('#memory-dialog');

function media(item, className = '') {
  const holder = document.createElement('div');
  holder.className = `media ${className}`.trim();

  if (item.photo) {
    const img = document.createElement('img');
    img.src = item.photo;
    img.alt = item.title;
    img.loading = 'lazy';

    img.onerror = () => {
      holder.replaceChildren(
        document.createTextNode(item.emoji || '♡')
      );
      holder.classList.add('placeholder');
    };

    holder.append(img);
  } else {
    holder.classList.add('placeholder');
    holder.textContent = item.emoji || '♡';
  }

  return holder;
}

let activeGallery = [];
let activePhotoIndex = 0;

function getPhotos(item) {
  return Array.isArray(item.photos) && item.photos.length
    ? item.photos
    : item.photo ? [item.photo] : [];
}

function showGalleryPhoto() {
  const holder = $('#dialog-media');
  const counter = $('#gallery-counter');
  const prev = $('#gallery-prev');
  const next = $('#gallery-next');
  const controls = $('#gallery-controls');

  holder.replaceChildren();

  if (activeGallery.length) {
    const img = document.createElement('img');
    img.src = activeGallery[activePhotoIndex];
    img.alt = `Memory photo ${activePhotoIndex + 1} of ${activeGallery.length}`;
    img.className = 'gallery-photo';
    holder.append(img);
  } else {
    const placeholder = document.createElement('span');
    placeholder.className = 'gallery-placeholder';
    placeholder.textContent = '♡';
    holder.append(placeholder);
  }

  controls.hidden = activeGallery.length <= 1;
  counter.textContent = `${activePhotoIndex + 1} / ${activeGallery.length}`;
  prev.disabled = activeGallery.length <= 1;
  next.disabled = activeGallery.length <= 1;

  const thumbs = $('#gallery-thumbs');
  thumbs.replaceChildren();

  if (activeGallery.length > 1) {
    activeGallery.forEach((src, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'gallery-thumb' + (
        i === activePhotoIndex ? ' selected' : ''
      );
      b.setAttribute('aria-label', `Show photo ${i + 1}`);

      const im = document.createElement('img');
      im.src = src;
      im.alt = '';
      b.append(im);

      b.addEventListener('click', () => {
        activePhotoIndex = i;
        showGalleryPhoto();
      });

      thumbs.append(b);
    });
  }
}

function moveGallery(step) {
  if (activeGallery.length <= 1) return;

  activePhotoIndex = (
    activePhotoIndex + step + activeGallery.length
  ) % activeGallery.length;

  showGalleryPhoto();
}

function openMemory(item) {
  if (item.id === 'new-year-2027-resolutions') {
    openResolutionKeepsake();
    return;
  }
  if (item.id === 'new-year-greeting-2027') {
    openNewYearKeepsake();
    return;
  }
  if (item.id === 'christmas-first-2026') {
    openChristmasLetter();
    return;
  }

  activeGallery = getPhotos(item);
  activePhotoIndex = 0;
  showGalleryPhoto();

  $('#dialog-date').textContent = item.date
    ? formatDate(item.date)
    : 'A little moment to remember ♡';

  $('#dialog-title').textContent = item.title;
  $('#dialog-story').textContent =
    item.story || 'A little memory waiting for its story.';
  $('#dialog-detail').textContent = item.detail || '';

  dialog.showModal();
}

function memoryButton(item, className) {
  const button = document.createElement('button');
  button.type = 'button';
  button.className = className;
  button.addEventListener('click', () => openMemory(item));
  return button;
}

function renderTimeline() {
  const root = $('#timeline-list');
  const sorted = [...memories];

  if (!sorted.length) {
    root.textContent = 'Our next chapter is waiting to be written ♡';
    return;
  }

  sorted.forEach((item, i) => {
    const card = memoryButton(item, 'timeline-item');

    const dot = document.createElement('span');
    dot.className = 'timeline-dot';
    dot.textContent = '♡';

    const content = document.createElement('div');
    content.className = 'timeline-content';

    const date = document.createElement('span');
    date.className = 'eyebrow';
    date.textContent = item.date
      ? formatDate(item.date)
      : 'A special little day ♡';

    const title = document.createElement('h3');
    title.textContent = item.title;

    const subtitle = document.createElement('p');
    subtitle.textContent = item.subtitle || '';

    const more = document.createElement('span');
    more.className = 'read-more';
    more.textContent = 'Open this memory ↗';

    content.append(date, title, subtitle, more);
    card.append(dot, content, media(item, 'timeline-thumb'));
    root.append(card);
  });
}

function renderPhotos() {
  const root = $('#photo-grid');
  const selected = memories.filter(item => item.featured);

  if (!selected.length) {
    root.textContent = 'Our Polaroid wall is waiting for its first photo ♡';
    return;
  }

  selected.forEach((item, index) => {
    const card = memoryButton(item, 'polaroid');

    card.style.setProperty(
      '--tilt',
      `${[-4, 3, -2, 5][index % 4]}deg`
    );

    const caption = document.createElement('span');
    caption.className = 'polaroid-title';
    caption.textContent = item.title;

    const date = document.createElement('small');
    date.textContent = item.date
      ? formatDate(item.date)
      : 'A special little day ♡';

    card.append(media(item), caption, date);
    root.append(card);
  });
}

function renderKeepsakes() {
  const root = $('#keepsake-grid');

  if (!keepsakes.length) {
    const empty = document.createElement('div');
    empty.className = 'empty-state';

    empty.innerHTML = '<span aria-hidden="true">🎟️</span><h3>Our little drawer is waiting...</h3><p>One day, we’ll fill this with tickets, tiny gifts, and the things we couldn’t throw away.</p>';

    root.append(empty);
    return;
  }

  keepsakes.forEach(item => {
    const card = memoryButton(item, 'keepsake');

    const name = document.createElement('h3');
    name.textContent = item.title;

    const date = document.createElement('small');
    date.textContent = item.date ? formatDate(item.date) : '';

    card.append(media(item), name, date);
    root.append(card);
  });
}

$('#gallery-prev').addEventListener('click', () => moveGallery(-1));
$('#gallery-next').addEventListener('click', () => moveGallery(1));

dialog.addEventListener('keydown', event => {
  if (event.key === 'ArrowLeft') moveGallery(-1);
  if (event.key === 'ArrowRight') moveGallery(1);
});

$('#close-dialog').addEventListener('click', () => dialog.close());

dialog.addEventListener('click', event => {
  if (event.target === dialog) dialog.close();
});

renderTimeline();
renderPhotos();
renderKeepsakes();

// Christmas-only keepsake experience.
// Other memories keep their original gallery.
const christmasDialog = document.querySelector(
  '#christmas-letter-dialog'
);
const christmasEnvelopeStage = document.querySelector(
  '#christmas-envelope'
);
const christmasPaper = document.querySelector(
  '#christmas-paper'
);

function openChristmasLetter() {
  const savedWish = christmasCard &&
    typeof christmasCard.wish === 'string'
      ? christmasCard.wish.trim()
      : '';

  document.querySelector('#christmas-saved-wish').textContent =
    savedWish
      ? '“' + savedWish + '”'
      : 'A little wish, waiting for its star…';

  christmasEnvelopeStage.hidden = false;
  christmasPaper.hidden = true;
  christmasDialog.showModal();
}

function revealChristmasLetter() {
  christmasEnvelopeStage.classList.add('is-opening');

  setTimeout(() => {
    christmasEnvelopeStage.hidden = true;
    christmasEnvelopeStage.classList.remove('is-opening');
    christmasPaper.hidden = false;
    christmasDialog.scrollTop = 0;
  }, 550);
}

document.querySelector('#christmas-open').addEventListener(
  'click',
  revealChristmasLetter
);

document.querySelector('#christmas-fold').addEventListener(
  'click',
  () => {
    christmasPaper.hidden = true;
    christmasEnvelopeStage.hidden = false;
    christmasDialog.scrollTop = 0;
  }
);

document.querySelector('#christmas-close').addEventListener(
  'click',
  () => christmasDialog.close()
);

christmasDialog.addEventListener('click', e => {
  if (e.target === christmasDialog) christmasDialog.close();
});

// Standalone New Year letter dialog is injected so the existing Memories HTML
// and Christmas dialog do not need to change.
function openNewYearKeepsake() {
  let card = document.querySelector('#newyear-keepsake-dialog');
  if (!card) {
    card = document.createElement('dialog');
    card.id = 'newyear-keepsake-dialog';
    card.setAttribute('aria-label', 'Our First New Year Letter');
    card.innerHTML = `
      <button type="button" class="ny-close" aria-label="Close">×</button>
      <div class="ny-envelope">
        <div class="ny-icon">💌</div>
        <h2>A little wish from the beginning of 2027 ♡</h2>
        <button type="button" class="ny-unfold">Unfold our New Year letter</button>
      </div>
      <article class="ny-paper" hidden>
        <small>JANUARY 1, 2027 · FROM ME TO YOU</small>
        <img src="../assets/new-year/new-year-chibi.png" alt="Chibi Quỳnh Anh and Jarod kissing">
        <h2>Happy New Year, my love! ✨</h2>
        <p>My dearest Jarod,</p>
        <p>Happy New Year, my love! ♡</p>
        <p>Before we say hello to 2027, I want to say one last little thank you to 2026.</p>
        <p>Thank you, 2026, for all the unexpected turns, the little surprises, and especially for bringing you into my life.</p>
        <p>And thank you, universe, for somehow making our paths cross. Out of all the people in this big, big world, you brought me to you. I don&#x27;t know how you did it, but I think that was a pretty lovely decision. ♡</p>
        <p>If someone had told me at the beginning of 2026 that I&#x27;d be ending the year with a boyfriend who makes me smile at my phone like a silly little girl, I probably wouldn&#x27;t have believed them. But here we are!</p>
        <p>I don&#x27;t know what 2027 has waiting for us, and that&#x27;s actually one of the things I&#x27;m most excited about.</p>
        <p>There are so many places we haven&#x27;t explored, so many things we haven&#x27;t tried, so many kisses I haven&#x27;t stolen, and so many ordinary little days that haven&#x27;t become our favourite memories yet.</p>
        <p>I want more dates, more silly jokes, more cooking experiments, more cuddles, more sunsets, and more moments when we look at each other and think, ‘I&#x27;m so glad it&#x27;s you.’</p>
        <p>Of course, I know not every day will be sunshine and butterflies. There might be difficult days, misunderstandings, and moments when we drive each other a little crazy. But I hope we&#x27;ll always find our way back to each other, with patience, kindness, and lots and lots of love.</p>
        <p>My little wish for 2027 is simple: I hope we keep growing together, discovering new things about each other, and choosing each other, even on the ordinary days.</p>
        <p>And maybe I&#x27;m being a little greedy, but I don&#x27;t want just one more year with you.</p>
        <p>I want many, many more.</p>
        <p>I want to collect New Year&#x27;s memories with you until we lose count. I want us to look back one day and laugh at how young and silly we were when we celebrated our very first New Year together.</p>
        <p>So, dear universe, if you&#x27;re listening, thank you for bringing him to me. Please let us have a whole lot more chapters together. ♡</p>
        <p>Here&#x27;s to 2027, to all the beautiful things we haven&#x27;t experienced yet, and to us.</p>
        <p>Happy New Year, my favourite person.</p>
        <p class="ny-signature">With all my love, a thousand kisses, and a very hopeful little heart,</p>
        <p class="ny-signature">Your little girlfriend,</p>
        <p class="ny-signature">Quỳnh Anh ♡</p>
        <button type="button" class="ny-fold">Fold the letter ♡</button>
      </article>`;
    document.body.append(card);
    const style = document.createElement('style');
    style.textContent = `
      #newyear-keepsake-dialog{width:min(92vw,640px);max-height:88vh;overflow-y:auto;position:fixed;border:1px solid #efd4df;border-radius:26px;padding:30px;background:#fff9f7;color:#563e4a;box-shadow:0 20px 70px #61354c50}
      #newyear-keepsake-dialog::backdrop{background:#3c203c90;backdrop-filter:blur(3px)}
      #newyear-keepsake-dialog .ny-close{position:absolute;top:12px;right:17px;border:0;background:transparent;font-size:30px;color:#9b6b82;cursor:pointer}
      #newyear-keepsake-dialog .ny-envelope{text-align:center;padding:40px 8px 24px}
      #newyear-keepsake-dialog .ny-icon{font-size:100px}
      #newyear-keepsake-dialog h2{font-family:Georgia,serif;line-height:1.3}
      #newyear-keepsake-dialog .ny-paper{background:#fffefa;border:1px solid #f0dbe3;border-radius:18px;padding:22px clamp(15px,4vw,32px);font-family:Georgia,serif;line-height:1.85}
      #newyear-keepsake-dialog .ny-paper h2,#newyear-keepsake-dialog .ny-paper small{text-align:center;display:block}
      #newyear-keepsake-dialog .ny-paper img{display:block;width:min(100%,340px);height:auto;margin:8px auto}
      #newyear-keepsake-dialog .ny-paper p{margin:0 0 16px}
      #newyear-keepsake-dialog .ny-signature{color:#b76687;font-style:italic}
      #newyear-keepsake-dialog .ny-unfold,#newyear-keepsake-dialog .ny-fold{border:0;border-radius:99px;background:#d56c92;color:white;padding:12px 22px;cursor:pointer}
      #newyear-keepsake-dialog [hidden]{display:none!important}`;
    document.head.append(style);
    const envelope = card.querySelector('.ny-envelope');
    const paper = card.querySelector('.ny-paper');
    card.querySelector('.ny-close').onclick = () => card.close();
    card.querySelector('.ny-unfold').onclick = () => {
      envelope.hidden = true;
      paper.hidden = false;
      card.scrollTop = 0;
    };
    card.querySelector('.ny-fold').onclick = () => {
      paper.hidden = true;
      envelope.hidden = false;
      card.scrollTop = 0;
    };
    card.addEventListener('click', e => { if (e.target === card) card.close(); });
  }
  card.querySelector('.ny-envelope').hidden = false;
  card.querySelector('.ny-paper').hidden = true;
  card.showModal();
}


/* =========================================================
   NEW YEAR RESOLUTIONS — KEEPSAKE VIEW
   A separate, readable bucket-list display in Memory Drawer.
   Uses the same localStorage key as the New Year activity.
   ========================================================= */
function openResolutionKeepsake() {
  let dlg = document.querySelector('#ny-resolution-dialog');
  if (!dlg) {
    dlg = document.createElement('dialog');
    dlg.id = 'ny-resolution-dialog';
    dlg.innerHTML = `
      <button class="ny-res-close" type="button" aria-label="Close">×</button>
      <div class="ny-res-head">
        <span class="ny-res-sparkles">✨ ♡ ✨</span>
        <small>OUR LITTLE ADVENTURES · 2027</small>
        <h2>Our 2027 Resolutions ♡</h2>
        <p>One little dream at a time, together.</p>
      </div>
      <div class="ny-res-progress"></div>
      <ol class="ny-res-list"></ol>
      <p class="ny-res-foot">Here's to all the memories still waiting for us. ♡</p>`;
    document.body.append(dlg);
    dlg.querySelector('.ny-res-close').onclick = () => dlg.close();
    dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); });
    const css = document.createElement('style');
    css.textContent = `
      #ny-resolution-dialog{width:min(92vw,650px);max-height:88vh;overflow-y:auto;border:1px solid #f0d7e2;border-radius:26px;padding:30px clamp(16px,5vw,40px);background:#fffaf8;color:#583e4b;box-shadow:0 20px 70px #61354c50}
      #ny-resolution-dialog::backdrop{background:#3c203c90;backdrop-filter:blur(3px)}
      #ny-resolution-dialog .ny-res-close{position:absolute;top:12px;right:16px;border:0;background:transparent;font-size:30px;color:#9b6b82;cursor:pointer}
      #ny-resolution-dialog .ny-res-head{text-align:center;padding:16px 0}
      #ny-resolution-dialog .ny-res-sparkles{display:block;font-size:38px;margin-bottom:10px}
      #ny-resolution-dialog .ny-res-head small{font-size:11px;letter-spacing:.15em;color:#c17a96;font-weight:700}
      #ny-resolution-dialog h2{font-family:Georgia,serif;font-size:clamp(25px,5vw,36px);margin:12px 0}
      #ny-resolution-dialog .ny-res-progress{text-align:center;background:#fff0f5;border-radius:99px;padding:10px 15px;color:#b45d82;font-weight:700;margin:12px 0 20px}
      #ny-resolution-dialog .ny-res-list{list-style:none;counter-reset:ny;display:grid;gap:12px;padding:0;margin:0}
      #ny-resolution-dialog .ny-res-item{display:flex;gap:14px;align-items:center;padding:16px;background:#fff;border:1px solid #f1dce4;border-radius:17px;box-shadow:0 6px 18px #b8668a0b}
      #ny-resolution-dialog .ny-res-num{flex:0 0 34px;height:34px;display:grid;place-items:center;background:#fff0f5;color:#c16a8e;border-radius:50%;font-size:12px;font-weight:700}
      #ny-resolution-dialog .ny-res-copy{flex:1;overflow-wrap:anywhere;line-height:1.5}
      #ny-resolution-dialog .ny-res-state{font-size:12px;color:#ad718b;white-space:nowrap}
      #ny-resolution-dialog .ny-res-item.is-done{background:#fff2f7;border-color:#edbed1}
      #ny-resolution-dialog .ny-res-item.is-done .ny-res-state{color:#bd6485;font-weight:700}
      #ny-resolution-dialog .ny-res-foot{text-align:center;font-family:Georgia,serif;font-style:italic;color:#b76687;margin:22px 0 0}
      @media(max-width:460px){#ny-resolution-dialog .ny-res-item{gap:9px;padding:12px}#ny-resolution-dialog .ny-res-state{font-size:11px}}
    `;
    document.head.append(css);
  }
  let items = [];
  try {
    const data = JSON.parse(localStorage.getItem('loveverse.newyear2027.resolutions.v1') || '[]');
    if (Array.isArray(data)) items = data;
  } catch {}
  const completed = items.filter(item => item.done).length;
  dlg.querySelector('.ny-res-progress').textContent = `${completed} / ${items.length} little dreams completed ♡`;
  const list = dlg.querySelector('.ny-res-list');
  list.replaceChildren();
  items.forEach((item, i) => {
    const li = document.createElement('li');
    li.className = 'ny-res-item' + (item.done ? ' is-done' : '');
    const number = document.createElement('span');
    number.className = 'ny-res-num';
    number.textContent = String(i + 1).padStart(2, '0');
    const content = document.createElement('span');
    content.className = 'ny-res-copy';
    content.textContent = String(item.text || '');
    const state = document.createElement('span');
    state.className = 'ny-res-state';
    state.textContent = item.done ? 'We did it! ♡' : '♡ To do';
    li.append(number, content, state);
    list.append(li);
  });
  if (!items.length) {
    const empty = document.createElement('li');
    empty.className = 'ny-res-item';
    empty.textContent = 'Our little adventures will appear here ♡';
    list.append(empty);
  }
  dlg.showModal();
}
