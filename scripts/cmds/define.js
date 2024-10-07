const axios = require('axios');

module.exports = {
  config: {
    name: "define",
    aliases: ["def", "definition"],
    version: "1.0",
    author: "Birendra Joshi",
    role: 0,
    shortDescription: { en: "Get the definition of a word." },
    longDescription: { en: "Fetch the definition of a word from an online dictionary API." },
    category: "utility",
    guide: { en: "Use {p}define [word] to get the definition of a word." }
  },
  onStart: async function ({ api, event, args }) {
    // Check if 'args' exists and has a value (word to define)
    if (!args || args.length === 0) {
      return api.sendMessage("Please provide a word to define. Example: /define love", event.threadID, event.messageID);
    }

    // Join the 'args' to form the word
    const word = args.join(" ");

    // Dictionary API URL (Free Dictionary API used here, no API key required)
    const API_URL = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
      // React to the message with a waiting symbol
      await api.setMessageReaction("⌛", event.messageID, null, true);

      // Fetch the definition from the API
      const response = await axios.get(API_URL);

      // Check if the response contains valid data
      if (response.data && response.data.length > 0 && response.data[0].meanings && response.data[0].meanings[0].definitions) {
        const definition = response.data[0].meanings[0].definitions[0].definition;

        // Send the definition as a message
        await api.sendMessage({
          body: `Definition of *${word}*:\n\n"${definition}"\n\nPowered by Dev.Birendra`
        }, event.threadID, event.messageID);

        // React with a success symbol
        await api.setMessageReaction("✅", event.messageID, null, true);

      } else {
        // If the API doesn't return a valid definition
        throw new Error("No definition found.");
      }

    } catch (error) {
      // Handle any errors that may occur and inform the user
      await api.sendMessage(`An error occurred: ${error.message}`, event.threadID, event.messageID);

      // React with an error symbol
      await api.setMessageReaction("❌", event.messageID, null, true);
    }
  }
};
