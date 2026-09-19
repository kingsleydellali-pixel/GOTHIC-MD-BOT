/**
 * GOTHIC MD BOT V6 — Configuration
 * Made by KINGSLEY-XMD
 */

module.exports = {
  // ── Bot Identity ──────────────────────────────
  botName: 'GOTHIC MD BOT V6',
  botOwner: 'KINGSLEY-XMD',
  prefix: '.',
  botImage: 'https://i.ibb.co/zVyCpvQX/ERFAN-MD.jpg', // menu image
  version: '6.0.0',

  // ── Session ───────────────────────────────────
  // Paste your session ID from the GOTHIC MD BOT V6 pairing site
  // Supports both prefixed (GOTHIC-MD:~...) and raw base64 strings
  sessionId: process.env.SESSION_ID || '',

  // ── Owner ─────────────────────────────────────
  ownerNumber: process.env.OWNER_NUMBER || '233535502036', // your number (international, no +)

  // ── WhatsApp Channel ──────────────────────────
  channelJid: process.env.CHANNEL_JID || '120363421962437402@newsletter',
  channelUrl: 'https://whatsapp.com/channel/0029Vb6zdPc5vKAAAY0imG2R', // your channel invite link
  autoFollowChannel: true,
  autoReactChannel: true,
  // Smart reaction pool — picks randomly for variety
  channelReactions: ['❤️', '🔥', '👍', '💯', '⚡', '😍', '🙌', '✨', '💪', '🎉'],

  // ── AI ────────────────────────────────────────
  aiApiUrl: process.env.AI_API_URL || '',
  aiApiKey: process.env.AI_API_KEY || '',

  // ── Limits ────────────────────────────────────
  maxWarnings: 3,
  antiLink: true,
  antiSpam: true,
  autoRead: false,

  // ── Messages ──────────────────────────────────
  messages: {
    wait: '⏳ _Processing, please wait..._',
    success: '✅ _Done!_',
    error: '❌ _Something went wrong._',
    notAdmin: '🛡️ _This command is for group admins only._',
    notOwner: '👑 _This command is for the bot owner only._',
    groupOnly: '👥 _This command can only be used in a group._',
    privateOnly: '📩 _This command can only be used in private chat._',
  }
};