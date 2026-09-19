/**
 * GOTHIC MD BOT V6 — Download Commands
 * Made by KINGSLEY-XMD
 */

const commands = [
  {
    name: 'play',
    aliases: ['song', 'music'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎵 Usage: `.play <song name>`');
      return reply(`🎵 *Searching:* ${text}\n\n> Connect a music API to enable downloads.`);
    },
  },
  {
    name: 'video',
    aliases: ['ytmp4'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎬 Usage: `.video <video name or URL>`');
      return reply(`🎬 *Searching:* ${text}\n\n> Connect a video API to enable downloads.`);
    },
  },
  {
    name: 'ytmp3',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎵 Usage: `.ytmp3 <YouTube URL>`');
      return reply('🎵 Processing YouTube audio...');
    },
  },
  {
    name: 'instagram',
    aliases: ['ig', 'insta'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📸 Usage: `.instagram <post URL>`');
      return reply('📸 Processing Instagram media...');
    },
  },
  {
    name: 'tiktok',
    aliases: ['tt'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎵 Usage: `.tiktok <video URL>`');
      return reply('🎵 Processing TikTok video...');
    },
  },
  {
    name: 'facebook',
    aliases: ['fb'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📘 Usage: `.facebook <video URL>`');
      return reply('📘 Processing Facebook video...');
    },
  },
  {
    name: 'twitter',
    aliases: ['x'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🐦 Usage: `.twitter <tweet URL>`');
      return reply('🐦 Processing Twitter media...');
    },
  },
  {
    name: 'spotify',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎧 Usage: `.spotify <track URL>`');
      return reply('🎧 Processing Spotify track...');
    },
  },
  {
    name: 'apk',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📱 Usage: `.apk <app name>`');
      return reply(`📱 Searching APK: ${text}`);
    },
  },
  {
    name: 'mediafire',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('💾 Usage: `.mediafire <file URL>`');
      return reply('💾 Processing MediaFire link...');
    },
  },
  {
    name: 'pinterest',
    aliases: ['pin'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📌 Usage: `.pinterest <search query>`');
      return reply(`📌 Searching Pinterest: ${text}`);
    },
  },
  {
    name: 'wallpaper',
    async run(ctx) {
      const { text, reply, send } = ctx;
      if (!text) return reply('🖼️ Usage: `.wallpaper <topic>`');
      const url = `https://source.unsplash.com/1080x1920/?${encodeURIComponent(text)}`;
      return send({ image: { url }, caption: `🖼️ Wallpaper: ${text}` });
    },
  },
  {
    name: 'ringtone',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🔔 Usage: `.ringtone <song name>`');
      return reply(`🔔 Searching ringtone: ${text}`);
    },
  },
];

module.exports = commands;