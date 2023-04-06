// Require the necessary discord.js classes
const {
  Client,
  Collection,
  GatewayIntentBits,
  Partials,
  Status,
} = require(`discord.js`);
const { Guilds, GuildMembers, GuildMessages } = GatewayIntentBits;
const { User, Message, GuildMember, ThreadMember } = Partials;

// Create a new client instance
const client = new Client({
  intents: 3276799,
  partials: [User, Message, GuildMember, ThreadMember],
});

// Event loader
const { loadEvents } = require(`./handlers/eventHandler`);

// Config stuff
client.config = require("./config.json");
client.events = new Collection();
client.commands = new Collection();

loadEvents(client);

// Set bot activity
client.on('ready', () => {
  client.user.setActivity('Programing myself!')
})

// Log in to Discord with your client's token
client.login(client.config.token);
