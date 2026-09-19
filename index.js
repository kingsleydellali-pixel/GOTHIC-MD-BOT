/**
 * GOTHIC MD BOT V6 — Main Entry
 * Made by KINGSLEY-XMD
 * Works with any Baileys session ID (prefixed or raw base64)
 */

const fs = require('fs');
const path = require('path');
const express = require('express');
const pino = require('pino');
const bodyParser = require('body-parser');
const {
  default: makeWASocket,
  useMultiFileAuthState,
  Browsers,
  delay,
  makeCacheableSignalKeyStore,
  fetchLatestBaileysVersion,
  DisconnectReason,
  BufferJSON,
  proto,
  jidNormalizedUser,
} = require('@whiskeysockets/baileys');

const settings = require('./settings');
const { makeid } = require('./id');

// ── Express server (for Render health checks + pairing pages) ──
const app = express();
const __path = process.cwd();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__path));

const pairRouter = require('./pair');
const qrRouter = require('./qr');
app.use('/code', pairRouter);
app.use('/qr', qrRouter);
app.use('/pair', (req, res) => res.sendFile(path.join(__path, 'pair.html')));
app.use('/', (req, res) => res.sendFile(path.join(__path, 'main.html')));
app.get('/ping', (req, res) => res.send('GOTHIC MD BOT V6 :: alive'));

app.listen(port, () => {
  console.log(`📡 GOTHIC MD BOT V6 web server on http://localhost:${port}`);
});

// ── Load commands from /commands ──
const commands = new Map();
const aliases = new Map();

function loadCommands() {
  const cmdDir = path.join(__dirname, 'commands');
  if (!fs.existsSync(cmdDir)) {
    console.log('⚠️  No commands folder found — creating empty.');
    fs.mkdirSync(cmdDir, { recursive: true });
    return;
  }
  const files = fs.readdirSync(cmdDir).filter(f => f.endsWith('.js'));
  for (const file of files) {
    try {
      delete require.cache[require.resolve(path.join(cmdDir, file))];
      const mod = require(path.join(cmdDir, file));
      const list = Array.isArray(mod) ? mod : [mod];
      for (const cmd of list) {
        if (!cmd || !cmd.name) continue;
        const names = [cmd.name, ...(cmd.aliases || [])].map(n => n.toLowerCase());
        for (const n of names) {
          commands.set(n, cmd);
        }
        console.log(`  ✅ Loaded: ${cmd.name} (${names.join(', ')})`);
      }
    } catch (e) {
      console.log(`  ❌ Failed to load ${file}: ${e.message}`);
    }
  }
  console.log(`📦 ${commands.size} command keys loaded.\n`);
}
loadCommands();

// ── Session loader ─────────────────────────────
// Accepts: "GOTHIC-MD:~<base64>" OR raw "<base64>"
function decodeSession(sessionString) {
  if (!sessionString) return null;
  let raw = sessionString.trim();
  // Strip any prefix before ":~"
  const prefixMatch = raw.match(/^[^:]+:~(.+)$/s);
  if (prefixMatch) raw = prefixMatch[1];
  // Try base64 decode
  try {
    const decoded = Buffer.from(raw, 'base64').toString('utf-8');
    const parsed = JSON.parse(decoded, BufferJSON.reviver);
    if (parsed && parsed.noiseKey) return parsed;
  } catch (e) {
    // not base64 JSON — maybe it's already a creds object
  }
  return null;
}

// ── WhatsApp connection ────────────────────────
async function startBot() {
  const sessionDir = path.join(__dirname, 'session');
  const { state, saveCreds } = await useMultiFileAuthState(sessionDir);
  const { version } = await fetchLatestBaileysVersion();
  const logger = pino({ level: 'silent' });

  const sock = makeWASocket({
    version,
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, logger),
    },
    printQRInTerminal: false,
    logger,
    browser: Browsers.ubuntu('Chrome'),
    connectTimeoutMs: 60000,
    keepAliveIntervalMs: 10000,
    generateHighQualityLinkPreview: true,
  });

  // ── Load session ID from env if provided ──
  if (settings.sessionId && !sock.authState.creds.registered) {
    const creds = decodeSession(settings.sessionId);
    if (creds) {
      try {
        // Write decoded creds into the auth state
        const credsPath = path.join(sessionDir, 'creds.json');
        fs.writeFileSync(credsPath, JSON.stringify(creds, BufferJSON.replacer, 2));
        console.log('🔑 Session ID loaded from SESSION_ID — restarting with credentials...');
        await delay(1000);
        // Re-init auth state with the new creds
        const { state: newState, saveCreds: newSave } = await useMultiFileAuthState(sessionDir);
        sock.authState.creds = newState.creds;
        sock.authState.keys = makeCacheableSignalKeyStore(newState.keys, logger);
        sock.ev.removeAllListeners('creds.update');
        sock.ev.on('creds.update', newSave);
      } catch (e) {
        console.log('❌ Failed to load session ID:', e.message);
      }
    } else {
      console.log('⚠️  SESSION_ID provided but could not be decoded. Falling back to QR.');
    }
  }

  sock.ev.on('creds.update', saveCreds);

  // ── Connection updates ──
  sock.ev.on('connection.update', async (update) => {
    const { connection, lastDisconnect } = update;

    if (connection === 'open') {
      console.log(`\n✅ ${settings.botName} connected!`);
      console.log(`📱 Owner: ${settings.ownerNumber}`);
      console.log(`👑 Made by: ${settings.botOwner}\n`);

      // Auto-follow WhatsApp channel
      if (settings.autoFollowChannel && settings.channelJid) {
        try {
          await sock.newsletterFollow(settings.channelJid);
          console.log(`📢 Auto-followed channel: ${settings.channelJid}`);
        } catch (e) {
          console.log('⚠️  Channel follow failed:', e.message);
        }
      }

      // Send startup message to owner
      try {
        const ownerJid = settings.ownerNumber + '@s.whatsapp.net';
        await sock.sendMessage(ownerJid, {
          image: { url: settings.botImage },
          caption:
`⚡ *${settings.botName}* ⚡

✅ Bot is online and connected!
👑 Owner: ${settings.botOwner}
🔧 Prefix: \`${settings.prefix}\`
📦 Commands: ${commands.size}

Type \`${settings.prefix}menu\` to see all commands.`
        });
      } catch (e) {
        console.log('⚠️  Could not send startup message:', e.message);
      }
    }

    if (connection === 'close') {
      const code = lastDisconnect?.error?.output?.statusCode;
      const shouldReconnect = code !== DisconnectReason.loggedOut;
      console.log(`🔌 Connection closed (code ${code}). Reconnect: ${shouldReconnect}`);
      if (shouldReconnect) {
        await delay(5000);
        startBot();
      } else {
        console.log('🚪 Logged out. Delete ./session and restart to re-pair.');
      }
    }
  });

  // ── Channel post auto-reaction ──
  sock.ev.on('messages.upsert', async ({ messages, type }) => {
    if (type !== 'notify') return;

    for (const msg of messages) {
      if (!msg.message) continue;
      const from = msg.key.remoteJid;

      // Auto-react to channel posts
      if (
        settings.autoReactChannel &&
        from &&
        from.endsWith('@newsletter') &&
        from === settings.channelJid
      ) {
        const emojis = settings.channelReactions;
        const emoji = emojis[Math.floor(Math.random() * emojis.length)];
        try {
          await sock.sendMessage(from, {
            react: { text: emoji, key: msg.key }
          });
        } catch (e) {
          // silent
        }
        continue; // don't process channel posts as commands
      }

      // ── Command processing ──
      await handleMessage(sock, msg);
    }
  });

  return sock;
}

// ── Message handler ────────────────────────────
async function handleMessage(sock, msg) {
  try {
    const from = msg.key.remoteJid;
    const isGroup = from?.endsWith('@g.us');
    const sender = isGroup ? msg.key.participant : from;
    const senderJid = jidNormalizedUser(sender);

    // Extract text
    const body =
      msg.message?.conversation ||
      msg.message?.extendedTextMessage?.text ||
      msg.message?.imageMessage?.caption ||
      msg.message?.videoMessage?.caption ||
      '';
    if (!body) return;

    const prefix = settings.prefix;
    if (!body.startsWith(prefix)) return;

    const withoutPrefix = body.slice(prefix.length).trim();
    if (!withoutPrefix) return;

    const [rawCmd, ...args] = withoutPrefix.split(/\s+/);
    const cmdName = rawCmd.toLowerCase();
    const text = args.join(' ');

    const cmd = commands.get(cmdName);
    if (!cmd) return;

    // ── Permission checks ──
    const isOwner = senderJid === jidNormalizedUser(settings.ownerNumber + '@s.whatsapp.net');

    if (cmd.ownerOnly && !isOwner) {
      return sock.sendMessage(from, { text: settings.messages.notOwner }, { quoted: msg });
    }
    if (cmd.groupOnly && !isGroup) {
      return sock.sendMessage(from, { text: settings.messages.groupOnly }, { quoted: msg });
    }
    if (cmd.privateOnly && isGroup) {
      return sock.sendMessage(from, { text: settings.messages.privateOnly }, { quoted: msg });
    }

    // Group admin check
    if (cmd.adminOnly && isGroup) {
      try {
        const meta = await sock.groupMetadata(from);
        const participant = meta.participants.find(p => jidNormalizedUser(p.id) === senderJid);
        const isAdmin = participant?.admin === 'admin' || participant?.admin === 'superadmin';
        if (!isAdmin && !isOwner) {
          return sock.sendMessage(from, { text: settings.messages.notAdmin }, { quoted: msg });
        }
      } catch (e) {
        return sock.sendMessage(from, { text: settings.messages.notAdmin }, { quoted: msg });
      }
    }

    // ── Execute command ──
    const ctx = {
      sock,
      msg,
      from,
      sender: senderJid,
      isGroup,
      isOwner,
      args,
      text,
      command: cmdName,
      prefix,
      settings,
      commands,
      reply: (txt, opts = {}) => sock.sendMessage(from, { text: txt, ...opts }, { quoted: msg }),
      send: (content, opts = {}) => sock.sendMessage(from, content, { quoted: msg }),
    };

    console.log(`📨 ${senderJid} → .${cmdName} ${text ? '| ' + text : ''}`);
    await cmd.run(ctx);

  } catch (err) {
    console.error('❌ Handler error:', err);
  }
}

// ── Start ──────────────────────────────────────
console.log(`
╔══════════════════════════════════════════╗
║   ⚡ GOTHIC MD BOT V6 ⚡                ║
║   Made by KINGSLEY-XMD                   ║
║   Prefix: .                              ║
║   Working with any Baileys session       ║
╚══════════════════════════════════════════╝
`);

startBot().catch(err => {
  console.error('💥 Fatal startup error:', err);
  process.exit(1);
});

module.exports = { app, startBot, commands };