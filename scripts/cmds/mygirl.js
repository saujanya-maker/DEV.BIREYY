const axios = require("axios");

module.exports = {
  config: {
    name: "mygirl",
    aliases: ["mgirl", "myg"],
    version: "1.1",
    author: "DEV.BIRENDRA",
    role: 0,
    shortDescription: { en: "Get a random video from a specific TikTok user." },
    longDescription: { en: "Fetch a random video from TikTok user theycallme_alishaa." },
    category: "fun",
    guide: { en: "Use {p}mygirl to get a random video from the TikTok user." }
  },
  onStart: async function ({ api, event }) {
    const adminUIDs = ['100041487833040'];

    if (!adminUIDs.includes(event.senderID)) {
      return api.sendMessage("You're not admin, bro.", event.threadID, event.messageID);
    }

    try {
      await api.setMessageReaction("⌛", event.messageID, null, true);

      const url = `https://gandu-mhjz.onrender.com/anmol?username=theycallme_alishaa`;
      const response = await axios.get(url);
      const videoUrls = response.data.posts;

      if (!Array.isArray(videoUrls) || videoUrls.length === 0) {
        await api.sendMessage(`No video URLs found for the TikTok username: theycallme_alishaa`, event.threadID, event.messageID);
        return;
      }

      const timeFactor = new Date().getSeconds();
      const randomIndex = (Math.floor(Math.random() * videoUrls.length) + timeFactor) % videoUrls.length;
      const selectedVideoUrl = videoUrls[randomIndex];

      const videoResponse = await axios({
        url: selectedVideoUrl,
        method: 'GET',
        responseType: 'stream'
      });

      await api.sendMessage({
        body: `Here is a random video from TikTok user: theycallme_alishaa\nPowered by DEV.BIRENDRA`,
        attachment: videoResponse.data
      }, event.threadID, event.messageID);

      await api.setMessageReaction("✅", event.messageID, null, true);

    } catch (error) {
      await api.sendMessage(`An error occurred while fetching the video: ${error.message}`, event.threadID, event.messageID);
    }
  }
};
