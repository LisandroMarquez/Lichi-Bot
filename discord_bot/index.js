// Require the necessary discord.js classes
const { Client, Collection, Partials, ActivityType } = require(`discord.js`);
const { User, Message, GuildMember, ThreadMember } = Partials;

// Create a new client instance
const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
});

// Event loader
const { loadEvents } = require(`./handlers/eventHandler`);

// Config stuff
client.config = require("./config/config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

// AntiCrash System
require(`./handlers/antiCrash`)(client);

// Set bot activity
client.on("ready", () => {
  client.user.setPresence({
    activities: [
      {
        name: "Programming myself! | GitHub: https://github.com/LisandroMarquez/Lichi-Bot",
        type: ActivityType.Playing,
      },
    ],
  });
});

// Log in to Discord with your client's token
client.login(client.config.token);
