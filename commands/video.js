/**
 * GOTHIC MD BOT V6 — Video Commands
 * Made by KINGSLEY-XMD
 */

const commands = [
  {
    name: 'ytsearch',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔍 Usage: `.ytsearch <query>`');
      return reply(`🔍 Searching YouTube: ${text}`);
    },
  },
  {
    name: 'ytinfo',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('ℹ️ Usage: `.ytinfo <YouTube URL>`');
      return reply('ℹ️ Fetching video info...');
    },
  },
  {
    name: 'gif',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎞️ Usage: `.gif <search>`');
      return reply(`🎞️ Searching GIF: ${text}`);
    },
  },
  {
    name: 'togif',
    async run(ctx) {
      return ctx.reply('🎞️ Reply to a short video with `.togif` to convert it.');
    },
  },
  {
    name: 'tovideo',
    async run(ctx) {
      return ctx.reply('🎬 Reply to a GIF with `.tovideo` to convert it.');
    },
  },
  {
    name: 'mp4',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎬 Usage: `.mp4 <video URL>`');
      return reply('🎬 Processing MP4...');
    },
  },
  {
    name: 'compress',
    async run(ctx) {
      return ctx.reply('📉 Reply to a video with `.compress` to reduce its size.');
    },
  },
  {
    name: 'extractaudio',
    aliases: ['toaudio'],
    async run(ctx) {
      return ctx.reply('🎵 Reply to a video with `.extractaudio` to extract its audio.');
    },
  },
  {
    name: 'subtitle',
    async run(ctx) {
      return ctx.reply('📝 Reply to a video with `.subtitle` to generate subtitles.');
    },
  },
  {
    name: 'vimeo',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎬 Usage: `.vimeo <URL>`');
      return reply('🎬 Processing Vimeo video...');
    },
  },
  {
    name: 'dailymotion',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎬 Usage: `.dailymotion <URL>`');
      return reply('🎬 Processing Dailymotion video...');
    },
  },
];

module.exports = commands;
