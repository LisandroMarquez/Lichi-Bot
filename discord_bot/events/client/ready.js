const { loadCommands } = require("../../handlers/commandHandler");
const config = require("../../config.json");
const mongoose = require("mongoose");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Cargar comandos
    loadCommands(client);

    // Cliente completamente inicializado
    console.log("El cliente está listo");

    // MongoDB connect
    await mongoose.connect(config.mongopass, {
      keepAlive: true,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    if (mongoose.connect) {
      console.log("MongoDB conectado")
    }
  },
};
