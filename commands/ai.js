/**
 * GOTHIC MD BOT V6 — AI Commands
 * Made by KINGSLEY-XMD
 */

const axios = require('axios');
const settings = require('../settings');

async function askAI(prompt) {
  if (!settings.aiApiUrl || !settings.aiApiKey) {
    return '⚠️ AI is not configured. Set AI_API_URL and AI_API_KEY in your environment.';
  }
  try {
    const { data } = await axios.post(
      settings.aiApiUrl,
      { prompt, max_tokens: 1024 },
      { headers: { Authorization: `Bearer ${settings.aiApiKey}` }, timeout: 30000 }
    );
    return data?.result || data?.response || data?.text || JSON.stringify(data);
  } catch (e) {
    return `❌ AI error: ${e.message}`;
  }
}

const commands = [
  {
    name: 'ai',
    aliases: ['gpt', 'gemini', 'chatgpt', 'ask', 'bot'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🤖 *AI MENU*\n\nUsage: `.ai <your question>`\n\nExamples:\n`.ai What is quantum physics?`\n`.gpt Write a poem about night`\n`.gemini Explain recursion`');
      await reply('🤖 _Thinking..._');
      const answer = await askAI(text);
      return reply(`🤖 *AI Response*\n\n${answer}`);
    },
  },
  {
    name: 'imagine',
    aliases: ['imageai', 'generate'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('🎨 Usage: `.imagine <description>`\nExample: `.imagine a gothic castle at night`');
      await reply('🎨 _Generating image..._');
      // Placeholder — integrate your preferred image API
      return reply(`🎨 *Image prompt received:*\n"${text}"\n\n> Configure an image API to enable generation.`);
    },
  },
  {
    name: 'summarize',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📝 Usage: `.summarize <long text>`');
      const answer = await askAI(`Summarize the following in 3 bullet points:\n\n${text}`);
      return reply(`📝 *Summary*\n\n${answer}`);
    },
  },
  {
    name: 'explain',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📚 Usage: `.explain <topic>`');
      const answer = await askAI(`Explain "${text}" in simple terms for a beginner.`);
      return reply(`📚 *Explanation*\n\n${answer}`);
    },
  },
  {
    name: 'code',
    aliases: ['fixcode'],
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('💻 Usage: `.code <description or buggy code>`');
      const answer = await askAI(`Write or fix code for the following request. Return clean code with comments:\n\n${text}`);
      return reply(`💻 *Code*\n\n${answer}`);
    },
  },
  {
    name: 'translate',
    async run(ctx) {
      const { text, reply } = ctx;
      const [lang, ...rest] = text.split(' ');
      const content = rest.join(' ');
      if (!lang || !content) return reply('🌍 Usage: `.translate <language> <text>`\nExample: `.translate Spanish Hello world`');
      const answer = await askAI(`Translate the following text to ${lang}. Return only the translation:\n\n${content}`);
      return reply(`🌍 *Translation (${lang})*\n\n${answer}`);
    },
  },
  {
    name: 'story',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📖 Usage: `.story <theme>`');
      const answer = await askAI(`Write a short, engaging story about: ${text}`);
      return reply(`📖 *Story*\n\n${answer}`);
    },
  },
  {
    name: 'poem',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('✍️ Usage: `.poem <topic>`');
      const answer = await askAI(`Write a beautiful poem about: ${text}`);
      return reply(`✍️ *Poem*\n\n${answer}`);
    },
  },
  {
    name: 'caption',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('📸 Usage: `.caption <image description>`');
      const answer = await askAI(`Write 5 catchy WhatsApp captions for: ${text}. Return as a numbered list.`);
      return reply(`📸 *Captions*\n\n${answer}`);
    },
  },
  {
    name: 'sentiment',
    async run(ctx) {
      const { text, reply } = ctx;
      if (!text) return reply('😊 Usage: `.sentiment <text>`');
      const answer = await askAI(`Analyze the sentiment of this text. Reply with: Positive/Negative/Neutral and a one-line reason.\n\n"${text}"`);
      return reply(`😊 *Sentiment*\n\n${answer}`);
    },
  },
];

module.exports = commands;