// Quỳnh Anh™ — Jarod-exclusive anniversary website.
// Customize names, copy and anniversary date in index.html.
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];
const panels = $$('.panel');
const state = { plan: 'VIP Daddy', duration: 'A lifetime', noClicks: 0, upsellClicks: 0, kisses: 0, suggestedPlan: 'Premium' };

function show(id) {
  panels.forEach(panel => panel.classList.toggle('active', panel.id === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function confetti(count = 24, emoji = ['💗', '✨', '💖', '🌸']) {
  const holder = $('#effects');
  for (let i = 0; i < count; i++) {
    const part = document.createElement('span');
    part.className = 'particle';
    part.textContent = emoji[Math.floor(Math.random() * emoji.length)];
    part.style.left = `${10 + Math.random() * 80}vw`;
    part.style.top = `${20 + Math.random() * 60}vh`;
    part.style.setProperty('--dx', `${Math.round(Math.random() * 240 - 120)}px`);
    part.style.setProperty('--dy', `${Math.round(-80 - Math.random() * 230)}px`);
    part.style.setProperty('--rot', `${Math.round(Math.random() * 140 - 70)}deg`);
    part.style.animationDelay = `${Math.random() * .25}s`;
    holder.appendChild(part);
    setTimeout(() => part.remove(), 2000);
  }
}

$$('[data-go]').forEach(button => button.addEventListener('click', () => show(button.dataset.go)));
$('#yes-renew').addEventListener('click', () => { confetti(); show('plans'); });

const noMessages = [
  'Wait... did you just say NO? 🥺',
  'Jarod, your girlfriend is literally adorable. Think again! 💗',
  'Please reconsider. The puppy eyes are activating... 🐶',
  'Are you trying to make a tiny Quỳnh Anh cry? 😭',
  'Error 404: cancellation option not found. 💌',
  'Fine. The YES button is clearly the better choice. 😌'
];
$('#no-renew').addEventListener('click', () => {
  state.noClicks++;
  const no = $('#no-renew'), yes = $('#yes-renew');
  no.style.transform = `scale(${Math.max(.35, 1 - state.noClicks * .13)})`;
  yes.style.transform = `scale(${Math.min(1.6, 1 + state.noClicks * .11)})`;
  $('#renew-reaction').textContent = noMessages[Math.min(state.noClicks - 1, noMessages.length - 1)];
  confetti(8, ['🥺', '💗']);
  if (state.noClicks >= 7) { no.disabled = true; no.style.opacity = '.35'; no.textContent = 'Too tiny to say no 🤏'; }
});

$$('[data-plan]').forEach(button => button.addEventListener('click', () => {
  state.plan = button.dataset.plan;
  if (state.plan === 'VIP Daddy') { confetti(35, ['👑', '💖', '✨']); goDuration(); return; }
  state.suggestedPlan = state.plan === 'Standard' ? 'Premium' : 'VIP Daddy';
  state.upsellClicks = 0;
  $('#upgrade').textContent = `Upgrade to ${state.suggestedPlan} 💞`;
  $('#keep-plan').textContent = `Keep ${state.plan}`;
  $('#upgrade').style.transform = '';
  $('#keep-plan').style.transform = '';
  $('#upsell-title').textContent = state.plan === 'Standard' ? 'Standard? Are you sure, Jarod? 🥹' : 'Premium? But VIP Daddy exists! 👑';
  $('#upsell-text').textContent = state.plan === 'Standard'
    ? 'Premium comes with extra kisses and priority cuddles. Surely you want that?'
    : 'You are SO close to unlimited “Daddyyyy~” notifications and exclusive clingy mode.';
  $('#upsell-reaction').textContent = 'No pressure. Just a very persuasive girlfriend. 😇';
  show('upsell');
}));

$('#upgrade').addEventListener('click', () => {
  state.plan = state.suggestedPlan;
  confetti(25, ['💖', '✨', '👑']);
  if (state.plan === 'Premium') {
    // Let him decide whether to upgrade once more to VIP.
    state.suggestedPlan = 'VIP Daddy';
    state.upsellClicks = 0;
    $('#upsell-title').textContent = 'Excellent choice! But... one more thing 👀';
    $('#upsell-text').textContent = 'Premium is lovely. VIP Daddy includes all the premium perks AND unlimited “Daddyyyy~” alerts.';
    $('#upgrade').textContent = 'Go VIP Daddy 👑';
    $('#keep-plan').textContent = 'Keep Premium';
    $('#upgrade').style.transform = '';
    $('#keep-plan').style.transform = '';
    $('#upsell-reaction').textContent = 'Your girlfriend is a very ambitious saleswoman.';
  } else goDuration();
});
$('#keep-plan').addEventListener('click', () => {
  state.upsellClicks++;
  const keep = $('#keep-plan'), upgrade = $('#upgrade');
  keep.style.transform = `scale(${Math.max(.5, 1 - state.upsellClicks * .1)})`;
  upgrade.style.transform = `scale(${Math.min(1.35, 1 + state.upsellClicks * .08)})`;
  $('#upsell-reaction').textContent = ['Really? 🥺', 'But the cuddles... 💕', 'Are you absolutely sure? 👀', 'Okay, okay, I respect your choice. 😌'][Math.min(state.upsellClicks - 1, 3)];
  // Unlike the playful No button, a selected plan can always be kept.
  if (state.upsellClicks >= 4) goDuration();
});
function goDuration() { $('#selected-plan-text').textContent = `Selected plan: ${state.plan}`; show('duration'); }
$$('[data-duration]').forEach(button => button.addEventListener('click', () => {
  state.duration = button.dataset.duration;
  if (state.duration === 'A lifetime') show('lifetime'); else finish();
}));
$('#confirm-lifetime').addEventListener('click', finish);
function finish() {
  $('#certificate-plan').textContent = `Plan: ${state.plan}`;
  $('#certificate-duration').textContent = `Duration: ${state.duration}`;
  show('success'); confetti(50, ['💗', '💖', '✨', '🎉', '🌸']);
}
$('#open-letter').addEventListener('click', () => { show('letter'); confetti(20, ['💌', '💗', '✨']); });
const kissMessages = [
  'Kiss received! Quỳnh Anh is blushing. 🥰',
  'Another one? Daddy, you are spoiling me! 💋',
  'Your girlfriend has entered happy mode. 💗',
  'Warning: extreme clinginess incoming! 🥺',
  'Mwah! One more for good luck. 😘'
];
$('#send-kiss').addEventListener('click', () => {
  state.kisses++;
  $('#kiss-count').textContent = `${state.kisses} kiss${state.kisses === 1 ? '' : 'es'} delivered`;
  $('#kiss-message').textContent = state.kisses === 10 ? '🏆 ACHIEVEMENT UNLOCKED: KISS MASTER!' : state.kisses === 20 ? '👑 ACHIEVEMENT UNLOCKED: BEST BOYFRIEND EVER!' : kissMessages[(state.kisses - 1) % kissMessages.length];
  confetti(15, ['💋', '😘', '💖', '💕']);
});
$('#restart').addEventListener('click', () => {
  state.noClicks = state.upsellClicks = state.kisses = 0;
  $('#no-renew').disabled = false;
  $('#no-renew').textContent = 'No, thanks';
  $('#no-renew').style.transform = '';
  $('#no-renew').style.opacity = '';
  $('#yes-renew').style.transform = '';
  $('#renew-reaction').textContent = 'Choose carefully. Your girlfriend is watching. 👀';
  $('#kiss-count').textContent = '0 kisses delivered';
  $('#kiss-message').textContent = 'Warning: kisses may cause extreme happiness.';
  show('email');
});
