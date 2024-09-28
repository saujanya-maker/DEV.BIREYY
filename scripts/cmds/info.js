const axios = require('axios');
const fs = require('fs');
const path = require('path');

module.exports = {
  config: {
    name: "owner",
    aliases: [],
    author: "Anmol",
    version: "2.0",
    cooldowns: 5,
    role: 0,
    shortDescription: {
      en: ""
    },
    longDescription: {
      en: "get bot owner info"
    },
    category: "𝗢𝗪𝗡𝗘𝗥",
    guide: {
      en: "{p}{n}"
    }
  },
  onStart: async function ({ api, event }) {
      try {
        const loadingMessage = "Loading owner information...";
        await api.sendMessage(loadingMessage, event.threadID);

const ownerInfo = {
𝗻𝗮𝗺𝗲: 'ITACHI SENSEI ',
𝗴𝗲𝗻𝗱𝗲𝗿: 'MALE',
𝗵𝗼𝗯𝗯𝘆: 'BOT DEVELOPER ',
𝗿𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: '99+',
𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸𝗹𝗶𝗻𝗸: '',
𝗯𝗶𝗼: 'SACRIFICES FOR THE FRIENDS '
        };

        const videoUrl = 'https://raw.githubusercontent.com/zoro-77/video-hosting/main/cache/video-1727514510589-372.mp4';
        const tmpFolderPath = path.join(__dirname, 'tmp');

        if (!fs.existsSync(tmpFolderPath)) {
          fs.mkdirSync(tmpFolderPath);
        }

        const videoResponse = await axios.get(videoUrl, { responseType: 'arraybuffer' });
        const videoPath = path.join(tmpFolderPath, 'owner_video.mp4');

        fs.writeFileSync(videoPath, Buffer.from(videoResponse.data, 'binary'));

const response = `
𝗼𝘄𝗻𝗲𝗿 𝗶𝗻𝗳𝗼𝗿𝗺𝗮𝘁𝗶𝗼𝗻:
𝗻𝗮𝗺𝗲: ${ownerInfo.𝗻𝗮𝗺𝗲}
𝗴𝗲𝗻𝗱𝗲𝗿: ${ownerInfo.𝗴𝗲𝗻𝗱𝗲𝗿}
𝗵𝗼𝗯𝗯𝘆: ${ownerInfo.𝗵𝗼𝗯𝗯𝘆}
𝗿𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽: ${ownerInfo.𝗿𝗲𝗹𝗮𝘁𝗶𝗼𝗻𝘀𝗵𝗶𝗽}
𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸: ${ownerInfo.𝗙𝗮𝗰𝗲𝗯𝗼𝗼𝗸𝗹𝗶𝗻𝗸}
𝘀𝘁𝗮𝘁𝘂𝘀: ${ownerInfo.𝗯𝗶𝗼}
        `;

        await api.sendMessage({
          body: response,
          attachment: fs.createReadStream(videoPath)
        }, event.threadID);
      } catch (error) {
        console.error('Error in owner command:', error);
        api.sendMessage('An error occurred while processing the command.', event.threadID);
      }
    },
    onChat: async function({ api, event }) {
      try {
        const lowerCaseBody = event.body.toLowerCase();

        if (lowerCaseBody === "info" || lowerCaseBody.startsWith("{p}owner")) {
          await this.onStart({ api, event });
        }
      } catch (error) {
        console.error('Error in onChat function:', error);
      }
    }
  };
