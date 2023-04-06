const { loadCommands } = require("../../handlers/commandHandler");

module.exports = {
  name: "ready",
  once: true,
  execute(client) {
    // Cargar comandos
    loadCommands(client);

    // Cliente completamente inicializado
    console.log("El cliente está listo");
  },
};
