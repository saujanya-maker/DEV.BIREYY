/cmd install tikuserfinder.js const axios = require("axios");

module.exports = {
  config: {
    name: "tiktokvideos",
    aliases: ["tiktok", "ttvids"],
    version: "1.1",
    author: "Anmol Sensei",
    role: 0,
    shortDescription: { en: "Get a random video from a specified TikTok user." },
    longDescription: { en: "Fetch a random video from the TikTok user's video list." },
    category: "fun",
    guide: { en: "Use {p}tiktokvideos <username> to get a random video from the specified TikTok user." }
  },
  onStart: async function ({ api, event, args }) {
    try {
      const username = args[0];
      if (!username) {
        await api.sendMessage(`Please provide a TikTok username.\nUsage: {p}tiktokvideos <username>`, event.threadID, event.messageID);
        return;
      }

      await api.setMessageReaction("⌛", event.messageID, null, true);

      const url = `https://teaching-i32v.onrender.com/kshitiz?username=${username}`;
      const response = await axios.get(url);
      const videoUrls = response.data.posts;

      if (!Array.isArray(videoUrls) || videoUrls.length === 0) {
        await api.sendMessage(`No video URLs found for the TikTok username: ${username}`, event.threadID, event.messageID);
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
        body: `Here is a random video from TikTok user: ${username}\nPowered by Anmol`,
        attachment: videoResponse.data
      }, event.threadID, event.messageID);

      await api.setMessageReaction("✅", event.messageID, null, true);

    } catch (error) {
      await api.sendMessage(`An error occurred while fetching the video: ${error.message}\nDetails: ${error.response ? error.response.data : 'No further details available.'}`, event.threadID, event.messageID);
    }
  }
};
