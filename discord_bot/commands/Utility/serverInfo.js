const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Proporciona información sobre el servidor"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { guild } = interaction;

    const { createdTimestamp, ownerId, members } = guild;

    // Cantidad bot
    const botCount = members.cache.filter((member) => member.user.bot).size;

    // Build embed
    const embed = new EmbedBuilder()
      .setTitle(`Información del servidor: "${guild.name}"`)
      .setColor("Blurple")
      .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/849093461914157078/1066883078544429066/Da_Rules.jpg"
        }`,
        url: "https://discord.gg/zS5GAyWsh3",
      })
      .addFields(
        {
          name: "ℹ️ General Info ℹ️",
          value: [
            `👑 Dueño: <@${ownerId}>`,
            `⏰ Creado: <t:${parseInt(createdTimestamp / 1000)}:R>`,
            `🔗 ID Servidor: ||${guild.id}||`,
          ].join("\n"),
        },
        {
          name: "👨‍👨‍👦‍👦 Miembros 👨‍👨‍👦‍👦",
          value: [
            `👥 Usuarios: ${guild.memberCount - botCount}`,
            `🤖 Bots: ${botCount}`,
          ].join("\n"),
          inline: true,
        },
        {
          name: "🌀 Mejoras 🌀",
          value: [
            `⏫ Mejoras: ${guild.premiumSubscriptionCount}`,
            `❇️ Nivel: ${guild.premiumTier}`,
          ].join("\n"),
          inline: true,
        },
        {
          name: "Banner del Servidor",
          value: guild.bannerURL({ dynamic: true })
            ? "** **"
            : "El servidor no posee banner :(",
        }
      )
      .setTimestamp()
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });
    // Return
    await interaction.reply({ embeds: [embed] });
  },
};
