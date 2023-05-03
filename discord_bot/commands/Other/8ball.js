const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
module.exports = {
  data: new SlashCommandBuilder()
    .setName("8ball")
    .setDescription("Brinda una respuesta random a tu pregunta")
    .addStringOption((option) =>
      option
        .setName("pregunta")
        .setDescription("Pregunta a responder")
        .setRequired(true)
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { options } = interaction;
    const { guild } = interaction;
    const user = interaction.user;
    const pregunta = options.getString("pregunta");
    let respuestas = ['Si', 'No', 'Probablemente si', 'Probablemente no', 'Quizás', 'Puede ser']
    const answer = Math.floor(Math.random() * respuestas.length);

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
      .setTitle(`👤 **Pregunta de:** ${user.username}`)
      .addFields(
        {
          name: `🎱 Pregunta:`,
          value: pregunta,
        },
        {
          name: `🧾 Respuesta:`,
          value: respuestas[answer],
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
