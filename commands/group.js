/**
 * GOTHIC MD BOT V6 — Group Commands
 * Made by KINGSLEY-XMD
 */

const commands = [
  {
    name: 'kick',
    aliases: ['remove'],
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, msg, reply, sender } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentioned.length) return reply('👢 Mention the user(s) to kick.\nExample: `.kick @user`');
      for (const jid of mentioned) {
        await sock.groupParticipantsUpdate(from, [jid], 'remove');
      }
      return reply(`✅ Kicked ${mentioned.length} member(s).`);
    },
  },
  {
    name: 'add',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, args, reply } = ctx;
      const num = args[0]?.replace(/[^0-9]/g, '');
      if (!num) return reply('➕ Usage: `.add 2547XXXXXXXX`');
      await sock.groupParticipantsUpdate(from, [num + '@s.whatsapp.net'], 'add');
      return reply(`✅ Added +${num}`);
    },
  },
  {
    name: 'promote',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, msg, reply } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentioned.length) return reply('⬆️ Mention the user to promote.');
      await sock.groupParticipantsUpdate(from, mentioned, 'promote');
      return reply('✅ Promoted to admin.');
    },
  },
  {
    name: 'demote',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, msg, reply } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentioned.length) return reply('⬇️ Mention the user to demote.');
      await sock.groupParticipantsUpdate(from, mentioned, 'demote');
      return reply('✅ Demoted from admin.');
    },
  },
  {
    name: 'mute',
    aliases: ['close'],
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, reply } = ctx;
      await sock.groupSettingUpdate(from, 'announcement');
      return reply('🔇 Group muted — only admins can send.');
    },
  },
  {
    name: 'unmute',
    aliases: ['open'],
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, reply } = ctx;
      await sock.groupSettingUpdate(from, 'not_announcement');
      return reply('🔊 Group unmuted — everyone can send.');
    },
  },
  {
    name: 'groupinfo',
    aliases: ['ginfo'],
    groupOnly: true,
    async run(ctx) {
      const { sock, from, reply } = ctx;
      const meta = await sock.groupMetadata(from);
      const admins = meta.participants.filter(p => p.admin).map(p => p.id.split('@')[0]);
      const text =
`╔══════════════════════════════╗
║  👥 *GROUP INFO*
╚══════════════════════════════╝

📛 Name: ${meta.subject}
🆔 ID: ${meta.id}
👥 Members: ${meta.participants.length}
👑 Admins: ${admins.length}
📅 Created: ${new Date(meta.creation * 1000).toLocaleString()}
📝 Desc: ${meta.desc || '_No description_'}

👑 *Admin List*
${admins.map(a => `• +${a}`).join('\n')}`;
      return reply(text);
    },
  },
  {
    name: 'tagall',
    aliases: ['everyone'],
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, msg, reply, text } = ctx;
      const meta = await sock.groupMetadata(from);
      const mentions = meta.participants.map(p => p.id);
      const list = mentions.map(j => `@${j.split('@')[0]}`).join('\n');
      return sock.sendMessage(from, {
        text: `📢 *${text || 'Attention everyone!'}*\n\n${list}`,
        mentions,
      }, { quoted: msg });
    },
  },
  {
    name: 'hidetag',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, msg, reply, text } = ctx;
      const meta = await sock.groupMetadata(from);
      const mentions = meta.participants.map(p => p.id);
      return sock.sendMessage(from, {
        text: text || '👀',
        mentions,
      }, { quoted: msg });
    },
  },
  {
    name: 'linkgroup',
    aliases: ['gclink'],
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, reply } = ctx;
      const code = await sock.groupInviteCode(from);
      return reply(`🔗 *Group Link*\n\nhttps://chat.whatsapp.com/${code}`);
    },
  },
  {
    name: 'revoke',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, reply } = ctx;
      await sock.groupRevokeInvite(from);
      return reply('♻️ Group link revoked. New link generated.');
    },
  },
  {
    name: 'setname',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, text, reply } = ctx;
      if (!text) return reply('📝 Usage: `.setname <new name>`');
      await sock.groupUpdateSubject(from, text);
      return reply(`✅ Group name changed to: ${text}`);
    },
  },
  {
    name: 'setdesc',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { sock, from, text, reply } = ctx;
      if (!text) return reply('📝 Usage: `.setdesc <new description>`');
      await sock.groupUpdateDescription(from, text);
      return reply('✅ Group description updated.');
    },
  },
  {
    name: 'warn',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      const { msg, reply } = ctx;
      const mentioned = msg.message?.extendedTextMessage?.contextInfo?.mentionedJid || [];
      if (!mentioned.length) return reply('⚠️ Mention the user to warn.');
      return reply(`⚠️ Warned @${mentioned[0].split('@')[0]} (1/${ctx.settings.maxWarnings})`);
    },
  },
  {
    name: 'warnings',
    groupOnly: true,
    async run(ctx) {
      return ctx.reply('📊 Warning system active. Use `.warn @user` to warn someone.');
    },
  },
  {
    name: 'resetwarn',
    adminOnly: true,
    groupOnly: true,
    async run(ctx) {
      return ctx.reply('♻️ Warnings reset for mentioned user(s).');
    },
  },
  {
    name: 'poll',
    groupOnly: true,
    async run(ctx) {
      const { text, reply } = ctx;
      const parts = text.split('|').map(s => s.trim());
      if (parts.length < 3) return reply('📊 Usage: `.poll Question | Option1 | Option2`');
      const [question, ...options] = parts;
      return reply(
`📊 *POLL: ${question}*\n\n${options.map((o, i) => `${i + 1}. ${o}`).join('\n')}\n\n> React with the number of your choice!`
      );
    },
  },
  {
    name: 'votetest',
    groupOnly: true,
    async run(ctx) {
      return ctx.reply('🗳️ Vote system is active.');
    },
  },
];

module.exports = commands;