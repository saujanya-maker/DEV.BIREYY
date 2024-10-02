const axios = require("axios");
const fs = require("fs-extra");
const path = require("path");

module.exports = {
  config: {
    name: "logo",
    aliases: ["logogen", "genlogo"],
    version: "1.0",
    author: "Itachiffx",
    role: 0,
    shortDescription: { en: "Generate a logo based on a prompt." },
    longDescription: { en: "Uses AI to generate a custom logo based on a prompt provided by the user." },
    category: "fun",
    guide: { en: "{p}logo <prompt>" }
  },

  onStart: async function ({ api, event, args }) {
    try {
      const prompt = args.join(" ");
      if (!prompt) {
        return api.sendMessage(`Please provide a prompt for the logo generation.\nUsage: {p}logo <prompt>`, event.threadID, event.messageID);
      }

      api.setMessageReaction("⌛", event.messageID, null, true); // Show loading reaction

      // Call the AI logo generation API
      const response = await axios.get(`https://dall-e-tau-steel.vercel.app/kshitiz?prompt=logo of ${encodeURIComponent(prompt)}`);
      const logoUrl = response.data.response;

      if (!logoUrl) {
        await api.sendMessage("No logo was generated. Please try a different prompt.", event.threadID, event.messageID);
        return;
      }

      // Download the logo image
      const logoResponse = await axios.get(logoUrl, { responseType: "arraybuffer" });
      const logoPath = path.join(__dirname, "cache", "ai_logo.jpg");
      await fs.outputFile(logoPath, logoResponse.data);
      const logoStream = fs.createReadStream(logoPath);

      // Send the logo to the user
      await api.sendMessage({
        body: `Here is your AI-generated logo for: "${prompt}"`,
        attachment: logoStream
      }, event.threadID, event.messageID);

      // Clean up the file after sending
      await fs.unlink(logoPath);
      api.setMessageReaction("✅", event.messageID, null, true); // Show success reaction
    } catch (error) {
      console.error("Error generating logo:", error);
      await api.sendMessage("Error generating logo. Please try again later.", event.threadID, event.messageID);
    }
  }
};
