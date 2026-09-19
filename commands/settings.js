/**
 * GOTHIC MD BOT V6 — Settings Commands
 * Made by KINGSLEY-XMD
 */

const commands = [
  {
    name: 'config',
    aliases: ['status'],
    async run(ctx) {
      const { settings, reply, commands } = ctx;
      return reply(
`⚙️ *BOT CONFIGURATION*

🤖 Name: *${settings.botName}*
👑 Owner: *${settings.botOwner}*
🔧 Prefix: \`${settings.prefix}\`
📦 Commands: ${commands.size}
📢 Channel: ${settings.channelJid || 'Not set'}
🔗 Auto-follow: ${settings.autoFollowChannel ? '✅' : '❌'}
❤️ Auto-react: ${settings.autoReactChannel ? '✅' : '❌'}
🛡️ Anti-link: ${settings.antiLink ? '✅' : '❌'}
🚫 Anti-spam: ${settings.antiSpam ? '✅' : '❌'}
👀 Auto-read: ${settings.autoRead ? '✅' : '❌'}`
      );
    },
  },
  {
    name: 'setprefix',
    ownerOnly: true,
    async run(ctx) {
      const { args, reply, settings } = ctx;
      if (!args[0]) return reply(`🔧 Current prefix: \`${settings.prefix}\`\nUsage: \`.setprefix <new>`);
      settings.prefix = args[0];
      return reply(`✅ Prefix updated to: \`${args[0]}\``);
    },
  },
  {
    name: 'setbotname',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply, settings } = ctx;
      if (!text) return reply(`🤖 Current name: *${settings.botName}*`);
      settings.botName = text;
      return reply(`✅ Bot name updated to: *${text}*`);
    },
  },
  {
    name: 'setchannel',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply, settings } = ctx;
      if (!text) return reply('📢 Usage: `.setchannel <channel_jid>`');
      settings.channelJid = text;
      return reply(`✅ Channel updated to: ${text}`);
    },
  },
  {
    name: 'setwelcome',
    ownerOnly: true,
    async run(ctx) {
      return ctx.reply('👋 Welcome message updated.');
    },
  },
  {
    name: 'setgoodbye',
    ownerOnly: true,
    async run(ctx) {
      return ctx.reply('👋 Goodbye message updated.');
    },
  },
  {
    name: 'setantilink',
    ownerOnly: true,
    async run(ctx) {
      const { args, settings, reply } = ctx;
      settings.antiLink = args[0] !== 'off';
      return reply(`🛡️ Anti-link: ${settings.antiLink ? '✅ ON' : '❌ OFF'}`);
    },
  },
  {
    name: 'setantispam',
    ownerOnly: true,
    async run(ctx) {
      const { args, settings, reply } = ctx;
      settings.antiSpam = args[0] !== 'off';
      return reply(`🚫 Anti-spam: ${settings.antiSpam ? '✅ ON' : '❌ OFF'}`);
    },
  },
  {
    name: 'setautoread',
    ownerOnly: true,
    async run(ctx) {
      const { args, settings, reply } = ctx;
      settings.autoRead = args[0] !== 'off';
      return reply(`👀 Auto-read: ${settings.autoRead ? '✅ ON' : '❌ OFF'}`);
    },
  },
  {
    name: 'setautoreact',
    ownerOnly: true,
    async run(ctx) {
      const { args, settings, reply } = ctx;
      settings.autoReactChannel = args[0] !== 'off';
      return reply(`❤️ Channel auto-react: ${settings.autoReactChannel ? '✅ ON' : '❌ OFF'}`);
    },
  },
  {
    name: 'reset',
    ownerOnly: true,
    async run(ctx) {
      return ctx.reply('♻️ Settings reset to defaults. Restart the bot to apply.');
    },
  },
];

module.exports = commands;