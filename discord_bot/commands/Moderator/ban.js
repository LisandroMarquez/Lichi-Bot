const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
  TimestampStyles,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Banear a un usuario determinado")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Usuario a banear")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("razon").setDescription("Razón del baneo")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser("target");
    const { guild } = interaction;

    // Si algo falla aparece en la consola
    let razon = interaction.options.getString("razon");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    // Exceptions
    // Sin razón
    if (!razon) razon = "No se adjuntó motivo";

    // Echarse definitivamente a si mismo
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes banearte a ti mismo",
        ephemeral: true,
      });

    // Echar definitivamente al bot
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes banearme >:D",
        ephemeral: true,
      });

    // Echar definitivamente gente debajo tuyo solamente
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `No puedes banear a alguien con un rol superior o igual al tuyo`,
        ephemeral: true,
      });

    // Echar definitivamente gente debajo del bot solamente
    if (!member.kickable)
      return interaction.reply({
        content: "No puedo banear a alguien con un rol superior al mío",
        ephemeral: true,
      });

    // Crear mensaje
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

      // Titulo del mensaje
      .setTitle(`El usuario ${user.tag} fue baneado del servidor`)

      // Color del costado
      .setColor("Red")

      // Mostrar fecha
      .setTimestamp()

      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)

      // Campos extras
      .addFields(
        { name: `Motivo`, value: `${razon}`, inline: true },
        { name: "Baneado por", value: `${interaction.user.tag}`, inline: true }
      )

      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    await member
      .ban({ deleteMessageSeconds: 0, reason: razon })
      .catch(console.error);

    interaction.reply({ embeds: [embed] });
  },
};
