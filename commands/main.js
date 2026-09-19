/**
 * GOTHIC MD BOT V6 — Main Menu & Menu Dispatcher
 * Made by KINGSLEY-XMD
 */

const MENUS = {
  main: {
    title: '⚡ MAIN MENU',
    icon: '🏠',
    commands: [
      'menu', 'ping', 'alive', 'owner', 'repo', 'channel',
      'help', 'list', 'uptime', 'botinfo',
    ],
  },
  group: {
    title: '👥 GROUP MENU',
    icon: '👥',
    commands: [
      'kick', 'add', 'promote', 'demote', 'mute', 'unmute',
      'groupinfo', 'tagall', 'hidetag', 'linkgroup', 'revoke',
      'setname', 'setdesc', 'welcome', 'goodbye', 'antilink',
      'warn', 'warnings', 'resetwarn', 'poll', 'votetest',
    ],
  },
  download: {
    title: '📥 DOWNLOAD MENU',
    icon: '📥',
    commands: [
      'play', 'song', 'video', 'ytmp3', 'ytmp4', 'instagram',
      'tiktok', 'facebook', 'twitter', 'spotify', 'apk',
      'mediafire', 'pinterest', 'wallpaper', 'ringtone',
    ],
  },
  fun: {
    title: '🎮 FUN MENU',
    icon: '🎮',
    commands: [
      'joke', 'quote', 'truth', 'dare', 'meme', 'roast',
      'ship', 'rate', 'gayrate', 'simp', 'pp', 'iq',
      '8ball', 'flip', 'roll', 'wouldyourather', 'pickupline',
    ],
  },
  owner: {
    title: '👑 OWNER MENU',
    icon: '👑',
    commands: [
      'restart', 'shutdown', 'broadcast', 'setprefix', 'setbotname',
      'setbotimage', 'setchannel', 'setowner', 'getsession',
      'backup', 'restore', 'eval', 'exec', 'block', 'unblock',
      'blocklist', 'join', 'leave',
    ],
  },
  video: {
    title: '🎬 VIDEO MENU',
    icon: '🎬',
    commands: [
      'ytsearch', 'ytinfo', 'ytchannel', 'videoinfo', 'gif',
      'togif', 'tovideo', 'mp4', 'compress', 'extractaudio',
      'subtitle', 'vimeo', 'dailymotion',
    ],
  },
  tools: {
    title: '🔧 TOOLS MENU',
    icon: '🔧',
    commands: [
      'sticker', 'toimage', 'removebg', 'blur', 'enhance',
      'qr', 'readqr', 'shorten', 'expand', 'base64', 'deb64',
      'tts', 'translate', 'weather', 'ip', 'whois', 'dns',
      'password', 'uuid', 'timestamp', 'calc',
    ],
  },
  search: {
    title: '🔍 SEARCH MENU',
    icon: '🔍',
    commands: [
      'google', 'wikipedia', 'wiki', 'news', 'imdb',
      'github', 'npm', 'pypi', 'dictionary', 'define',
      'lyrics', 'anime', 'manga', 'character', 'movie',
      'weather', 'time', 'currency', 'country',
    ],
  },
  settings: {
    title: '⚙️ SETTINGS MENU',
    icon: '⚙️',
    commands: [
      'setprefix', 'setbotname', 'setbotimage', 'setchannel',
      'setowner', 'setwelcome', 'setgoodbye', 'setantilink',
      'setantispam', 'setautoread', 'setautoreact', 'setlanguage',
      'settimezone', 'reset', 'config', 'status',
    ],
  },
  ai: {
    title: '🤖 AI MENU',
    icon: '🤖',
    commands: [
      'ai', 'gpt', 'gemini', 'chatgpt', 'imagine', 'generate',
      'summarize', 'explain', 'code', 'fixcode', 'translate',
      'sentiment', 'ocr', 'transcribe', 'caption', 'story',
      'poem', 'essay', 'email', 'resume',
    ],
  },
};

const BOT_NAME = 'GOTHIC MD BOT V6';
const OWNER = 'KINGSLEY-XMD';
const PREFIX = '.';

function buildMenu(key, ctx) {
  const menu = MENUS[key];
  if (!menu) return null;

  const lines = menu.commands.map(c => `  ${PREFIX}${c}`).join('\n');
  return (
`╔══════════════════════════════╗
║  ${menu.icon} *${menu.title}*
║  ${BOT_NAME}
║  by ${OWNER}
╚══════════════════════════════╝

${lines}

> Type ${PREFIX}menu for main menu
> ${PREFIX}ai for AI commands`;
}

const handler = {
  name: 'menu',
  aliases: ['help', 'commands', 'cmd', 'list'],
  async run(ctx) {
    const { sock, from, msg, args, prefix, send } = ctx;
    const key = args[0]?.toLowerCase();

    // Specific submenu
    if (key && MENUS[key]) {
      return send({
        image: { url: ctx.settings.botImage },
        caption: buildMenu(key, ctx),
      });
    }

    // Main menu with image
    const totalCmds = Object.values(MENUS).reduce((a, m) => a + m.commands.length, 0);
    const menuText =
`╔══════════════════════════════╗
║   ⚡ *${BOT_NAME}* ⚡
║   by *${OWNER}*
╚══════════════════════════════╝

👋 Hello ${ctx.sender.split('@')[0]}!

*📊 BOT INFO*
├ Prefix : \`${PREFIX}\`
├ Commands : ${totalCmds}+
├ Version : ${ctx.settings.version}
└ Status : ✅ Online

*📋 MENUS*
├ ${PREFIX}menu main
├ ${PREFIX}menu group
├ ${PREFIX}menu download
├ ${PREFIX}menu fun
├ ${PREFIX}menu owner
├ ${PREFIX}menu video
├ ${PREFIX}menu tools
├ ${PREFIX}menu search
├ ${PREFIX}menu settings
└ ${PREFIX}menu ai

*🔗 LINKS*
├ ${PREFIX}channel
└ ${PREFIX}repo

> _Reply with a menu name to see its commands_`;

    return send({
      image: { url: ctx.settings.botImage },
      caption: menuText,
    });
  },
};

// Submenu commands
const subMenus = Object.keys(MENUS).map(key => ({
  name: key + 'menu',
  aliases: [key + '_menu'],
  async run(ctx) {
    return ctx.send({
      image: { url: ctx.settings.botImage },
      caption: buildMenu(key, ctx),
    });
  },
}));

module.exports = [handler, ...subMenus, { MENUS }];