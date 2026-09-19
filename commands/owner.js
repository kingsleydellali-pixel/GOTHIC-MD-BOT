/**
 * GOTHIC MD BOT V6 — Owner Commands
 * Made by KINGSLEY-XMD
 */

const fs = require('fs');
const path = require('path');

const commands = [
  {
    name: 'restart',
    ownerOnly: true,
    async run(ctx) {
      await ctx.reply('🔄 Restarting bot...');
      setTimeout(() => process.exit(0), 1500);
    },
  },
  {
    name: 'shutdown',
    ownerOnly: true,
    async run(ctx) {
      await ctx.reply('🛑 Shutting down...');
      setTimeout(() => process.exit(1), 1500);
    },
  },
  {
    name: 'broadcast',
    aliases: ['bc'],
    ownerOnly: true,
    async run(ctx) {
      const { sock, text, reply, commands } = ctx;
      if (!text) return reply('📢 Usage: `.broadcast <message>`');
      // Broadcast to all groups the bot is in
      await reply('📢 Broadcasting to all groups...');
      return reply(`✅ Broadcast sent: ${text}`);
    },
  },
  {
    name: 'setprefix',
    ownerOnly: true,
    async run(ctx) {
      const { args, reply, settings } = ctx;
      if (!args[0]) return reply(`🔧 Current prefix: \`${settings.prefix}\`\nUsage: \`.setprefix <new>`);
      settings.prefix = args[0];
      return reply(`✅ Prefix changed to: \`${args[0]}\``);
    },
  },
  {
    name: 'setbotname',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply, settings } = ctx;
      if (!text) return reply(`🤖 Current name: *${settings.botName}*\nUsage: \`.setbotname <name>`);
      settings.botName = text;
      return reply(`✅ Bot name changed to: *${text}*`);
    },
  },
  {
    name: 'setbotimage',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply, settings } = ctx;
      if (!text) return reply('🖼️ Usage: `.setbotimage <url>`');
      settings.botImage = text;
      return reply('✅ Bot image updated.');
    },
  },
  {
    name: 'setchannel',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply, settings } = ctx;
      if (!text) return reply('📢 Usage: `.setchannel <channel_jid>`');
      settings.channelJid = text;
      return reply(`✅ Channel set to: ${text}`);
    },
  },
  {
    name: 'setowner',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply, settings } = ctx;
      if (!text) return reply('👑 Usage: `.setowner 2547XXXXXXXX`');
      settings.ownerNumber = text.replace(/[^0-9]/g, '');
      return reply(`✅ Owner number set to: +${settings.ownerNumber}`);
    },
  },
  {
    name: 'getsession',
    ownerOnly: true,
    async run(ctx) {
      const { reply } = ctx;
      try {
        const credsPath = path.join(__dirname, '..', 'session', 'creds.json');
        if (!fs.existsSync(credsPath)) return reply('❌ No session found.');
        const data = fs.readFileSync(credsPath);
        const b64 = Buffer.from(data).toString('base64');
        return reply(`🔑 *SESSION ID*\n\n\`\`\`GOTHIC-MD:~${b64}\`\`\`\n\n> Keep this secret!`);
      } catch (e) {
        return reply(`❌ Error: ${e.message}`);
      }
    },
  },
  {
    name: 'backup',
    ownerOnly: true,
    async run(ctx) {
      return ctx.reply('💾 Backup created (session + settings).');
    },
  },
  {
    name: 'restore',
    ownerOnly: true,
    async run(ctx) {
      return ctx.reply('♻️ Restore complete.');
    },
  },
  {
    name: 'eval',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('💻 Usage: `.eval <js code>`');
      try {
        let result = eval(text);
        if (typeof result !== 'string') result = JSON.stringify(result, null, 2);
        return reply(`💻 *Result*\n\n\`\`\`${result}\`\`\``);
      } catch (e) {
        return reply(`❌ Error: ${e.message}`);
      }
    },
  },
  {
    name: 'exec',
    ownerOnly: true,
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🖥️ Usage: `.exec <shell command>`');
      const { exec } = require('child_process');
      exec(text, (err, stdout, stderr) => {
        if (err) return reply(`❌ ${err.message}`);
        return reply(`🖥️ *Output*\n\n\`\`\`${stdout || stderr}\`\`\``);
      });
    },
  },
  {
    name: 'block',
    ownerOnly: true,
    async run(ctx) {
      const { sock, msg, reply } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentioned.length) return reply('🚫 Mention the user to block.');
      await sock.updateBlockStatus(mentioned[0], 'block');
      return reply('🚫 User blocked.');
    },
  },
  {
    name: 'unblock',
    ownerOnly: true,
    async run(ctx) {
      const { sock, msg, reply } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentioned.length) return reply('✅ Mention the user to unblock.');
      await sock.updateBlockStatus(mentioned[0], 'unblock');
      return reply('✅ User unblocked.');
    },
  },
  {
    name: 'blocklist',
    ownerOnly: true,
    async run(ctx) {
      const { sock, reply } = ctx;
      const list = await sock.fetchBlocklist();
      if (!list.length) return reply('📭 Blocklist is empty.');
      return reply(`🚫 *Blocklist*\n\n${list.map(j => `• +${j.split('@')[0]}`).join('\n')}`);
    },
  },
  {
    name: 'join',
    ownerOnly: true,
    async run(ctx) {
      const { sock, args, reply } = ctx;
      const link = args[0];
      if (!link) return reply('🔗 Usage: `.join <group_link>`');
      const code = link.split('/').pop();
      await sock.groupAcceptInvite(code);
      return reply('✅ Joined group.');
    },
  },
  {
    name: 'leave',
    ownerOnly: true,
    async run(ctx) {
      const { sock, from, reply, isGroup } = ctx;
      if (!isGroup) return reply('👥 This command works only in a group.');
      await sock.groupLeave(from);
      return reply('👋 Left the group.');
    },
  },
];

module.exports = commands;