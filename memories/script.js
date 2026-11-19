
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

/* Add a keepsake by replacing the example below.
   To keep the drawer empty for now, leave the array empty. */
const keepsakes = [
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
