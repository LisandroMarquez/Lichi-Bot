const { loadCommands } = require("../../handlers/commandHandler");
const config = require("../../config/config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Cargar comandos
    loadCommands(client);

    // MongoDB connect
    await mongoose.connect(config.mongopass, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log("MongoDB connected ✅\n🔰 Client ready to operate 🔰");
    }
  },
};
