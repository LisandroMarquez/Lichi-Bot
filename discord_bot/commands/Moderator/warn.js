const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");
const warning = require("../../schemas/warningModel");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("warn")
    .setDescription("Advertir a un usuario")
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Usuario a echar")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("razon").setDescription("Razón del warn").setRequired(true)
    )
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction, client) {
    const user = interaction.options.getUser("usuario");
    const { guild } = interaction;

    // Si algo falla aparece en la consola
    let razon = interaction.options.getString("razon");
    const member = await interaction.guild.members
      .fetch(user.id)
      .catch(console.error);

    // Exceptions
    // Echarse a si mismo
    if (user.id === interaction.user.id)
      return interaction.reply({
        content: "No puedes dar warn a ti mismo",
        ephemeral: true,
      });
    // Echar al bot
    if (user.id === client.user.id)
      return interaction.reply({
        content: "No puedes darme warn >:D",
        ephemeral: true,
      });
    // Echar gente debajo tuyo solamente
    if (
      member.roles.highest.position >= interaction.member.roles.highest.position
    )
      return interaction.reply({
        content: `No puedes dar warn a alguien con un rol superior o igual al tuyo`,
        ephemeral: true,
      });
    // Echar gente debajo del bot solamente
    if (!member.kickable)
      return interaction.reply({
        content: "No puedo dar warn a alguien con un rol superior al mío",
        ephemeral: true,
      });

    // Warning counter
    var flag = false;
    let data = await warning.findOne({
      UserID: user.id,
    });

    if (data) {
      if (data.Counter == 1) {
        await data.deleteOne({ UserID: data.UserID });
        let newData = new warning({
          UserID: user.id,
          Counter: 2,
        });
        await newData.save();
        data = newData;
      } else if (data.Counter == 2) {
        await data.deleteOne({ UserID: data.UserID });
        let newData = new warning({
          UserID: user.id,
          Counter: 3,
        });
        await newData.save();
        data = newData;
        flag = true;
      }
    } else if (!data) {
      let newData = new warning({
        UserID: user.id,
        Counter: 1,
      });
      await newData.save();
      data = newData;
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
      .setTitle(`El usuario ${user.tag} recibió una **advertencia**`)
      // Color del costado
      .setColor("Orange")
      // Mostrar fecha
      .setTimestamp()
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Campos extras
      .addFields(
        {
          name: "Advertido por",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: `Motivo`,
          value: `${razon}`,
          inline: true,
        },
        {
          name: `Advertencias`,
          value: `${data.Counter}`,
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
      .setTitle(`Has recibido una **advertencia**`)
      // Color del costado
      .setColor("Orange")
      // Mostrar fecha
      .setTimestamp()
      // Campos extras
      .addFields(
        {
          name: "Advertido por",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: `Motivo`,
          value: `${razon}`,
          inline: true,
        }
      )
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // Crear mensaje
    const banEmbed = new EmbedBuilder()
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
      // Descripción
      .setDescription("Razón del Ban: Acumulación de advertencias")
      // Color del costado
      .setColor("Red")
      // Mostrar fecha
      .setTimestamp()
      // Mostrar la pf
      .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
      // Campos extras
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // DM Embed
    const dmBanEmbed = new EmbedBuilder()
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
      .setTitle(`Has sido **Baneado** del servidor`)
      // Color del costado
      .setColor("Red")
      // Campos extras
      .addFields(
        {
          name: "Baneado por",
          value: `<@${interaction.user.id}>`,
          inline: true,
        },
        {
          name: `Motivo`,
          value: `Acumulación de Advertencias [3]`,
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

    // If 3 warns, ban
    if (flag) {
      await member.send({ embeds: [dmEmbed, dmBanEmbed] }).catch(console.error);
      await member
        .ban({ deleteMessageSeconds: 0, reason: razon })
        .catch(console.error);
      interaction.reply({ embeds: [embed, banEmbed] });
      await data.deleteOne({ UserID: data.UserID });
    } else {
      await member.send({ embeds: [dmEmbed] }).catch(console.error);
      interaction.reply({ embeds: [embed] });
    }
  },
};
