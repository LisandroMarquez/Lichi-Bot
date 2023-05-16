const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  Client,
} = require("discord.js");
const { loadCommands } = require("../../handlers/commandHandler");
const { loadEvents } = require("../../handlers/eventHandler");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("reload")
    .setDescription("Recarga tus comandos o eventos [Dev Only]")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addSubcommand((options) =>
      options.setName("events").setDescription("Recarga los eventos")
    )
    .addSubcommand((options) =>
      options.setName("commands").setDescription("Recarga los comandos")
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */

  execute(interaction, client) {
    const subCommand = interaction.options.getSubcommand();

    switch (subCommand) {
      case "events": {
        // Desaturador de cache
        for (const [key, value] of client.events)
          client.removeListener(`${key}`, value, true);
        loadEvents(client);
        interaction.reply({
          content: "Los eventos han sido recargados con éxito",
          ephemeral: true,
        });
      }
      case "commands": {
        loadCommands(client);
        interaction.reply({
            content: "Los comandos han sido recargados con éxito",
            ephemeral: true,
        });
      }
    }
  },
};
