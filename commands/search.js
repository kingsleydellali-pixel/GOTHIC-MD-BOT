/**
 * GOTHIC MD BOT V6 — Search Commands
 * Made by KINGSLEY-XMD
 */

const axios = require('axios');

const commands = [
  {
    name: 'google',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔍 Usage: `.google <query>`');
      const url = `https://www.google.com/search?q=${encodeURIComponent(text)}`;
      return reply(`🔍 *Google Search*\n\n${url}`);
    },
  },
  {
    name: 'wikipedia',
    aliases: ['wiki'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📚 Usage: `.wiki <topic>`');
      try {
        const { data } = await axios.get(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(text)}`);
        return reply(`📚 *${data.title}*\n\n${data.extract}\n\n🔗 ${data.content_urls?.desktop?.page || ''}`);
      } catch (e) {
        return reply(`❌ No Wikipedia article found for "${text}".`);
      }
    },
  },
  {
    name: 'news',
    async run(ctx) {
      const { text, reply } = ctx;
      return reply(`📰 *News*\n\nSearching news${text ? ` for "${text}"` : ''}...\n\n> Connect a news API to enable live results.`);
    },
  },
  {
    name: 'imdb',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎬 Usage: `.imdb <movie name>`');
      return reply(`🎬 Searching IMDb: ${text}`);
    },
  },
  {
    name: 'github',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🐙 Usage: `.github <username or repo>`');
      try {
        const { data } = await axios.get(`https://api.github.com/users/${text}`);
        return reply(
`🐙 *GitHub Profile*\n\n👤 ${data.login}\n📝 ${data.bio || 'No bio'}\n👥 Followers: ${data.followers}\n📦 Repos: ${data.public_repos}\n🔗 ${data.html_url}`
        );
      } catch (e) {
        return reply(`❌ GitHub user "${text}" not found.`);
      }
    },
  },
  {
    name: 'npm',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📦 Usage: `.npm <package>`');
      try {
        const { data } = await axios.get(`https://registry.npmjs.org/${text}`);
        const latest = data['dist-tags'].latest;
        return reply(`📦 *${data.name}*\n\n📝 ${data.description || 'No description'}\n🏷️ Latest: ${latest}\n🔗 https://npmjs.com/package/${data.name}`);
      } catch (e) {
        return reply(`❌ Package "${text}" not found on npm.`);
      }
    },
  },
  {
    name: 'dictionary',
    aliases: ['define'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📖 Usage: `.define <word>`');
      try {
        const { data } = await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${text}`);
        const entry = data[0];
        const meanings = entry.meanings.slice(0, 3).map(m =>
          `*${m.partOfSpeech}*: ${m.definitions[0].definition}`
        ).join('\n\n');
        return reply(`📖 *${entry.word}*\n\n${meanings}`);
      } catch (e) {
        return reply(`❌ Word "${text}" not found.`);
      }
    },
  },
  {
    name: 'lyrics',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎵 Usage: `.lyrics <song name>`');
      return reply(`🎵 Searching lyrics: ${text}`);
    },
  },
  {
    name: 'anime',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎌 Usage: `.anime <title>`');
      try {
        const { data } = await axios.get(`https://api.jikan.moe/v4/anime?q=${encodeURIComponent(text)}&limit=1`);
        const a = data.data[0];
        return reply(
`🎌 *${a.title}*\n\n⭐ Score: ${a.score}\n📺 Episodes: ${a.episodes}\n📅 Year: ${a.year}\n📝 ${a.synopsis?.slice(0, 300)}...`
        );
      } catch (e) {
        return reply(`❌ Anime "${text}" not found.`);
      }
    },
  },
  {
    name: 'manga',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📖 Usage: `.manga <title>`');
      return reply(`📖 Searching manga: ${text}`);
    },
  },
  {
    name: 'movie',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎬 Usage: `.movie <title>`');
      return reply(`🎬 Searching movie: ${text}`);
    },
  },
  {
    name: 'weather',
    async run(ctx) {
      return ctx.reply('☁️ Use `.weather <city>` from the Tools menu.');
    },
  },
  {
    name: 'time',
    async run(ctx) {
      const { text, reply } = ctx;
      const tz = text || 'UTC';
      try {
        const time = new Date().toLocaleString('en-US', { timeZone: tz });
        return reply(`🕐 *Time in ${tz}*\n\n${time}`);
      } catch (e) {
        return reply('❌ Invalid timezone. Example: `.time Africa/Nairobi`');
      }
    },
  },
  {
    name: 'country',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🌍 Usage: `.country <name>`');
      try {
        const { data } = await axios.get(`https://restcountries.com/v3.1/name/${encodeURIComponent(text)}`);
        const c = data[0];
        return reply(
`🌍 *${c.name.common}*\n\n🏛️ Capital: ${c.capital?.[0]}\n👥 Population: ${c.population.toLocaleString()}\n💰 Currency: ${Object.values(c.currencies || {})[0]?.name}\n🗣️ Language: ${Object.values(c.languages || {})[0]}`
        );
      } catch (e) {
        return reply(`❌ Country "${text}" not found.`);
      }
    },
  },
];

module.exports = commands;