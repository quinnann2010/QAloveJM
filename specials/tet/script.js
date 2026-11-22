"use strict";
const $ = s => document.querySelector(s), app = $("#app");
const KEY = "loveverse_tet_2027_progress_v2", REWARD_KEY = "loveverse_m02_rewards_v1", MEMORY_KEY = "loveverse_tet_memories_v1", CHIBI = "assets/tet-chibi.png";
let language = localStorage.getItem("loveverse_tet_language") || "en";
const tr = (en, fr) => language === "fr" ? fr : en;
const chapters = [["Before Tết", "Avant le Tết", "A house ready for a new beginning", "Une maison prête pour une nouvelle année", [["🛍️", "Chợ Tết — the New Year market", "Le marché du Tết", "Before Tết, families visit busy markets to buy peach blossoms, kumquat trees, decorations, sweets and gifts. In Hà Nội, the streets turn red and gold as everyone gets ready for the holiday.", "Avant le Tết, les familles vont au marché acheter des fleurs de pêcher, des kumquats, des décorations, des friandises et des cadeaux. À Hanoï, les rues se parent de rouge et d'or.", 1], ["🌸", "Peach blossoms & kumquat trees", "Fleurs de pêcher et kumquats", "In Northern Vietnam, pink peach blossoms (hoa đào) and kumquat trees (cây quất) bring a festive feeling. Families decorate their homes and prepare to welcome guests.", "Au Nord, les fleurs de pêcher roses (hoa đào) et les kumquats (cây quất) décorent les maisons avant le Nouvel An.", 1], ["🧹", "Cleaning before the new year", "Le grand ménage", "Before Tết, families often clean and tidy the house. Some avoid sweeping on the first day because of the belief that it could sweep away good luck. This is a custom, not a universal rule.", "Avant le Tết, on nettoie et range la maison. Certaines familles évitent de balayer le premier jour, de peur de chasser la chance.", 1]]], ["Before Tết", "Avant le Tết", "The kitchen smells like Tết", "La cuisine sent le Tết", [["🍃", "Bánh chưng", "Le bánh chưng", "Square bánh chưng is made from sticky rice, mung beans and often pork, wrapped in leaves. Preparing it can be a family occasion.", "Le bánh chưng est un gâteau carré de riz gluant, haricots mungo et souvent porc, enveloppé dans des feuilles. Le préparer peut réunir la famille.", 2], ["🥢", "Northern festive dishes", "Les plats de fête du Nord", "You might find boiled chicken, giò lụa (pork sausage), nem rán (fried rolls), pickled onions, bamboo shoot soup and thịt đông (jellied pork). Menus vary from home to home.", "On peut manger du poulet bouilli, du giò lụa, des nem rán, des oignons marinés, de la soupe de pousses de bambou et du thịt đông. Chaque famille a ses habitudes.", 2], ["🍽️", "The year-end meal", "Le repas de fin d’année", "The tất niên meal brings family members together to close the old year. Many families also prepare offerings to honor ancestors.", "Le repas de tất niên réunit la famille pour terminer l’année. Certaines familles préparent aussi des offrandes aux ancêtres.", 2]]], ["During Tết", "Pendant le Tết", "Midnight, wishes and first footsteps", "Minuit, vœux et premiers pas", [["🎆", "Giao thừa", "Le réveillon", "Giao thừa is the transition into the lunar new year. Families may gather, make offerings, exchange wishes or go out to see fireworks.", "Giao thừa marque le passage à la nouvelle année lunaire. On peut se réunir, faire des offrandes, échanger des vœux ou regarder les feux d’artifice.", 4], ["🕯️", "New Year offerings", "Les offrandes du Nouvel An", "Some families prepare a New Year offering table to honor ancestors and welcome the coming year. Customs vary by household.", "Certaines familles préparent une table d’offrandes pour honorer leurs ancêtres et accueillir la nouvelle année. Les coutumes varient selon les familles.", 4], ["🚪", "Xông đất", "La première visite", "Some families pay attention to who first enters the home after the new year begins. Ask before arriving unannounced right after midnight.", "Certaines familles accordent de l’importance à la première personne qui entre dans la maison. Mieux vaut demander avant de venir juste après minuit.", 4], ["🧧", "Lì xì", "Les enveloppes rouges", "Lucky money is a wish for health and good fortune, not a competition about the amount. Children often receive it, and younger people may also offer it to elders.", "Le lì xì transmet des vœux de santé et de chance. Les enfants en reçoivent souvent ; on peut aussi en offrir aux aînés.", 3]]], ["During Tết", "Pendant le Tết", "Meeting my family: Vietnamese survival phrases", "Rencontrer ma famille : phrases utiles", [["🙏", "Con chào bác ạ", "Bonjour, bác", "A respectful greeting to an older adult in an appropriate family relationship. Your girlfriend will help you choose bác, cô or chú correctly.", "Une salutation respectueuse. Ta copine t’aidera à choisir entre bác, cô ou chú selon l’âge et le lien familial.", 1], ["🌸", "Chúc mừng năm mới!", "Bonne année !", "The easiest New Year wish. For her parents, try “Con chúc hai bác năm mới mạnh khỏe ạ” — I wish you both good health.", "Le vœu le plus simple ! Pour ses parents : « Con chúc hai bác năm mới mạnh khỏe ạ » — je vous souhaite à tous les deux une bonne santé.", 3], ["🍵", "Dạ, con cảm ơn ạ", "Merci beaucoup", "A polite way to thank an older relative. You can also smile and ask your girlfriend for help — perfect pronunciation is not required.", "Une façon polie de remercier un aîné. Tu peux sourire et demander de l’aide à ta copine.", 1]]], ["During Tết", "Pendant le Tết", "The relatives have questions…", "Les proches ont des questions…", [["💍", "Bao giờ cưới?", "Vous vous mariez quand ?", "“When are you getting married?” A playful answer: “Dạ, để chúng cháu tìm hiểu nhau thêm ạ!” — We are still getting to know each other.", "« Vous vous mariez quand ? » Réponse possible : « Dạ, để chúng cháu tìm hiểu nhau thêm ạ ! » — On apprend encore à se connaître.", 6], ["🍚", "Ăn thêm đi cháu!", "Reprends à manger !", "“Have some more food!” You can say “Dạ, cháu no rồi ạ, ngon lắm!” — I am full, thank you, it was delicious.", "« Reprends à manger ! » Réponds : « Dạ, cháu no rồi ạ, ngon lắm ! » — J’ai bien mang, c’était délicieux.", 6], ["🇻🇳", "Biết nói tiếng Việt không?", "Tu parles vietnamien ?", "“Can you speak Vietnamese?” Try: “Cháu biết một chút ạ!” — Just a little! This is a friendly example, not a required script.", "« Tu parles vietnamien ? » Réponds : « Cháu biết một chút ạ ! » — Un petit peu !", 6]]], ["After midnight", "Après minuit", "Mùng Một: the first day", "Mùng Một : le premier jour", [["🏡", "Family greetings", "Les vœux en famille", "Mùng Một often centers on close family, respectful greetings and visiting close relatives. Some families prefer a quiet morning at home.", "Mùng Một est souvent consacré aux proches, aux vœux et aux visites à la famille. Certaines familles restent tranquillement à la maison le matin.", 3], ["🌿", "A fresh start", "Un nouveau départ", "Some families avoid arguments, breaking things or sweeping on Mùng Một as a symbolic wish for a harmonious year. Practices differ.", "Certaines familles évitent les disputes, la casse ou le balayage le premier jour, par symbole. Les pratiques varient.", 4]]], ["After midnight", "Après minuit", "Mùng Hai: more people to love", "Mùng Hai : encore des visites", [["👨‍👩‍👧", "Visiting relatives", "Visiter la famille", "A traditional saying goes “Mùng Một Tết cha, mùng Hai Tết mẹ, mùng Ba Tết thầy.” It suggests a rhythm of visits, not a strict timetable for every family.", "Un dicton dit « Mùng Một Tết cha, mùng Hai Tết mẹ, mùng Ba Tết thầy ». C’est une tradition, pas un calendrier obligatoire.", 1], ["🧧", "Wishes and envelopes", "Vœux et enveloppes", "Bring your smile, greet everyone and enjoy the conversations. Lì xì and shared meals may continue throughout the visits.", "Souris, salue tout le monde et profite des conversations. Les enveloppes et les repas peuvent continuer pendant les visites.", 3]]], ["After midnight", "Après minuit", "Mùng Ba: gratitude and new memories", "Mùng Ba : gratitude et souvenirs", [["📚", "Remembering teachers", "Penser aux professeurs", "The saying associates Mùng Ba with honoring teachers. Today, families may visit relatives, travel or simply rest instead.", "Le dicton associe Mùng Ba au respect des enseignants. Aujourd’hui, on peut aussi visiter la famille, sortir ou se reposer.", 5], ["💗", "Your first Northern Tết", "Ton premier Tết du Nord", "The most important lesson is not memorizing every rule. It is sharing food, stories and time with the people you love.", "Le plus important n’est pas de mémoriser chaque règle : c’est partager des repas, des histoires et du temps avec ceux qu’on aime.", 6]]]];
const PHOTO_CREDITS = [{ "file": "Peach blossom on Tet holiday.jpg", "author": "Celia Doris", "caption": "Peach blossoms during Tết", "url": "https://commons.wikimedia.org/wiki/File:Peach_blossom_on_Tet_holiday.jpg" }, { "file": "Tet Hanoi.JPG", "author": "Chrisvomberg", "caption": "Tết decorations in Hà Nội", "url": "https://commons.wikimedia.org/wiki/File:Tet_Hanoi.JPG" }, { "file": "Nguyen lieu banh chung.jpg", "author": "Viethavvh", "caption": "Ingredients for bánh chưng", "url": "https://commons.wikimedia.org/wiki/File:Nguyen_lieu_banh_chung.jpg" }, { "file": "Bánh chưng và giò lụa.jpg", "author": "Yun Huang Yong", "caption": "Bánh chưng and giò lụa", "url": "https://commons.wikimedia.org/wiki/File:B%C3%A1nh_ch%C6%B0ng_v%C3%A0_gi%C3%B2_l%E1%BB%A5a.jpg" }, { "file": "Ancestors Altar or Gods Altar in Tet, North Vietnam.jpg", "author": "cadzo", "caption": "Tết altar in Northern Vietnam", "url": "https://commons.wikimedia.org/wiki/File:Ancestors_Altar_or_Gods_Altar_in_Tet%2C_North_Vietnam.jpg" }, { "file": "Ancestors Altar or Gods Altar in Tet, North Vietnam.jpg", "author": "cadzo", "caption": "Family altar at Tết", "url": "https://commons.wikimedia.org/wiki/File:Ancestors_Altar_or_Gods_Altar_in_Tet%2C_North_Vietnam.jpg" }, { "file": "Tet Hanoi.JPG", "author": "Chrisvomberg", "caption": "Tết in Hà Nội", "url": "https://commons.wikimedia.org/wiki/File:Tet_Hanoi.JPG" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "Family lucky-money tradition", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "Family greetings and lucky money", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "New Year wishes", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "A family moment during Tết", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "Relatives at Tết", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Bánh chưng và giò lụa.jpg", "author": "Yun Huang Yong", "caption": "Traditional food", "url": "https://commons.wikimedia.org/wiki/File:B%C3%A1nh_ch%C6%B0ng_v%C3%A0_gi%C3%B2_l%E1%BB%A5a.jpg" }, { "file": "Tet Hanoi.JPG", "author": "Chrisvomberg", "caption": "Hà Nội at Tết", "url": "https://commons.wikimedia.org/wiki/File:Tet_Hanoi.JPG" }, { "file": "Peach blossom on Tet holiday.jpg", "author": "Celia Doris", "caption": "Peach blossoms", "url": "https://commons.wikimedia.org/wiki/File:Peach_blossom_on_Tet_holiday.jpg" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "Family visit", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Tet Money.jpg", "author": "Wikimedia Commons contributor", "caption": "Lì xì", "url": "https://commons.wikimedia.org/wiki/File:Tet_Money.jpg" }, { "file": "Ancestors Altar or Gods Altar in Tet, North Vietnam.jpg", "author": "cadzo", "caption": "Family traditions", "url": "https://commons.wikimedia.org/wiki/File:Ancestors_Altar_or_Gods_Altar_in_Tet%2C_North_Vietnam.jpg" }, { "file": "Tet Hanoi.JPG", "author": "Chrisvomberg", "caption": "Tết in Hà Nội", "url": "https://commons.wikimedia.org/wiki/File:Tet_Hanoi.JPG" }, { "file": "Peach blossom on Tet holiday.jpg", "author": "Celia Doris", "caption": "Spring blossoms", "url": "https://commons.wikimedia.org/wiki/File:Peach_blossom_on_Tet_holiday.jpg" }];
const letter = `Dear Jarod, ♡\n\nHappy Lunar New Year, my love! 🧧\n\nCongratulations on surviving your very first Vietnamese son-in-law training program! I'm very proud of you, hehe.\n\nI made this little game because I wanted to share something special with you. Tết is more than a holiday to me. It's about family, traditions, childhood memories, and all the little things that remind me of home.\n\nEven though we grew up in different countries, speaking different languages and celebrating different traditions, I love that we get to discover each other's worlds.\n\nYou don't have to understand everything right away. We have plenty of time for me to teach you Vietnamese words, introduce you to new food, and laugh at your pronunciation. 🤭\n\nThank you for being curious about my world.\n\nWelcome to my culture, my love. ♡\n\nMaybe one day, we'll celebrate Tết together in Vietnam.\n\nChúc mừng năm mới, anh yêu! ❤️\n\nWith love,\nYour little Vietnamese girlfriend ♡`;
let state;
try {
    state = JSON.parse(localStorage.getItem(KEY));
}
catch (e) { }
;
if (!state || !Number.isInteger(state.stage))
    state = { stage: -1, phase: 'intro', score: 0, completed: false };
function save() { localStorage.setItem(KEY, JSON.stringify(state)); }
function button(label, action, secondary = false) { return `<button class="btn ${secondary ? 'secondary' : ''}" data-action="${action}">${label}</button>`; }
function bind() { app.querySelectorAll('[data-action]').forEach(b => b.onclick = () => actions[b.dataset.action]?.()); app.querySelectorAll('[data-lang]').forEach(b => b.onclick = () => { language = b.dataset.lang; localStorage.setItem('loveverse_tet_language', language); render(); }); }
function page(html) { app.innerHTML = `<header class="site-header"><div class="header-links"><a href="../../index.html">← Loveverse</a>${state.stage >= 0 ? `<button type="button" class="header-back" data-action="back">${tr("← Back", "← Retour")}</button>` : ""}</div><span>🌸 VIETNAMESE TẾT ACADEMY</span><div class="language-switch"><button data-lang="en" class="${language === 'en' ? 'active' : ''}">EN</button><button data-lang="fr" class="${language === 'fr' ? 'active' : ''}">FR</button></div></header>` + html; bind(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function unlock() { if (!state.completed)
    return; let items = []; try {
    items = JSON.parse(localStorage.getItem(REWARD_KEY) || '[]');
}
catch { } if (!Array.isArray(items))
    items = []; if (!items.some(x => x.id === 'tet-2027-real-experience'))
    items.push({ id: 'tet-2027-real-experience', title: 'One Real Tết Experience in Vietnam ♡', source: 'tet-2027', redeemed: false, status: 'available', createdAt: new Date().toISOString() }); localStorage.setItem(REWARD_KEY, JSON.stringify(items)); localStorage.setItem(MEMORY_KEY, JSON.stringify([{ id: 'tet-2027-letter', title: 'Welcome to My Culture, My Love ♡', date: '2027-02-06', letter, score: state.score }])); }
const quiz = [
    { q: ['What is the full Vietnamese name of your girlfriend?', 'Quel est le nom vietnamien complet de ta copine ?'], o: [['Quỳnh Anh Hoàng', 'Quỳnh Anh Hoàng'], ['Hoàng Quỳnh Anh', 'Hoàng Quỳnh Anh'], ['Anh Quỳnh Hoàng', 'Anh Quỳnh Hoàng']], a: 1, why: ['In Vietnamese name order, her name is Hoàng Quỳnh Anh. ♡', 'Dans l’ordre vietnamien, son nom est Hoàng Quỳnh Anh. ♡'] },
    { q: ['You are not sure how to address one of her relatives. What do you do?', 'Tu ne sais pas comment t’adresser à un membre de sa famille. Que fais-tu ?'], o: [['Call everyone by their first name', 'Appeler tout le monde par son prénom'], ['Say nothing and hide', 'Ne rien dire et te cacher'], ['Ask Quỳnh Anh for help!', 'Demander de l’aide à Quỳnh Anh !']], a: 2, why: ['Your girlfriend is your personal Vietnamese culture guide.', 'Ta copine est ton guide personnel de la culture vietnamienne.'] },
    { q: ['Which flower will you often see at Tết in Northern Vietnam?', 'Quelle fleur voit-on souvent au Tết dans le Nord du Vietnam ?'], o: [['Hoa đào — peach blossoms', 'Hoa đào — fleurs de pêcher'], ['Tulips', 'Tulipes'], ['Lavender', 'Lavande']], a: 0, why: ['Pink peach blossoms are a symbol of Northern Tết.', 'Les fleurs de pêcher roses symbolisent le Tết du Nord.'] },
    { q: ['An aunt asks “Bao giờ cưới?” What is the best response?', 'Une tante demande « Bao giờ cưới ? ». Quelle réponse choisir ?'], o: [['Không phải việc của bác!', 'Ça ne vous regarde pas !'], ['Dạ, chúng cháu đang tìm hiểu nhau thêm ạ!', 'On apprend encore à mieux se connaître !'], ['Run away', 'Prendre la fuite']], a: 1, why: ['You can keep your boundaries while answering respectfully.', 'Tu peux garder tes limites tout en répondant avec respect.'] },
    { q: ['What should you say to wish her family a happy new year?', 'Que dire pour souhaiter la bonne année à sa famille ?'], o: [['Good night!', 'Bonne nuit !'], ['See you later!', 'À plus tard !'], ['Chúc mừng năm mới!', 'Chúc mừng năm mới ! (Bonne année !)']], a: 2, why: ['Chúc mừng năm mới means Happy New Year!', 'Chúc mừng năm mới signifie Bonne année !'] },
    { q: ['What is the best thing to bring to your first Tết in Vietnam?', 'Quelle est la meilleure chose à apporter pour ton premier Tết au Vietnam ?'], o: [['A smile, curiosity, and your girlfriend beside you', 'Un sourire, de la curiosité et ta copine à tes côtés'], ['A perfect Vietnamese accent', 'Un accent vietnamien parfait'], ['An encyclopedia of rules', 'Une encyclopédie de règles']], a: 0, why: ['You do not need to know everything. We will discover it together. ♡', 'Tu n’as pas besoin de tout savoir. On découvrira tout ensemble. ♡'] }
];
const conversations = [
    { who: ['Her parents', 'Ses parents'], messages: [['them', 'Chào cháu, năm mới vui vẻ nhé!', 'Bonjour, bonne année à toi !'], ['me', 'Con chào hai bác ạ! Con chúc hai bác năm mới mạnh khỏe, hạnh phúc ạ!', 'Bonjour à vous deux ! Je vous souhaite une année pleine de santé et de bonheur !']] }
];
const familyScenarios = [
    { who: '👩🏻‍🦳 Bác gái', question: ['Bao giờ hai đứa cưới?', 'Vous vous mariez quand, tous les deux ?'], good: ['Dạ, chúng cháu đang tìm hiểu nhau thêm ạ!', 'On apprend encore à mieux se connaître !'], bad: ['Không phải việc của bác ạ!', 'Ça ne vous regarde pas !'], why: ['A polite answer keeps your boundaries without embarrassing an older relative.', 'Une réponse polie permet de garder ses limites sans vexer un aîné.'] },
    { who: '👨🏻 Chú', question: ['Cháu làm nghề gì? Lương bao nhiêu?', 'Tu fais quoi comme métier ? Tu gagnes combien ?'], good: ['Dạ, cháu làm việc trong lĩnh vực của cháu ạ. Công việc vẫn ổn ạ!', 'Je travaille dans mon domaine, et tout se passe bien !'], bad: ['Chú hỏi lương cháu để làm gì?', 'Pourquoi vous voulez connaître mon salaire ?'], why: ['You can answer the general question without revealing your salary.', 'Tu peux répondre de façon générale sans révéler ton salaire.'] },
    { who: '👩🏻 Bác gái', question: ['Ăn thêm đi cháu!', 'Reprends un peu à manger !'], good: ['Dạ, cháu no rồi ạ. Món này ngon lắm ạ!', 'Merci, je n’ai plus faim. C’était délicieux !'], bad: ['Không! Cháu không ăn nữa đâu!', 'Non ! Je ne mangerai plus rien !'], why: ['Thanking your host before declining sounds warmer.', 'Remercier la personne qui t’accueille avant de refuser est plus chaleureux.'] },
    { who: '👩🏻 Cô', question: ['Cháu biết nói tiếng Việt không?', 'Tu parles vietnamien ?'], good: ['Dạ, cháu biết một chút ạ. Cháu đang học thêm!', 'Un petit peu ! Je suis en train d’apprendre !'], bad: ['Cháu ở Pháp, cần gì học tiếng Việt!', 'Je vis en France, pourquoi j’apprendrais le vietnamien ?'], why: ['Trying a few words shows interest; perfect pronunciation is not necessary.', 'Essayer quelques mots montre ton intérêt ; pas besoin d’un accent parfait.'] },
    { who: '👨🏻‍🦳 Bác trai', question: ['Bao giờ hai đứa có em bé?', 'Vous aurez des enfants quand ?'], good: ['Dạ, chuyện đó chúng cháu chưa có kế hoạch ạ!', 'Nous n’avons pas encore de projet à ce sujet !'], bad: ['Bác hỏi chuyện riêng tư quá đấy!', 'Vous êtes vraiment indiscret !'], why: ['It is okay to set a boundary politely, even for very personal questions.', 'Tu as le droit de poser une limite poliment, même face à une question très personnelle.'] },
    { who: '👩🏻‍🦳 Dì', question: ['Sao cháu gầy thế? Ăn nhiều vào!', 'Pourquoi es-tu si mince ? Mange davantage !'], good: ['Dạ, cháu cảm ơn dì quan tâm ạ. Cháu ăn vừa đủ rồi ạ!', 'Merci de vous inquiéter pour moi. J’ai assez mangé !'], bad: ['Dì cũng nên bớt nhận xét người khác đi ạ!', 'Vous devriez arrêter de commenter le physique des autres !'], why: ['A gentle response can end the conversation without agreeing with the comment.', 'Une réponse douce peut clore la discussion sans approuver la remarque.'] }
];
let chatSelections = {};
function chatCard(c) { return `<article class="chat-card"><div class="chat-title">💬 ${tr(...c.who)}</div>${c.messages.map(m => `<div class="chat-bubble ${m[0] === 'me' ? 'mine' : ''}"><strong>${m[0] === 'me' ? 'Jarod' : tr(...c.who)}</strong><div class="vn-line">${m[1]}</div><small lang="fr">${m[2]}</small></div>`).join('')}</article>`; }
function familyChatCard(c, i) { const selected = chatSelections[i]; return `<article class="chat-card scenario-card"><div class="chat-title">${c.who}</div><div class="chat-bubble"><strong>${c.who}</strong><div class="vn-line">${c.question[0]}</div><small lang="fr">${c.question[1]}</small></div><p class="scenario-prompt">${tr('How would you reply?', 'Comment répondrais-tu ?')}</p><div class="scenario-options">${[['good', c.good], ['bad', c.bad]].map(([type, lines]) => `<button type="button" class="scenario-option ${selected === type ? 'selected ' + type : ''}" data-scenario="${i}" data-choice="${type}"><span class="vn-line">${lines[0]}</span><small lang="fr">${lines[1]}</small></button>`).join('')}</div>${selected ? `<div class="scenario-feedback ${selected}"><img class="feedback-meme" src="assets/memes/${selected === 'good' ? 'happy.png' : 'stop.png'}" alt="${selected === 'good' ? 'Happy reaction' : 'Disapproving reaction'}" loading="lazy"><strong>${selected === 'good' ? '✓ ' + tr('Respectful answer', 'Réponse respectueuse') : '✕ ' + tr('Careful!', 'Attention !')}</strong><p>${tr(...c.why)}</p></div>` : ''}</article>`; }
function bindScenarios() { app.querySelectorAll('[data-scenario]').forEach(b => b.addEventListener('click', () => { chatSelections[Number(b.dataset.scenario)] = b.dataset.choice; render(); document.querySelectorAll('.scenario-card')[Number(b.dataset.scenario)]?.scrollIntoView({ block: 'nearest', behavior: 'instant' }); })); }
const actions = { back() { if (state.completed) {
        if (state.phase === 'letter' || state.phase === 'certificate')
            state.phase = 'gifts';
        else if (state.phase === 'gifts')
            state.phase = 'fireworks';
        else {
            state.phase = 'gifts';
        }
        ;
    }
    else if (state.phase === 'results') {
        state.phase = 'test';
        state.quizIndex = quiz.length - 1;
    }
    else if (state.phase === 'test') {
        if (state.quizIndex > 0)
            state.quizIndex--;
        else {
            state.phase = 'lesson';
            state.stage = chapters.length - 1;
        }
    }
    else if (state.stage > 0) {
        state.stage--;
    }
    else {
        state.stage = -1;
        state.phase = 'intro';
    } save(); render(); }, start() { state = { stage: 0, phase: 'lesson', score: 0, completed: false, quizIndex: 0, answers: [] }; save(); render(); }, next() { state.stage++; if (state.stage >= chapters.length) {
        state.phase = 'test';
        state.quizIndex = 0;
        state.answers = [];
    }
    else
        state.phase = 'lesson'; save(); render(); }, answer() { const i = state.quizIndex; const checked = document.querySelector(`input[name="quiz-${i}"]:checked`); if (!checked)
        return; state.answers[i] = Number(checked.value); state.quizIndex++; if (state.quizIndex === quiz.length) {
        state.score = state.answers.reduce((n, v, i) => n + (v === quiz[i].a), 0);
        state.phase = 'results';
    } save(); render(); }, retry() { state.quizIndex = 0; state.answers = []; state.phase = 'test'; save(); render(); }, graduate() { if (state.score < 5)
        return; state.completed = true; state.phase = 'fireworks'; save(); render(); }, fireworks() { if (!state.completed)
        return; state.phase = 'fireworks'; save(); render(); }, gifts() { if (!state.completed)
        return; state.phase = 'gifts'; unlock(); save(); render(); }, letter() { if (!state.completed)
        return; state.phase = 'letter'; save(); render(); }, certificate() { if (!state.completed)
        return; state.phase = 'certificate'; save(); render(); }, home() { location.href = '../../index.html'; }, restart() { if (confirm('Restart the journey?'))
        actions.start(); } };
function testScreen() { const i = state.quizIndex, q = quiz[i]; page(`<section class="exam"><span class="eyebrow">🎓 ${tr('FINAL ASSESSMENT', 'EXAMEN FINAL')} · ${i + 1}/${quiz.length}</span><h1>${tr('Ready for the family?', 'Prêt à rencontrer la famille ?')}</h1><p>${tr('Answer at least 5 out of 6 correctly to graduate. You can try again as often as you like.', 'Réponds correctement à au moins 5 questions sur 6 pour obtenir ton diplôme. Tu peux recommencer autant que tu veux.')}</p><div class="exam-card"><h2>${tr(...q.q)}</h2>${q.o.map((o, j) => `<label class="exam-option"><input type="radio" name="quiz-${i}" value="${j}" ${state.answers?.[i] === j ? 'checked' : ''}><span>${tr(...o)}</span></label>`).join('')}<p><div class="nav-buttons">${button(tr('← Back', '← Retour'), 'back', true)}${button(tr('Confirm answer →', 'Valider →'), 'answer')}</div></p></div></section>`); }
function resultScreen() { const passed = state.score >= 5; page(`<section class="exam"><span class="eyebrow">🎓 ${tr('FINAL RESULTS', 'RÉSULTATS FINAUX')}</span><h1>${passed ? tr('You passed, Jarod! ♡', 'Tu as réussi, Jarod ! ♡') : tr('Almost there, my love!', 'Encore un petit effort, mon cœur !')}</h1><div class="score-display">${state.score} / ${quiz.length}</div><p>${passed ? tr('Your graduation surprise is waiting.', 'Ta surprise de fin de formation t’attend.') : tr('Review the traditions and give it another try.', 'Relis les traditions et réessaie.')}</p><div class="review-list">${quiz.map((q, i) => `<details><summary>${state.answers[i] === q.a ? '✓' : '✕'} ${tr(...q.q)}</summary><p>${tr(...q.why)}</p></details>`).join('')}</div>${button(tr('← Back', '← Retour'), 'back', true)} ${button(passed ? tr('Graduate & see the fireworks ♡', 'Obtenir mon diplôme et voir les feux d’artifice ♡') : tr('Try again ♡', 'Réessayer ♡'), passed ? 'graduate' : 'retry')}</section>`); }
function render() {
    if (!state.completed && state.phase === 'test')
        return testScreen();
    if (!state.completed && state.phase === 'results')
        return resultScreen();
    if (state.completed) {
        if (state.phase === 'fireworks')
            return finale();
        if (state.phase === 'letter')
            return showLetter();
        if (state.phase === 'certificate')
            return certificate();
        return gifts();
    }
    if (state.stage < 0)
        return page(`<section class="welcome"><div class="welcome-image"><img src="${CHIBI}" alt="Girlfriend in pink áo dài"></div><div><span class="eyebrow">🧧 LOVEVERSE SPECIAL · TẾT 2027</span><h1>${tr('Come celebrate Tết with me ♡', 'Viens fêter le Tết avec moi ♡')}</h1><p>${tr('Welcome to your Vietnamese son-in-law training, Jarod! First we prepare for Tết, then we celebrate, and finally we discover Mùng Một, Mùng Hai and Mùng Ba.', 'Bienvenue dans ta formation de gendre vietnamien, Jarod ! Nous allons préparer le Tết, le célébrer, puis découvrir Mùng Một, Mùng Hai et Mùng Ba.')}</p><p>${tr('A little illustrated journey through Northern Vietnamese traditions, with your girlfriend as your guide.', 'Un petit voyage illustré dans les traditions du Nord du Vietnam, avec ta copine comme guide.')}</p>${button(tr('Start our Tết journey →', 'Commencer notre voyage →'), 'start')}</div></section>`);
    const ch = chapters[state.stage], n = state.stage + 1, group = ch[0], phase = group === 'Before Tết' ? 0 : group === 'During Tết' ? 1 : 2;
    const tabs = [['BEFORE TẾT', 'AVANT LE TẾT'], ['DURING TẾT', 'PENDANT LE TẾT'], ['MÙNG 1 · 2 · 3', 'MÙNG 1 · 2 · 3']];
    // each fact is [emoji,titleEN,titleFR,bodyEN,bodyFR,imageIndex]
    // Use real photographs only where the subject actually matches the lesson.
    // Only use photographs whose documented subject matches the specific lesson.
    // Unphotographed customs receive a designed text illustration, never a misleading photo.
    // Photos supplied by Quỳnh Anh. Local files avoid broken hotlinks.
    // Captions describe what is actually visible, without claiming unverified provenance.
    const lessonPhotos = {
        '0-0': ['market.jpg', 'A busy Tết decoration market'],
        '0-1': ['peach-blossoms.jpg', 'Pink peach blossoms decorating a Vietnamese home'],
        '0-2': ['cleaning.jpg', 'Cleaning the home before Tết'],
        '1-0': ['banh-chung-closeup.jpg', 'Traditional square bánh chưng wrapped in green leaves'],
        '1-1': ['northern-feast.jpg', 'A festive Vietnamese family meal'],
        '1-2': ['year-end-feast.jpg', 'A family feast with chicken, spring rolls and other dishes'],
        '2-0': ['fireworks.jpg', 'Fireworks during a New Year celebration'],
        '2-1': ['offering.jpg', 'A festive offering table'],
        '2-2': ['family-visit.jpg', 'Visitors at a traditional house (illustration of a visit, not a documented xông đất ritual)'],
        '2-3': ['lixi.jpg', 'A red lucky-money envelope being given'],
        '3-0': ['tet/greeting-family.jpg', 'A family greeting during Tết'],
        '3-1': ['tet/new-year-greeting.jpg', 'Chúc mừng năm mới — red New Year greeting decoration'],
        '3-2': ['tet/thank-you-cat.jpg', 'Cảm ơn ạ — a cute thank-you meme'],
        '5-0': ['family-greeting.jpg', 'Relatives greeting each other'],
        '6-0': ['family-visit.jpg', 'People visiting a traditional home'],
        '6-1': ['lixi.jpg', 'Exchanging a lucky-money envelope']
    };
    let rows = ch[4].map((f, i) => { const photo = lessonPhotos[`${state.stage}-${i}`], hasPhoto = !!photo; const src = hasPhoto ? (photo[0].startsWith('tet/') ? '../../assets/' + photo[0] : 'assets/photos/' + photo[0]) : ''; return `<article class="story-row ${hasPhoto ? '' : 'text-story'}">${hasPhoto ? `<figure class="illustration real-photo"><img src="${src}" alt="${photo[1]}" loading="lazy" referrerpolicy="no-referrer" onerror="this.style.display='none';this.nextElementSibling.hidden=false"><div class="photo-fallback" hidden>📷 ${tr('Photo unavailable — open source', 'Photo indisponible — voir la source')}</div><figcaption>${photo[1]}</figcaption></figure>` : `<div class="fact-art" aria-hidden="true"><span class="fact-art-icon">${f[0]}</span><span class="fact-art-caption">${tr(f[1], f[2])}</span></div>`}<div class="story-copy"><span class="fact-number">${String(i + 1).padStart(2, '0')} / ${String(ch[4].length).padStart(2, '0')}</span><h2>${tr(f[1], f[2])}</h2><p>${tr(f[3], f[4])}</p></div></article>`; }).join('');
    if (state.stage === 0) {
        const peachRow = rows.indexOf('Pink peach blossoms decorating a Vietnamese home');
        if (peachRow >= 0) {
            const marker = '</article>';
            const end = rows.indexOf(marker, peachRow);
            if (end >= 0) {
                const insertAt = end + marker.length;
                const kumquat = `<article class="story-row"><figure class="illustration real-photo"><img src="assets/photos/kumquat-tree.jpg" alt="Kumquat tree with ripe orange fruits and red New Year ornament" loading="lazy"><figcaption>Cây quất — a kumquat tree decorated for Tết</figcaption></figure><div class="story-copy"><span class="fact-number">🌿</span><h2>${tr('Kumquat trees — Cây quất', 'Le kumquat — Cây quất')}</h2><p>${tr('Alongside pink peach blossoms, families in Northern Vietnam decorate with kumquat trees. Their golden fruit symbolizes abundance and good fortune.', 'Avec les fleurs de pêcher roses, les familles du Nord décorent leur maison avec des kumquats. Leurs fruits dorés évoquent la prospérité et la chance.')}</p></div></article>`;
                rows = rows.slice(0, insertAt) + kumquat + rows.slice(insertAt);
            }
        }
    }
    const chats = state.stage === 3 ? `<section class="chat-section"><h2>${tr('Practice greeting her parents', 'Entraîne-toi à saluer ses parents')}</h2>${chatCard(conversations[0])}</section>` : state.stage === 4 ? `<section class="chat-section"><h2>${tr('Family group chat simulator', 'Simulateur de discussion avec la famille')}</h2><p>${tr('Choose a polite or a rude reply, then learn why it matters.', 'Choisis une réponse polie ou impolie, puis découvre pourquoi.')}</p><figure class="relatives-meme"><img src="assets/memes/relatives-questions.jpg" alt="Comic showing relatives asking intrusive relationship questions" loading="lazy"><figcaption>${tr('The relatives have questions. Lots of questions.', 'La famille a des questions. Beaucoup de questions.')}</figcaption></figure><div class="chat-grid">${familyScenarios.map(familyChatCard).join('')}</div></section>` : '';
    page(`<nav class="journey-nav">${tabs.map((t, i) => `<span class="${phase === i ? 'current' : ''}">${tr(...t)}</span>`).join('')}</nav><div class="chapter-head"><span class="eyebrow">${tr(ch[0], ch[1])} · ${String(n).padStart(2, '0')} / ${chapters.length}</span><h1>${tr(ch[2], ch[3])}</h1><p>${tr('A little piece of Northern Vietnam, explained with love.', 'Un petit morceau du Nord du Vietnam, expliqué avec amour.')}</p><div class="progress"><div style="width:${n / chapters.length * 100}%"></div></div></div><div class="story-list">${rows}</div>${chats}<footer class="chapter-footer"><div class="guide-mini"><img src="${CHIBI}" alt="Girlfriend in pink áo dài"><span>${tr('See? You are learning my world, one little story at a time. ♡', 'Tu découvres mon univers, une petite histoire à la fois. ♡')}</span></div><div class="nav-buttons">${button(tr('← Previous chapter', '← Chapitre précédent'), 'back', true)}${button(n === chapters.length ? tr('Take the final test →', 'Passer le test final →') : tr('Next chapter →', 'Chapitre suivant →'), 'next')}</div></footer>`);
    if (state.stage === 4)
        bindScenarios();
}
function finale() {
    // The night-sky styling is scoped to the graduation finale only.
    if (!document.getElementById('tet-fireworks-style')) {
        const style = document.createElement('style');
        style.id = 'tet-fireworks-style';
        style.textContent = `
            .finale { position: relative; isolation: isolate; min-height: 100vh;
                background: #020207 !important; color: #fff !important; overflow: hidden; }
            .finale #heart-canvas { position: absolute; inset: 0; width: 100%; height: 100%;
                z-index: 0; pointer-events: none; display: block; }
            .finale .finale-content { position: relative; z-index: 1; margin: 0 auto;
                max-width: 760px; text-align: center; padding: 72px 20px 90px;
                text-shadow: 0 2px 18px #000, 0 0 32px #000; }
            .finale .finale-content h1 { color: #fff !important; }
            .finale .finale-content p { color: #fff0f5 !important; }
            .finale .heartbeat-heart { color: #ffb3d1; }
        `;
        document.head.appendChild(style);
    }
    page(`<div class="finale"><canvas id="heart-canvas" aria-hidden="true"></canvas><div class="finale-content"><span class="eyebrow">🧧 CHÚC MỪNG NĂM MỚI · TẾT 2027</span><div class="heartbeat-heart" aria-hidden="true">♥</div><h1>Welcome to my culture,<br>my love. ♡</h1><p>${tr('A little piece of Vietnam, from my heart to yours.', 'Un petit morceau du Vietnam, de mon cœur au tien.')}</p><img src="${CHIBI}" alt="Your girlfriend in pink áo dài holding a lucky envelope"><p>${tr('You did it, Jarod. I have one last surprise for you…', 'Tu as réussi, Jarod. Il me reste une dernière surprise pour toi…')}</p>${button(tr('Open your graduation surprises ♡', 'Découvrir tes surprises ♡'), 'gifts')}</div></div>`);
    heartFireworks();
}
function gifts() { page(`<div class="gifts"><span class="eyebrow">🎓 TRAINING COMPLETE</span><h1>Congratulations, Jarod! ♡</h1><img class="gift-chibi" src="${CHIBI}" alt="Pink áo dài chibi"><p>You have unlocked your official certificate, a real-life Tết experience voucher and a little letter from your girlfriend.</p><div class="gift-grid"><article class="gift-card"><span>🎓</span><h3>Son-in-Law Certificate</h3><p>Officially certified (by your girlfriend).</p>${button('View certificate', 'certificate')}</article><article class="gift-card"><span>💌</span><h3>A Letter From Me</h3><p>A little piece of home, written for you.</p>${button('Read my letter', 'letter')}</article></div><p>${button('Replay the heart fireworks ♡', 'fireworks', true)} ${button(tr('Back to Loveverse', 'Retour à Loveverse'), 'home', true)}</p><p class="muted">Your real Tết voucher is in Love Wallet, and your letter is in Memory Drawer — on this browser.</p></div>`); }
function certificate() { page(`<div class="certificate"><span class="eyebrow">🌸 VIETNAMESE FAMILY ACADEMY 🌸</span><h1>Certificate of Completion</h1><p>This certifies that</p><h2>Jarod ♡</h2><p>has completed the Northern Vietnamese Tết Training Program and is officially recognized as a</p><h3>Certified Vietnamese Son-in-Law 🧧</h3><img class="cert-chibi" src="${CHIBI}" alt="Girlfriend in pink áo dài"><p>Completed all 8 chapters · 06/02/2027</p><div class="ticket"><strong>🎟️ ONE REAL TẾT EXPERIENCE IN VIETNAM</strong><p>Redeem for an authentic Tết celebration together in Vietnam, with your girlfriend as your guide.</p><strong>Lifetime validity ♡</strong><p>Voucher saved to your Loveverse Wallet. Redemption requests use the Wallet’s existing approval flow.</p></div><p>Issued with love by your Vietnamese Girlfriend ♡</p></div><p class="row">${button('Read the letter 💌', 'letter')} ${button('Back to surprises', 'gifts', true)} ${button('Open Love Wallet', 'home', true)}</p>`); }
function showLetter() { page(`<div class="letter-page"><span class="eyebrow">💌 A LETTER FROM YOUR VIETNAMESE GIRLFRIEND</span><img class="gift-chibi" src="${CHIBI}" alt="Girlfriend in pink áo dài"><div class="letter">${letter}</div><p>${button('See my certificate', 'certificate')} ${button('Back to surprises', 'gifts', true)}</p></div>`); }
function heartFireworks() {
    const canvas = document.getElementById('heart-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // Lightweight canvas animation: limited DPR, particle count and glow passes.
    const rand = (a, b) => a + Math.random() * (b - a);
    const colors = [
        '#ff5a88', '#ff9ac3', // pink
        '#ff324d', '#ff654e', // red
        '#ffffff', '#e5f7ff', // white
        '#48aaff', '#79e5ff', // blue
        '#59f0b2', '#a4ff7a'  // green
    ];
    const rockets = [], sparks = [];
    let w = 0, h = 0, scale = 1, last = 0, next = 0, frame = 0, raf = 0;
    let active = true;
    const MAX_SPARKS = 1250;
    const TWO_PI = Math.PI * 2;

    function resize() {
        const rect = canvas.getBoundingClientRect();
        w = Math.max(1, rect.width);
        h = Math.max(1, rect.height);
        // Keeping the canvas at 1x or 1.35x prevents large GPU overdraw.
        scale = Math.min(window.devicePixelRatio || 1, 1.35);
        canvas.width = Math.round(w * scale);
        canvas.height = Math.round(h * scale);
        ctx.setTransform(scale, 0, 0, scale, 0, 0);
        ctx.fillStyle = '#020207';
        ctx.fillRect(0, 0, w, h);
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function launch() {
        if (rockets.length >= (w < 600 ? 7 : 11)) return;
        const x = rand(w * .12, w * .88);
        const tx = Math.max(70, Math.min(w - 70, x + rand(-w * .15, w * .15)));
        const ty = rand(h * .12, h * .57);
        const flight = rand(30, 49);
        rockets.push({
            x, y: h + 8, oldX: x, oldY: h + 8,
            vx: (tx - x) / flight, vy: (ty - h - 8) / flight,
            t: 0, flight, color: colors[Math.floor(rand(0, colors.length))]
        });
    }

    function burst(r) {
        // Bright heart-shaped ring with a soft sparkly fringe, as in real pyrotechnics.
        // Curve coordinates are target points, not straight-line particle rays.
        const count = w < 600 ? 42 : 55;
        const s = Math.min(w * .011, h * .013, 4.6) * rand(.86, 1.1);
        for (let i = 0; i < count && sparks.length < MAX_SPARKS; i++) {
            const t = i / count * TWO_PI;
            const hx = 16 * Math.sin(t) ** 3;
            const hy = -(13 * Math.cos(t) - 5 * Math.cos(2*t)
                       - 2 * Math.cos(3*t) - Math.cos(4*t));
            const jitter = rand(.94, 1.06);
            const ex = r.x + hx * s * jitter;
            const ey = r.y + hy * s * jitter;
            const duration = rand(28, 42);
            // Bezier curvature bends the trajectory around the heart.
            const bend = rand(-.17, .17);
            const cx = (r.x + ex) / 2 - (ey - r.y) * bend;
            const cy = (r.y + ey) / 2 + (ex - r.x) * bend - rand(4, 11);
            sparks.push({
                x: r.x, y: r.y, oldX: r.x, oldY: r.y,
                ox: r.x, oy: r.y, cx, cy, ex, ey,
                t: 0, duration, life: rand(68, 91),
                vx: 0, vy: 0, color: Math.random() < .12 ? '#fff4e8' : r.color,
                size: rand(.75, 1.55), twinkle: Math.random() < .28
            });
        }
        // Short-lived glowing fringe: a few scattered golden embers.
        for (let i = 0; i < 9 && sparks.length < MAX_SPARKS; i++) {
            const theta = rand(0, TWO_PI);
            const speed = rand(.35, 2.2);
            sparks.push({
                x: r.x, y: r.y, oldX: r.x, oldY: r.y,
                t: 999, duration: 0, life: rand(18, 37),
                vx: Math.cos(theta) * speed, vy: Math.sin(theta) * speed,
                color: '#ffe8b7', size: rand(.5, 1.2), twinkle: true
            });
        }
    }

    function animate(ms) {
        if (!active || document.getElementById('heart-canvas') !== canvas) {
            active = false;
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf);
            return;
        }
        if (document.hidden) {
            last = ms;
            raf = requestAnimationFrame(animate);
            return;
        }
        const dt = Math.min(1.6, (ms - (last || ms)) / 16.667);
        last = ms;
        frame += dt;
        next -= dt;
        if (next <= 0) {
            launch();
            next = rand(w < 600 ? 7 : 4, w < 600 ? 12 : 8);
            // Frequent launches and overlapping heart bursts, capped for performance.
        }

        // Fading background creates the luminous trails without expensive shadows.
        ctx.globalCompositeOperation = 'source-over';
        ctx.globalAlpha = 1;
        ctx.fillStyle = 'rgba(2, 2, 7, 0.28)';
        ctx.fillRect(0, 0, w, h);
        ctx.globalCompositeOperation = 'lighter';
        ctx.lineCap = 'round';

        for (let i = rockets.length - 1; i >= 0; i--) {
            const r = rockets[i];
            r.oldX = r.x; r.oldY = r.y;
            r.x += r.vx * dt;
            r.y += r.vy * dt;
            r.t += dt;
            ctx.strokeStyle = r.color;
            ctx.lineWidth = 2;
            ctx.globalAlpha = .95;
            ctx.beginPath();
            ctx.moveTo(r.oldX, r.oldY + 8);
            ctx.lineTo(r.x, r.y);
            ctx.stroke();
            if (r.t >= r.flight) {
                burst(r);
                rockets.splice(i, 1);
            }
        }

        for (let i = sparks.length - 1; i >= 0; i--) {
            const p = sparks[i];
            p.oldX = p.x; p.oldY = p.y;
            if (p.t < p.duration) {
                p.t = Math.min(p.duration, p.t + dt);
                const t = p.t / p.duration, u = 1 - t;
                p.x = u*u*p.ox + 2*u*t*p.cx + t*t*p.ex;
                p.y = u*u*p.oy + 2*u*t*p.cy + t*t*p.ey;
                if (p.t >= p.duration) {
                    p.vx = 2*(p.ex-p.cx)/p.duration * .24;
                    p.vy = 2*(p.ey-p.cy)/p.duration * .24;
                }
            } else {
                p.x += p.vx * dt;
                p.y += p.vy * dt;
                p.vx *= Math.pow(.985, dt);
                p.vy = p.vy * Math.pow(.985, dt) + .055 * dt;
            }
            p.life -= dt;
            if (p.life <= 0) {
                sparks.splice(i, 1);
                continue;
            }
            const opacity = Math.min(1, p.life / 27) *
                (p.twinkle && Math.random() < .1 ? .38 : .94);
            ctx.strokeStyle = p.color;
            ctx.lineWidth = p.size;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(p.oldX, p.oldY);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();

            // Rare tiny pinpoints, no costly shadowBlur per particle.
            if (p.twinkle && Math.random() < .035) {
                ctx.fillStyle = '#fff8ef';
                ctx.globalAlpha = opacity * .8;
                ctx.fillRect(p.x - 1, p.y - 1, 2, 2);
            }
        }
        ctx.globalAlpha = 1;
        ctx.globalCompositeOperation = 'source-over';
        raf = requestAnimationFrame(animate);
    }

    // Start immediately, silently.
    for (let i = 0; i < (w < 600 ? 5 : 8); i++) launch();
    raf = requestAnimationFrame(animate);
}

render();
