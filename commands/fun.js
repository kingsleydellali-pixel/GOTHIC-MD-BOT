/**
 * GOTHIC MD BOT V6 — Fun Commands
 * Made by KINGSLEY-XMD
 */

const JOKES = [
  "Why don't programmers like nature? It has too many bugs. 🐛",
  "Why did the developer go broke? Because he used up all his cache. 💸",
  "What's a programmer's favorite hangout place? Foo Bar. 🍺",
  "Why do Java developers wear glasses? Because they don't C#. 👓",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍻",
];

const QUOTES = [
  "The only way to do great work is to love what you do. — Steve Jobs",
  "Code is like humor. When you have to explain it, it's bad. — Cory House",
  "First, solve the problem. Then, write the code. — John Johnson",
  "Experience is the name everyone gives to their mistakes. — Oscar Wilde",
  "Simplicity is the soul of efficiency. — Austin Freeman",
];

const PICKUPLINES = [
  "Are you a Wi-Fi signal? Because I'm feeling a strong connection. 📶",
  "Are you a bug? Because you've been on my mind all day. 🐛",
  "Do you have a map? I keep getting lost in your eyes. 🗺️",
  "Are you made of copper and tellurium? Because you're Cu-Te. ⚛️",
  "If you were a function, you'd be called 'myEverything()'. 💻",
];

function pick(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

const commands = [
  { name: 'joke', async run(ctx) { return ctx.reply(`😂 *Joke*\n\n${pick(JOKES)}`); } },
  { name: 'quote', async run(ctx) { return ctx.reply(`💬 *Quote*\n\n${pick(QUOTES)}`); } },
  {
    name: 'truth',
    async run(ctx) { return ctx.reply(`🎯 *Truth*\n\nWhat's the most embarrassing thing you've ever done in public?`); },
  },
  {
    name: 'dare',
    async run(ctx) { return ctx.reply(`🔥 *Dare*\n\nSend a voice note singing your favorite song.`); },
  },
  {
    name: 'meme',
    async run(ctx) {
      return ctx.send({ image: { url: 'https://i.imgur.com/1.jpg' }, caption: '😂 Meme of the day!' });
    },
  },
  {
    name: 'roast',
    async run(ctx) {
      const { reply, msg } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      const target = mentioned[0] ? '@' + mentioned[0].split('@')[0] : 'you';
      return reply(`🔥 ${target} is so slow, they got a degree in waiting. 😂`);
    },
  },
  {
    name: 'ship',
    async run(ctx) {
      const { reply, msg } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (mentioned.length < 2) return reply('💕 Mention two users to ship them.');
      const pct = Math.floor(Math.random() * 101);
      return reply(`💕 *Ship Meter*\n\n@${mentioned[0].split('@')[0]} + @${mentioned[1].split('@')[0]}\n\nLove: *${pct}%* ${pct > 70 ? '❤️🔥' : pct > 40 ? '💛' : '💔'}`);
    },
  },
  { name: 'rate', async run(ctx) { return ctx.reply(`⭐ Your rating: *${Math.floor(Math.random() * 11)}/10*`); } },
  { name: 'gayrate', async run(ctx) { return ctx.reply(`🏳️‍🌈 Gay rate: *${Math.floor(Math.random() * 101)}%*`); } },
  { name: 'simp', async run(ctx) { return ctx.reply(`😍 Simp level: *${Math.floor(Math.random() * 101)}%*`); } },
  { name: 'pp', async run(ctx) { return ctx.reply(`🍆 PP size: *${Math.floor(Math.random() * 21)}cm*`); } },
  { name: 'iq', async run(ctx) { return ctx.reply(`🧠 Your IQ: *${Math.floor(Math.random() * 200) + 1}*`); } },
  {
    name: '8ball',
    async run(ctx) {
      const answers = ['Yes ✅', 'No ❌', 'Maybe 🤔', 'Definitely 💯', 'Absolutely not 🚫', 'Ask again later ⏳'];
      const q = ctx.text || 'your question';
      return ctx.reply(`🎱 *8-Ball*\n\nQ: ${q}\nA: ${pick(answers)}`);
    },
  },
  {
    name: 'flip',
    async run(ctx) {
      return ctx.reply(`🪙 *Coin Flip*\n\n${Math.random() < 0.5 ? 'HEADS' : 'TAILS'}`);
    },
  },
  {
    name: 'roll',
    async run(ctx) {
      return ctx.reply(`🎲 *Dice Roll*\n\nYou rolled: *${Math.floor(Math.random() * 6) + 1}*`);
    },
  },
  {
    name: 'wouldyourather',
    aliases: ['wyr'],
    async run(ctx) {
      return ctx.reply('🤔 *Would You Rather...*\n\nHave unlimited money but never travel, OR travel the world but always broke?');
    },
  },
  { name: 'pickupline', async run(ctx) { return ctx.reply(`💘 *Pickup Line*\n\n${pick(PICKUPLINES)}`); } },
];

module.exports = commands;