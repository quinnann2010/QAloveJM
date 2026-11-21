
'use strict';

/* =========================================
   QUỲNH ANH™ — LOVE SUBSCRIPTION
   First Month Anniversary
========================================= */


/* =========================================
   1. DOM HELPERS & CONFIGURATION
========================================= */

const $ = (selector) => document.querySelector(selector);

const $$ = (selector) => [
  ...document.querySelectorAll(selector)
];

const panels = $$('.panel');

// Shared Loveverse Wallet
const WALLET_KEY = 'loveverse_m02_rewards_v1';

// First Month subscription
const SUB_KEY = 'loveverse_m01_subscription_v1';

// Unique reward IDs
const CERT_ID = 'm01-boyfriend-certificate';
const TICKET_ID = 'm01-jarods-choice-ticket';


/* =========================================
   2. APPLICATION STATE
========================================= */

const state = {
  plan: 'VIP Daddy',
  duration: 'A lifetime',

  noClicks: 0,
  upsellClicks: 0,
  kisses: 0,

  suggestedPlan: 'Premium'
};


/* =========================================
   3. LOCAL STORAGE HELPERS
========================================= */

function readJSON(key, fallback) {
  try {
    const value = JSON.parse(
      localStorage.getItem(key)
    );

    return value ?? fallback;

  } catch {
    return fallback;
  }
}

function readSubscription() {
  return readJSON(SUB_KEY, null);
}

function isActive(subscription) {
  return (
    !!subscription &&
    (
      !subscription.expiresAt ||
      Date.now() < Date.parse(subscription.expiresAt)
    )
  );
}

function prettyDate(iso) {
  return new Date(iso).toLocaleDateString(
    'en-GB',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  );
}


/* =========================================
   4. SUBSCRIPTION STATUS
========================================= */

function refreshSubscription() {
  const subscription = readSubscription();

  const label = $('#existing-subscription');

  if (!label) return;

  if (!subscription) {
    label.textContent = '';
    return;
  }

  if (isActive(subscription)) {
    const expiryText = subscription.expiresAt
      ? `Active until ${prettyDate(subscription.expiresAt)}`
      : 'Lifetime access ♾️';

    label.textContent =
      `💗 Current subscription: ${subscription.plan} · ` +
      `${expiryText}. You can renew or change your plan.`;

  } else {
    label.textContent =
      `⚠️ Your ${subscription.plan} subscription ` +
      `expired on ${prettyDate(subscription.expiresAt)}. ` +
      'Time to renew! 💌';
  }
}


/* =========================================
   5. SAVE SUBSCRIPTION & WALLET REWARDS
========================================= */

function saveSubscriptionAndRewards() {
  const now = new Date();

  let expiresAt = null;

  // 30-day subscription
  if (state.duration === '30 days') {
    expiresAt = new Date(
      now.getTime() + 30 * 86400000
    ).toISOString();
  }

  // One-year subscription
  if (state.duration === '1 year') {
    const end = new Date(now);

    end.setUTCFullYear(
      end.getUTCFullYear() + 1
    );

    expiresAt = end.toISOString();
  }

  // Lifetime subscription has no expiration date.

  const subscription = {
    plan: state.plan,
    duration: state.duration,
    activatedAt: now.toISOString(),
    expiresAt
  };

  // Read existing Wallet rewards.
  const rewards = readJSON(WALLET_KEY, []);

  if (!Array.isArray(rewards)) {
    throw new Error('Unexpected Wallet data');
  }

  /* ---------------------------------------
     5.1 Boyfriend Excellence Certificate
  --------------------------------------- */

  const certificate = {
    id: CERT_ID,
    title: 'Certificate of Boyfriend Excellence',

    type: 'certificate',
    source: 'firstmonth',

    plan: state.plan,
    duration: state.duration,

    activatedAt: subscription.activatedAt,
    expiresAt
  };

  const certificateIndex = rewards.findIndex(
    reward => reward.id === CERT_ID
  );

  if (certificateIndex >= 0) {
    // Update existing certificate.
    // Preserve any additional stored fields.
    rewards[certificateIndex] = {
      ...rewards[certificateIndex],
      ...certificate
    };

  } else {
    // First-time collection.
    rewards.push(certificate);
  }

  /* ---------------------------------------
     5.2 Jarod's Choice Ticket
  --------------------------------------- */

  const ticketExists = rewards.some(
    reward => reward.id === TICKET_ID
  );

  if (!ticketExists) {
    rewards.push({
      id: TICKET_ID,

      title: "Jarod's Choice Ticket 🎟️",

      source: 'firstmonth',
      type: 'voucher',

      redeemed: false,
      createdAt: now.toISOString()
    });
  }

  /* ---------------------------------------
     5.3 Save to Local Storage
  --------------------------------------- */

  // Save Wallet first.
  localStorage.setItem(
    WALLET_KEY,
    JSON.stringify(rewards)
  );

  // Save subscription.
  localStorage.setItem(
    SUB_KEY,
    JSON.stringify(subscription)
  );

  /* ---------------------------------------
     5.4 Success Messages
  --------------------------------------- */

  const subscriptionStatus = $('#subscription-status');

  const walletStatus = $('#wallet-save-status');

  if (subscriptionStatus) {
    subscriptionStatus.textContent = expiresAt
      ? `💗 Active until ${prettyDate(expiresAt)} · Renew when it expires!`
      : '💍 Lifetime subscription · Never expires!';
  }

  if (walletStatus) {
    walletStatus.textContent =
      '✨ Certificate and Jarod’s Choice Ticket ' +
      'saved to Loveverse Wallet!';
  }

  refreshSubscription();
}


/* =========================================
   6. PANEL NAVIGATION
========================================= */

function show(id) {
  panels.forEach(panel => {
    panel.classList.toggle(
      'active',
      panel.id === id
    );
  });

  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}

// Buttons with data-go attributes
$$('[data-go]').forEach(button => {
  button.addEventListener('click', () => {
    show(button.dataset.go);
  });
});


/* =========================================
   7. CONFETTI EFFECTS
========================================= */

function confetti(
  count = 24,
  emoji = ['💗', '✨', '💖', '🌸']
) {
  const holder = $('#effects');

  if (!holder) return;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('span');

    particle.className = 'particle';

    particle.textContent = emoji[
      Math.floor(Math.random() * emoji.length)
    ];

    particle.style.left =
      `${10 + Math.random() * 80}vw`;

    particle.style.top =
      `${20 + Math.random() * 60}vh`;

    particle.style.setProperty(
      '--dx',
      `${Math.round(Math.random() * 240 - 120)}px`
    );

    particle.style.setProperty(
      '--dy',
      `${Math.round(-80 - Math.random() * 230)}px`
    );

    particle.style.setProperty(
      '--rot',
      `${Math.round(Math.random() * 140 - 70)}deg`
    );

    particle.style.animationDelay =
      `${Math.random() * 0.25}s`;

    holder.appendChild(particle);

    setTimeout(() => {
      particle.remove();
    }, 2000);
  }
}


/* =========================================
   8. RENEWAL QUESTION
========================================= */

$('#yes-renew').addEventListener('click', () => {
  confetti();
  show('plans');
});

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

  const noButton = $('#no-renew');
  const yesButton = $('#yes-renew');

  // Shrink the No button.
  noButton.style.transform = `scale(${
    Math.max(0.35, 1 - state.noClicks * 0.13)
  })`;

  // Enlarge the Yes button.
  yesButton.style.transform = `scale(${
    Math.min(1.6, 1 + state.noClicks * 0.11)
  })`;

  $('#renew-reaction').textContent = noMessages[
    Math.min(state.noClicks - 1, noMessages.length - 1)
  ];

  confetti(8, ['🥺', '💗']);

  if (state.noClicks >= 7) {
    noButton.disabled = true;

    noButton.style.opacity = '0.35';

    noButton.textContent = 'Too tiny to say no 🤏';
  }
});


/* =========================================
   9. SUBSCRIPTION PLAN SELECTION
========================================= */

$$('[data-plan]').forEach(button => {
  button.addEventListener('click', () => {
    state.plan = button.dataset.plan;

    // VIP Daddy: skip the upsell.
    if (state.plan === 'VIP Daddy') {
      confetti(35, ['👑', '💖', '✨']);

      goDuration();
      return;
    }

    // Suggest the next package.
    state.suggestedPlan =
      state.plan === 'Standard'
        ? 'Premium'
        : 'VIP Daddy';

    state.upsellClicks = 0;

    $('#upgrade').textContent =
      `Upgrade to ${state.suggestedPlan} 💞`;

    $('#keep-plan').textContent =
      `Keep ${state.plan}`;

    $('#upgrade').style.transform = '';
    $('#keep-plan').style.transform = '';

    if (state.plan === 'Standard') {
      $('#upsell-title').textContent =
        'Standard? Are you sure, Jarod? 🥹';

      $('#upsell-text').textContent =
        'Premium comes with extra kisses and priority cuddles. ' +
        'Surely you want that?';

    } else {
      $('#upsell-title').textContent =
        'Premium? But VIP Daddy exists! 👑';

      $('#upsell-text').textContent =
        'You are SO close to unlimited “Daddyyyy~” ' +
        'notifications and exclusive clingy mode.';
    }

    $('#upsell-reaction').textContent =
      'No pressure. Just a very persuasive girlfriend. 😇';

    show('upsell');
  });
});


/* =========================================
   10. UPGRADE SUBSCRIPTION
========================================= */

$('#upgrade').addEventListener('click', () => {
  state.plan = state.suggestedPlan;

  confetti(25, ['💖', '✨', '👑']);

  if (state.plan === 'Premium') {
    // Offer one more upgrade to VIP.
    state.suggestedPlan = 'VIP Daddy';
    state.upsellClicks = 0;

    $('#upsell-title').textContent =
      'Excellent choice! But... one more thing 👀';

    $('#upsell-text').textContent =
      'Premium is lovely. VIP Daddy includes all the ' +
      'premium perks AND unlimited “Daddyyyy~” alerts.';

    $('#upgrade').textContent =
      'Go VIP Daddy 👑';

    $('#keep-plan').textContent =
      'Keep Premium';

    $('#upgrade').style.transform = '';
    $('#keep-plan').style.transform = '';

    $('#upsell-reaction').textContent =
      'Your girlfriend is a very ambitious saleswoman.';

  } else {
    goDuration();
  }
});


/* =========================================
   11. KEEP CURRENT PLAN
========================================= */

$('#keep-plan').addEventListener('click', () => {
  state.upsellClicks++;

  const keepButton = $('#keep-plan');
  const upgradeButton = $('#upgrade');

  keepButton.style.transform = `scale(${
    Math.max(0.5, 1 - state.upsellClicks * 0.1)
  })`;

  upgradeButton.style.transform = `scale(${
    Math.min(1.35, 1 + state.upsellClicks * 0.08)
  })`;

  const reactions = [
    'Really? 🥺',
    'But the cuddles... 💕',
    'Are you absolutely sure? 👀',
    'Okay, okay, I respect your choice. 😌'
  ];

  $('#upsell-reaction').textContent = reactions[
    Math.min(state.upsellClicks - 1, reactions.length - 1)
  ];

  // The selected plan can always be kept.
  if (state.upsellClicks >= 4) {
    goDuration();
  }
});


/* =========================================
   12. SUBSCRIPTION DURATION
========================================= */

function goDuration() {
  $('#selected-plan-text').textContent =
    `Selected plan: ${state.plan}`;

  show('duration');
}

$$('[data-duration]').forEach(button => {
  button.addEventListener('click', () => {
    state.duration = button.dataset.duration;

    if (state.duration === 'A lifetime') {
      show('lifetime');

    } else {
      finish();
    }
  });
});

// Lifetime confirmation
$('#confirm-lifetime').addEventListener(
  'click',
  finish
);


/* =========================================
   13. COMPLETE SUBSCRIPTION
========================================= */

function finish() {
  $('#certificate-plan').textContent =
    `Plan: ${state.plan}`;

  $('#certificate-duration').textContent =
    `Duration: ${state.duration}`;

  try {
    saveSubscriptionAndRewards();

  } catch (error) {
    console.error(
      'Loveverse Wallet save failed:',
      error
    );

    $('#wallet-save-status').textContent =
      '⚠️ Could not save to Wallet. ' +
      'Check browser storage settings.';

    $('#subscription-status').textContent = '';
  }

  show('success');

  confetti(
    50,
    ['💗', '💖', '✨', '🎉', '🌸']
  );
}


/* =========================================
   14. SECRET LOVE LETTER
========================================= */

$('#open-letter').addEventListener('click', () => {
  show('letter');

  confetti(
    20,
    ['💌', '💗', '✨']
  );
});


/* =========================================
   15. DIGITAL KISSES
========================================= */

const kissMessages = [
  'Kiss received! Quỳnh Anh is blushing. 🥰',

  'Another one? Daddy, you are spoiling me! 💋',

  'Your girlfriend has entered happy mode. 💗',

  'Warning: extreme clinginess incoming! 🥺',

  'Mwah! One more for good luck. 😘'
];

$('#send-kiss').addEventListener('click', () => {
  state.kisses++;

  const kissLabel =
    state.kisses === 1 ? 'kiss' : 'kisses';

  $('#kiss-count').textContent =
    `${state.kisses} ${kissLabel} delivered`;

  if (state.kisses === 10) {
    $('#kiss-message').textContent =
      '🏆 ACHIEVEMENT UNLOCKED: KISS MASTER!';

  } else if (state.kisses === 20) {
    $('#kiss-message').textContent =
      '👑 ACHIEVEMENT UNLOCKED: BEST BOYFRIEND EVER!';

  } else {
    $('#kiss-message').textContent = kissMessages[
      (state.kisses - 1) % kissMessages.length
    ];
  }

  confetti(
    15,
    ['💋', '😘', '💖', '💕']
  );
});


/* =========================================
   16. REPLAY THE EXPERIENCE
========================================= */

$('#restart').addEventListener('click', () => {
  // Reset interaction counters.
  state.noClicks = 0;
  state.upsellClicks = 0;
  state.kisses = 0;

  // Restore No button.
  const noButton = $('#no-renew');

  noButton.disabled = false;
  noButton.textContent = 'No, thanks';

  noButton.style.transform = '';
  noButton.style.opacity = '';

  // Restore Yes button.
  $('#yes-renew').style.transform = '';

  // Restore reaction messages.
  $('#renew-reaction').textContent =
    'Choose carefully. Your girlfriend is watching. 👀';

  $('#kiss-count').textContent =
    '0 kisses delivered';

  $('#kiss-message').textContent =
    'Warning: kisses may cause extreme happiness.';

  // Refresh saved subscription.
  refreshSubscription();

  // Return to the beginning.
  show('email');
});


/* =========================================
   17. PAGE INITIALIZATION
========================================= */

// Check existing subscription on page load.
refreshSubscription();

// Refresh after browser back/forward navigation.
window.addEventListener(
  'pageshow',
  refreshSubscription
);

// Refresh if storage changes in another tab.
window.addEventListener(
  'storage',
  refreshSubscription
);
