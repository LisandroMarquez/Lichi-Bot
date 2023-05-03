const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sugerencia")
    .setDescription("Sugiere algo al servidor")
    .addStringOption((option) =>
      option
        .setName("sugerencia")
        .setDescription("Sugerencia para el servidor")
        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   **/
  async execute(interaction) {
    const { options } = interaction;
    const canal = interaction.guild.channels.cache.get("1100792708068544562"); //ID channel to suggest
    const description = options.getString("sugerencia");
    const user = interaction.user;
    const { guild } = interaction;

    // Crear embed
    const embed = new EmbedBuilder()
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
      .setTitle(`Nueva sugerencia!`)
      .setDescription(`${description}`)
      .setColor("Purple")
      .addFields(
        {
            name: `Usuario que sugirió:`,
            value: `<@${user.id}>`,
          },
        )
      .setTimestamp()
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    const mensaje = await canal.send({
      embeds: [embed],
      fetchReply: true,
    });
    // Reacciones
    await mensaje.react("👍🏼");
    await mensaje.react("👎🏼");
    // Respuesta que la sugerencia fue creada con éxito
    await interaction.reply({
      content:
        "Su sugerencia fue enviada con exito al canal correspondiente :D",
      ephemeral: true,
    });
  },
};
