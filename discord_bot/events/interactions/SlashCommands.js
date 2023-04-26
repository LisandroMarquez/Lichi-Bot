const { ChatInputCommandInteraction } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  execute(interaction, client) {
    if (!interaction.isChatInputCommand()) return;
    const command = client.commands.get(interaction.commandName);
    // If command doen not exist anymore
    if (!command)
      return interaction.reply({
        content: "This command is outdated",
        ephermal: true,
      });

    // Command execute
    command.execute(interaction, client);
  },
};
