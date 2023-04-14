const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Proporciona información sobre el usuario seleccionado")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Usuario que desea saber la información")
    ),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser("user") || interaction.user;
    const miembro = await interaction.guild.members.fetch(user.id);

    // Rol más importante del user
    let highest_role = miembro.roles.highest;
    if (miembro.user.bot)
      return (
        await interaction.channel.sendTyping(),
        await interaction.reply({
          content: "Los bots no están disponibles con esta función",
          ephemeral: true,
        })
      );

    // Crear mensaje
    const banner = await (
      await client.users.fetch(user.id, { force: true })
    ).bannerURL({ size: 4096, dynamic: true });
    const embed = new EmbedBuilder()
      // Ponerle color al lateral
      .setColor("Gold")
      // Avatar display
      .setAuthor({
        name: `${user.username}`,
        iconURL: `${user.displayAvatarURL({ dynamic: true })}`,
      })
      // Titulo del mensaje
      .setTitle(`Información del usuario ${user.username}`)
      // Campos extras
      .addFields(
        {
          name: `Info general`,
          value: [`**Tag: ** ${user.tag}`, `**ID: ** ||${user.id}||`].join(
            "\n"
          ),
        },
        {
          name: `Cuenta creada`,
          value: `<t:${parseInt(user.createdTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Se unió al servidor`,
          value: `<t:${parseInt(miembro.joinedTimestamp / 1000)}:R>`,
          inline: true,
        },
        {
          name: `Rol Principal`,
          value: `${highest_role}`,
          inline: true,
        },
        {
          name: `Banner del usuario`,
          value: banner ? " " : "Este usuario no posee banner",
        }
      )
      // Mostrar fecha
      .setImage(banner)
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Hora actual
      .setTimestamp()
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // Return
    await interaction.reply({ embeds: [embed] });
  },
};
