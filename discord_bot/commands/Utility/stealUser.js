const { SlashCommandBuilder } = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("imitar")
    .setDescription('Envía un mensaje "simulando" ser alguien más')
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Usuario que desea imitar")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("message")
        .setDescription("Mensaje que desea decir")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options } = interaction;
    const member = options.getUser("user");
    const message = options.getString("message");
    interaction.channel
      .createWebhook({
        name: member.username,
        avatar: member.displayAvatarURL({ dynamic: true }),
      })
      .then((webhook) => {
        webhook.send({ content: message });
      });
    interaction.reply({
      content: "El mensaje ha sido creado con éxito :D",
      ephemeral: true,
      tts: true,
    });
  },
};
