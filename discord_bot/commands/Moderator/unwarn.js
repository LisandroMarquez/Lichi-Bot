const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const warning = require("../../schemas/warningModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("unwarn")
    .setDescription("Quitar una advertencia a un usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario a quitar advertencia")
        .setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser("usuario");
    const { guild } = interaction;
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    // Exceptions
    // Echarse a si mismo
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes quitarte warns a ti mismo",
        ephemeral: true,
      });
    // Echar al bot
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes darme ni quitarme warn >:D",
        ephemeral: true,
      });

    // Warning counter
    let data = await warning.findOne({
      UserID: user.id,
    });
    var warns;
    var flag = new Boolean(true);
    if (!data) {
      interaction.reply({
        content: `El usuario ${user.tag} no posee advertencias`,
        ephemeral: true,
      });
      flag = false;
    } else {
      if (data.Counter == 1) {
        await data.deleteOne({ UserID: data.UserID });
        warns = 0;
      } else if (data.Counter == 2) {
        await data.deleteOne({ UserID: data.UserID });
        let newData = new warning({
          UserID: user.id,
          Counter: 1,
        });
        await newData.save();
        data = newData;
        warns = data.Counter;
      }
    }

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
      .setTitle(`El usuario ${user.tag} se le ha removido una **advertencia**`)
      // Color del costado
      .setColor("Yellow")
      // Mostrar fecha
      .setTimestamp()
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Campos extras
      .addFields(
        {
          name: "♻️ Advertencia removida por",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: `🧮 Advertencias`,
          value: `${warns}`,
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
      .setTitle(`Se te ha removido una **advertencia**`)
      // Descripción
      .setDescription(`🧮 Ahora posees ${warns}`)
      // Color del costado
      .setColor("Yellow")
      // Mostrar fecha
      .setTimestamp()
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    if (flag) {
      await member.send({ embeds: [dmEmbed] }).catch(console.error);
      interaction.reply({ embeds: [embed] });
    }
  },
};
