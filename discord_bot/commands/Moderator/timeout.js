const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Dar timeout a un usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario a dar timeout")
        .setRequired(true)
    )
    .addIntegerOption((option) =>
      option
        .setName("tiempo")
        .setDescription("Tiempo del timeout en minutos")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("razon").setDescription("Razón del timeout")
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser("usuario");
    const tiempo = interaction.options.getInteger("tiempo");
    const { guild } = interaction;

    // Si algo falla aparece en la consola
    let razon = interaction.options.getString("razon");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    // Exceptions
    // Sin razón
    if (!razon) razon = "No se adjuntó motivo";
    // Echarse a si mismo
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes dar timeout a ti mismo",
        ephemeral: true,
      });
    // Echar al bot
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes darme timeout >:D",
        ephemeral: true,
      });
    // Echar gente debajo tuyo solamente
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `No puedes dar timeout a alguien con un rol superior o igual al tuyo`,
        ephemeral: true,
      });
    // Echar gente debajo del bot solamente
    if (!member.kickable)
      return interaction.reply({
        content: "No puedo dar timeout a alguien con un rol superior al mío",
        ephemeral: true,
      });
    // Tiempo demasiado extenso
    if (tiempo >= 4321)
      return interaction.reply({
        content: "Tiempo de timeout demasiado largo [Máx: 4320 mins (3 días)]",
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
      .setTitle(`El usuario ${user.tag} se le dió un timeout del servidor`)
      // Color del costado
      .setColor("Red")
      // Mostrar fecha
      .setTimestamp()
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Campos extras
      .addFields(
        {
          name: "Timeout por",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: `Motivo`,
          value: `${razon}`,
          inline: true,
        },
        {
          name: "Tiempo",
          value: `${tiempo} minutos`,
          inline: true,
        }
      )
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
      .setTitle(`Has recibido **timeout** del servidor`)
      // Color del costado
      .setColor("Red")
      // Campos extras
      .addFields(
        {
          name: "Timeout por",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: `Motivo`,
          value: `${razon}`,
          inline: true,
        },
        {
          name: "Tiempo",
          value: `${tiempo} minutos`,
          inline: true,
        }
      )
      // Mostrar fecha
      .setTimestamp()
      // Campos extras
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // DM message send
    await member.send({ embeds: [dmEmbed] });
    // En caso de generarse mal, en consola explica el error
    await member.timeout(tiempo * 60 * 1000, razon).catch(console.error);
    // Return
    interaction.reply({ embeds: [embed] });
  },
};
