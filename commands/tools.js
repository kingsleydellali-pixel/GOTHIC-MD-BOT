/**
 * GOTHIC MD BOT V6 — Tools Commands
 * Made by KINGSLEY-XMD
 */

const axios = require('axios');

const commands = [
  {
    name: 'sticker',
    aliases: ['s'],
    async run(ctx) {
      const { msg, reply, send } = ctx;
      const quoted = msg.message?.extendedTextMessage?.contextInfo?.quotedMessage;
      const img = msg.message?.imageMessage || quoted?.imageMessage;
      if (!img) return reply('🖼️ Reply to an image with `.sticker` to convert it.');
      return reply('🖼️ Sticker creation requires image processing setup.');
    },
  },
  {
    name: 'toimage',
    async run(ctx) {
      return ctx.reply('🖼️ Reply to a sticker with `.toimage` to convert it.');
    },
  },
  {
    name: 'removebg',
    async run(ctx) {
      return ctx.reply('🖼️ Reply to an image with `.removebg` to remove its background.');
    },
  },
  {
    name: 'blur',
    async run(ctx) {
      return ctx.reply('🖼️ Reply to an image with `.blur` to blur it.');
    },
  },
  {
    name: 'enhance',
    async run(ctx) {
      return ctx.reply('🖼️ Reply to an image with `.enhance` to upscale it.');
    },
  },
  {
    name: 'qr',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔳 Usage: `.qr <text>`');
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(text)}`;
      return ctx.send({ image: { url }, caption: `🔳 QR for: ${text}` });
    },
  },
  {
    name: 'readqr',
    async run(ctx) {
      return ctx.reply('🔍 Reply to a QR image with `.readqr` to decode it.');
    },
  },
  {
    name: 'shorten',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔗 Usage: `.shorten <url>`');
      try {
        const { data } = await axios.get(`https://tinyurl.com/api-create.php?url=${encodeURIComponent(text)}`);
        return reply(`🔗 *Short URL*\n\n${data}`);
      } catch (e) {
        return reply(`❌ ${e.message}`);
      }
    },
  },
  {
    name: 'expand',
    async run(ctx) {
      return ctx.reply('🔗 Usage: `.expand <short_url>` — resolves shortened links.');
    },
  },
  {
    name: 'base64',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔐 Usage: `.base64 <text>`');
      return reply(`🔐 *Base64*\n\n\`${Buffer.from(text).toString('base64')}\``);
    },
  },
  {
    name: 'deb64',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔓 Usage: `.deb64 <base64>`');
      try {
        return reply(`🔓 *Decoded*\n\n${Buffer.from(text, 'base64').toString('utf-8')}`);
      } catch (e) {
        return reply(`❌ ${e.message}`);
      }
    },
  },
  {
    name: 'tts',
    async run(ctx) {
      return ctx.reply('🔊 Usage: `.tts <text>` — text-to-speech.');
    },
  },
  {
    name: 'translate',
    async run(ctx) {
      return ctx.reply('🌍 Use `.translate <lang> <text>` from the AI menu.');
    },
  },
  {
    name: 'weather',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('☁️ Usage: `.weather <city>`');
      try {
        const { data } = await axios.get(`https://wttr.in/${encodeURIComponent(text)}?format=j1`);
        const cur = data.current_condition[0];
        return reply(
`☁️ *Weather in ${text}*\n\n🌡️ Temp: ${cur.temp_C}°C\n💧 Humidity: ${cur.humidity}%\n🌬️ Wind: ${cur.windspeedKmph} km/h\n📝 ${cur.weatherDesc[0].value}`
        );
      } catch (e) {
        return reply(`❌ ${e.message}`);
      }
    },
  },
  {
    name: 'ip',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🌐 Usage: `.ip <address>`');
      try {
        const { data } = await axios.get(`http://ip-api.com/json/${text}`);
        return reply(
`🌐 *IP Info*\n\nIP: ${data.query}\nCountry: ${data.country}\nCity: ${data.city}\nISP: ${data.isp}`
        );
      } catch (e) {
        return reply(`❌ ${e.message}`);
      }
    },
  },
  {
    name: 'whois',
    async run(ctx) {
      return ctx.reply('🔍 Usage: `.whois <domain>`');
    },
  },
  {
    name: 'dns',
    async run(ctx) {
      return ctx.reply('🌐 Usage: `.dns <domain>`');
    },
  },
  {
    name: 'password',
    async run(ctx) {
      const { args, reply } = ctx;
      const len = parseInt(args[0]) || 16;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
      let pass = '';
      for (let i = 0; i < len; i++) pass += chars[Math.floor(Math.random() * chars.length)];
      return reply(`🔑 *Generated Password*\n\n\`${pass}\``);
    },
  },
  {
    name: 'uuid',
    async run(ctx) {
      const { reply } = ctx;
      const { randomUUID } = require('crypto');
      return reply(`🆔 *UUID*\n\n\`${randomUUID()}\``);
    },
  },
  {
    name: 'timestamp',
    async run(ctx) {
      const { reply } = ctx;
      return reply(`⏰ *Timestamp*\n\nUnix: ${Math.floor(Date.now() / 1000)}\nISO: ${new Date().toISOString()}`);
    },
  },
  {
    name: 'calc',
    aliases: ['math'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🧮 Usage: `.calc 2+2*5`');
      try {
        const result = Function(`"use strict"; return (${text})`)();
        return reply(`🧮 *Result*\n\n${text} = *${result}*`);
      } catch (e) {
        return reply(`❌ Invalid expression.`);
      }
    },
  },
];

module.exports = commands;