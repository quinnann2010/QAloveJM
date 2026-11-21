
"use strict";

/* =========================================================
   LOVEVERSE — NEW YEAR 2027
   FORTUNE COOKIES DATA

   100 little fortunes for 100 little moments ♡

   Categories:
   1. Luck & Good Fortune          — 25
   2. Destiny & Universe           — 20
   3. Growth & Wisdom              — 20
   4. Love & Relationships         — 15
   5. Adventures & Opportunities   — 10
   6. Silly & Mysterious           — 10

   TOTAL: 100 FORTUNES
   ========================================================= */


/* =========================================================
   1. FORTUNE COLLECTION
   ========================================================= */

const FORTUNES = [];


/* =========================================================
   2. HELPER FUNCTION

   Automatically assigns an ID to each fortune.
   ========================================================= */

function add(category, messages) {
  messages.forEach((message) => {
    FORTUNES.push({
      id: FORTUNES.length + 1,
      category: category,
      text: message
    });
  });
}


/* =========================================================
   3. LUCK & GOOD FORTUNE
   25 fortunes
   ========================================================= */

add("Luck & Good Fortune", [

  "A little luck is already on its way to you.",

  "Something wonderful will arrive when you least expect it.",

  "A small coincidence will bring an unexpected opportunity.",

  "Good fortune often arrives disguised as an ordinary day.",

  "The next door you open may lead somewhere beautiful.",

  "An unexpected kindness will brighten your week.",

  "Your lucky moment is closer than you think.",

  "A pleasant surprise is waiting just around the corner.",

  "What seems like a delay may actually be perfect timing.",

  "A forgotten wish may soon find its way back to you.",

  "The smallest opportunity may bring the greatest reward.",

  "An ordinary conversation will lead to something extraordinary.",

  "A little courage will attract a little luck.",

  "Something you thought was lost will return in another form.",

  "A lucky coincidence will make perfect sense later.",

  "A good surprise will arrive without an invitation.",

  "Your next lucky charm may be something you already own.",

  "The universe has saved a pleasant surprise for you.",

  "An unexpected invitation will bring good fortune.",

  "A tiny decision will lead to a delightful discovery.",

  "Your patience will soon be rewarded in an unexpected way.",

  "A happy accident will become a cherished memory.",

  "A small risk may bring a surprisingly sweet reward.",

  "Good news may come from an unexpected direction.",

  "The best kind of luck will find you while you are busy living."

]);


/* =========================================================
   4. DESTINY & UNIVERSE
   20 fortunes
   ========================================================= */

add("Destiny & Universe", [

  "The stars are quietly arranging something beautiful.",

  "Some paths cross for reasons we understand much later.",

  "The universe rarely reveals its plans ahead of time.",

  "A mysterious coincidence will soon make you smile.",

  "Not every detour is a mistake. Some are destiny.",

  "The moon knows a secret about your future.",

  "What is meant to find you may arrive in an unexpected form.",

  "The universe is writing a chapter you have not imagined yet.",

  "One small moment may change the direction of your story.",

  "A familiar place will soon hold a new meaning.",

  "The answer you seek may appear in an ordinary conversation.",

  "Some of the best things begin without a plan.",

  "A new chapter is approaching. Leave a little room for magic.",

  "The stars favour those who remain curious.",

  "A beautiful coincidence is simply a mystery with good timing.",

  "The universe has an unusual sense of humour. Trust it a little.",

  "An unexpected connection will remind you how small the world is.",

  "A question you have forgotten may soon find its answer.",

  "The next page of your story has not been written yet.",

  "Something that feels random today may feel meaningful tomorrow."

]);


/* =========================================================
   5. GROWTH & WISDOM
   20 fortunes
   ========================================================= */

add("Growth & Wisdom", [

  "A quiet mind will notice what a busy one overlooks.",

  "The smallest step forward is still a step toward something.",

  "A little patience can turn uncertainty into possibility.",

  "Not every question needs an answer today.",

  "A change of perspective will reveal a hidden opportunity.",

  "The courage to begin is often greater than the courage to finish.",

  "Something you once feared will become easier with time.",

  "The most valuable lesson may arrive without a teacher.",

  "A gentle word can open a door that force cannot.",

  "The path ahead becomes clearer when you take the first step.",

  "What you nurture quietly may bloom beautifully.",

  "An old mistake may become the beginning of new wisdom.",

  "Your future self will thank you for one small decision today.",

  "Sometimes the bravest thing is to choose peace.",

  "A moment of stillness may bring the clarity you need.",

  "You are closer to understanding than you realise.",

  "The right question can be more valuable than an easy answer.",

  "Something worth keeping may require a little patience.",

  "The strongest roots often grow where nobody can see them.",

  "A little kindness today may travel further than you imagine."

]);


/* =========================================================
   6. LOVE & RELATIONSHIPS
   15 fortunes
   ========================================================= */

add("Love & Relationships", [

  "A small gesture of affection will mean more than a thousand words.",

  "Someone is smiling because you exist in their world.",

  "A quiet moment together will become a beautiful memory.",

  "An unexpected compliment will stay in your heart.",

  "The sweetest surprises are often the simplest ones.",

  "A familiar voice will bring comfort when you need it most.",

  "Someone will remember a detail you thought they had forgotten.",

  "A little honesty will bring two hearts closer.",

  "A shared laugh will turn an ordinary moment into something special.",

  "A warm embrace will make the world feel a little smaller.",

  "Love sometimes arrives disguised as a very ordinary afternoon.",

  "An unplanned moment will become someone's favourite memory.",

  "A gentle conversation will reveal something beautiful.",

  "The most meaningful gift may not come wrapped in paper.",

  "A beautiful connection grows through a thousand little choices."

]);


/* =========================================================
   7. ADVENTURES & OPPORTUNITIES
   10 fortunes
   ========================================================= */

add("Adventures & Opportunities", [

  "Your next adventure may begin with a simple yes.",

  "A place you have never visited is waiting to surprise you.",

  "An unexpected invitation will lead to a memorable day.",

  "A new experience will become an old favourite.",

  "A wrong turn may lead to exactly the right place.",

  "Something wonderful is hiding just outside your routine.",

  "A new skill will open a door you did not know existed.",

  "An ordinary weekend may become an extraordinary story.",

  "A spontaneous decision will give you something to laugh about later.",

  "The next beautiful view may be closer than you think."

]);


/* =========================================================
   8. SILLY & MYSTERIOUS PREDICTIONS
   10 fortunes
   ========================================================= */

add("Silly & Mysterious", [

  "The stars are aligned. They refuse to say for what.",

  "A mysterious stranger will cross your path. It may be a cat.",

  "Great fortune awaits you. Probably after lunch.",

  "Your future is bright. Please remember your sunglasses.",

  "A very important decision will involve choosing what to eat.",

  "The universe has a message for you. Unfortunately, it is typing…",

  "An unexpected treasure will appear. Check your coat pockets.",

  "Someone will steal your heart. Or possibly your dessert.",

  "A great mystery will soon be solved. It involves a missing sock.",

  "Your destiny is calling. It would like you to charge your phone."

]);


/* =========================================================
   9. DATA VALIDATION

   Expected:
   - Exactly 100 fortunes
   - Unique IDs from 1 to 100
   ========================================================= */

if (FORTUNES.length !== 100) {
  console.warn(
    `Fortune Cookies: expected 100 messages, found ${FORTUNES.length}.`
  );
}
