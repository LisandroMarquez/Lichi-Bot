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
    
    if (command.developer && interaction.user.id !== '688114194427543563') {
      return interaction.reply({
        content: "This is a developer only command",
        ephermal: true,
      });
    }

    // Command execute
    command.execute(interaction, client);
  },
};
