const { loadCommands } = require("../../handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    // Cargar comandos
    loadCommands(client);
    console.log("READY TO USE!!");
  },
};
