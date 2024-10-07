const axios = require('axios');

const UPoLPrefix = ['ai']; // Prefix for triggering the bot command

const axiosInstance = axios.create();

module.exports = {
  config: {
    name: 'ai',
    version: '1.2.1',
    role: 0,
    category: 'AI',
    author: 'DEV.BIRENDRA', // Changed author name
    // API Author changed to DEV.BIRENDRA
    shortDescription: 'AI-powered response bot',
    longDescription: 'This bot interacts with an AI API to provide intelligent responses based on user queries.',
  },

  onStart: async function () {
    console.log('AI bot started.');
  },

  onChat: async function ({ message, event, args, api, threadID, messageID }) {
    // Check if the message starts with the AI prefix
    const ahprefix = UPoLPrefix.find((p) => event.body && event.body.toLowerCase().startsWith(p));
    if (!ahprefix) {
      return;
    }

    const query = event.body.substring(ahprefix.length).trim(); // Extract the query
    if (!query) {
      await message.reply('Greetings! How may I assist you today?'); // Formal greeting
      return;
    }

    const greetingOptions = [
      'Please enter your query (q)*',
      'How may I assist you today?',
      'I kindly request your query.',
      'How can I be of assistance to you?'
    ];
    const randomGreeting = greetingOptions[Math.floor(Math.random() * greetingOptions.length)];

    // Check for a simple 'hi' command
    if (args[0] === 'hi') {
      await message.reply(`${randomGreeting}`); // Formal response for greeting
      return;
    }

    // Prepare the query to send to the AI API
    const encodedPrompt = encodeURIComponent(args.join(' '));

    try {
      // Send the query to the AI API and await the response
      const response = await axiosInstance.get(`https://priyansh-ai.onrender.com/gemini/ai?query=${encodedPrompt}`);
      const aiResponse = response.data;

      // Reply with the AI's response
      await message.reply(`Here is the information you requested: ${aiResponse}`); // Formal response
    } catch (error) {
      // Error handling if the API request fails
      console.error('Error fetching AI response:', error);
      await message.reply('I apologize for the inconvenience, but an error occurred while processing your request. Please try again later.'); // Formal error message
    }
  }
};
