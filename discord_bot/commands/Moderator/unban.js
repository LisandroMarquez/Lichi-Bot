const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
process.noDeprecation = true;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unban")
    .setDescription("Desbanear a un usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario a desbanear")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser("usuario");
    const { guild } = interaction;

    // Echarse definitivamente a si mismo
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes desbanearte a ti mismo",
        ephemeral: true,
      });
    // Echar definitivamente al bot
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes desbanearme ._.",
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
      .setTitle(`El usuario ${user.tag} ha sido desbaneado del servidor`)
      // Color del costado
      .setColor("DarkGreen")
      // Mostrar fecha
      .setTimestamp()
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Campos extras
      .addFields({
        name: "🔄 Desbaneado por",
        value: `<@${interaction.user.id}>`,
        inline: true,
      })
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // DM Embed
    const dmEmbed = new EmbedBuilder()
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
      .setTitle(`Has sido **desbaneado**`)
      // Color del costado
      .setColor("DarkGreen")
      // Campos extras
      .addFields({
        name: "🔄 Desbaneado por",
        value: `<@${interaction.user.id}>`,
        inline: true,
      })
      // Mostrar fecha
      .setTimestamp()
      // Campos extras
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    await user.send({ embeds: [dmEmbed] }).catch(console.error);
    await guild.members.unban(user).catch(console.error);
    interaction.reply({ embeds: [embed] });
  },
};
