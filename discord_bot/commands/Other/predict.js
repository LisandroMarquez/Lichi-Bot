const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("prediccion")
    .setDescription("Arroja un porcentaje random a tu predicción")
    .addStringOption((option) =>
      option
        .setName("mensaje")
        .setDescription("Mensaje que desea predecir")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options } = interaction;
    const { guild } = interaction;
    const prediccion = options.getString("mensaje");
    const random = Math.floor(Math.random() * 99) + 1;
    const user = interaction.user;

    const Embed = new EmbedBuilder()
      // Info del servidor
      .setAuthor({
        // Mostrar nombre
        name: `${guild.name}`,
        // Mostrar imagen(imagen random si no posee una)
        iconURL: `${
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/849093461914157078/1066883078544429066/Da_Rules.jpg"
        }`,
        url: "https://discord.gg/zS5GAyWsh3",
      })
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Titulo del mensaje
      .setTitle(`👤 **Predicción de:** ${user.username}`)
      .addFields(
        {
          name: `☄️ Predicción:`,
          value: prediccion,
        },
        {
          name: `#️⃣ Probabilidad de cumplirse:`,
          value: `${random}%`,
        }
      )
      .setColor("White")
      // Hora actual
      .setTimestamp()
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    interaction.reply({
      embeds: [Embed],
    });
  },
};
