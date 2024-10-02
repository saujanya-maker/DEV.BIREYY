const axios = require('axios');

module.exports = {
  config: {
    name: "quote",
    aliases: ["quotes", "inspire"],
    version: "1.0",
    author: "Itachiffx",
    role: 0,
    shortDescription: { en: "Get random inspirational quotes." },
    longDescription: { en: "Fetch a random inspirational quote from an online API." },
    category: "fun",
    guide: { en: "Use {p}quote to get a random quote." }
  },

  onStart: async function ({ api, event }) {
    try {
      // Fetch a random quote from another API (ZenQuotes)
      const response = await axios.get('https://zenquotes.io/api/random');
      const { q: content, a: author } = response.data[0];

      // Send the quote to the chat
      await api.sendMessage(`"${content}"\n- ${author}`, event.threadID, event.messageID);
    } catch (error) {
      console.error(error.message);
      await api.sendMessage("Sorry, I couldn't fetch a quote at the moment. Please try again later.", event.threadID, event.messageID);
    }
  }
};
