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
  sessionId: process.env.SESSION_ID || 'GOTHIC-MD:~eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoic05vSHh1eEFtdkUrWHM0K1Q2R0l3MHhOelJXZFFmRXI4WS8ySG53SVNXUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidGVQWElNeVRQYmpyYXZUMVpRZFR2TnFQVDYya2JJeXdzVjcwcS8zYVFVST0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBRGkxRGF5WkhKelVXRmtiKzBDNW1ubng0Sy9PeW13OUU2dWVERXZPK1VFPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJFOER0WnplUFNwZWZZL3FueGVLQmtLQ3hpVGh4bWU2Vyt3ZDFvYmxIb0ZZPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlNEeFJ4UmY4MXNNKytNWVhQRXlVbUlWV3R3cmk1MHJCc0hvZmdtdTNIbTA9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImRiQmxlRG41Y2VuZndtR3U0UnFIbVBqQ2U5emk4bTBBK3RHN2puRFBUbDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUJWRVF5VVVTWUFqc2p1VXJHMnY5SGRTWFgrVTlUQXNMakkrTnJ4VzVFdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiS3k2NGtkSGdUMHpHZFdjNjl3WmxjN0plV3QraS9VdXF4ZXQ1ZndoSnIwST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjdRblNJeHdrMFB2UUx3RWV4TzE2Q0VLajdJLzVzSFNHY0dtd1paY2F3M1pYMWVlcHN4TTNOS29zRkxNUDltMHlZblZONXpad0djOVZra2lvL0w0RGpBPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MzIsImFkdlNlY3JldEtleSI6IkwvSHREZWhtNTc2dmNteFA1bGVDZkhlRGJQN0NmcWZFS0hlNXlWNVU1d0k9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMiwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMyLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJyZWdpc3RlcmVkIjp0cnVlLCJwYWlyaW5nQ29kZSI6IjdZWTQzNU1LIiwibWUiOnsiaWQiOiIyMzM1MzU1MDIwMzY6NjVAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiIxMjI5NDgyMDM1OTM5MTk6NjVAbGlkIiwibmFtZSI6IuKWkeKWkuKWk+KWiCBLSU5HU0xFWS1YTUQgVEVDSCDilogifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0srdm5wVUNFUFM4dTlVR0dBSWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6InlTMmJrTU5xVjUvR2lLb2RSc1hqaTFvU2hBR2VlTGFPZVQ2cmp5KytYMkU9IiwiYWNjb3VudFNpZ25hdHVyZSI6ImdIdENnbUdiRWJkY0xRZHh3SjduOEFaakhFZk95TUd0ZDNQL2Ewd0UxUUVYSmJnMEZWbU94UFZjM3ArdXhvcVhpL0pCdHdHVVZxaG1aZE1vbms1V0N3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJpZTZrM01UTytCVnZENXJwV3hqME53cVNWY2tudyt3V09aQ2dMdG1RTEhGMjNySnpoQ2lBSnQxeW5BN0psSlVIS005cWsyNUk0TjllbDl3Yk9GT3JqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjIzMzUzNTUwMjAzNjo2NUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJja3RtNUREYWxlZnhvaXFIVWJGNDR0YUVvUUJubmkyam5rK3E0OHZ2bDloIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwicm91dGluZ0luZm8iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJDQUlJRWdnTiJ9LCJsYXN0QWNjb3VudFN5bmNUaW1lc3RhbXAiOjE3ODk4NDUxMjIsIm15QXBwU3RhdGVLZXlJZCI6IkFBQUFBSGZvIn0=',

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
