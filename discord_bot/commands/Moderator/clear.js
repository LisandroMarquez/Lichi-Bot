const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Eliminar los mensajes del canal en el que te encuentras")
    .addIntegerOption((option) =>
      option
        .setName("cantidad")
        .setDescription("Cantidad de mensajes (min: 1, max: 100)")
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(100)
    )
    .addUserOption((option) =>
      option
        .setName("usuario")
        .setDescription("Mensajes de un usuario en específico")
        .setRequired(false)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */

  async execute(interaction) {
    const { guild } = interaction;
    const cantidad = interaction.options.getInteger("cantidad");
    const user = interaction.options.getUser("usuario");
    const mensajes = await interaction.channel.messages.fetch();

    if (user) {
      let i = 0;
      let mensajesEliminar = [];
      (await mensajes).filter((message) => {
        if (message.author.id === user.id && cantidad > i) {
          mensajesEliminar.push(message);
          i++;
        }
      });

      if ((mensajes = 0))
        interaction.reply({
          content: `No hay mensajes para eliminar de ${user.tag}`,
          ephemeral: true,
        });

      // Crear mensaje
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
        // Titulo del mensaje
        .setTitle(`Se han eliminado mensajes`)
        // Descripcion
        .setDescription(
          `🧹 Se eliminaron ${mensajesEliminar.length} mensajes de ${user.tag}`
        )
        // Color del costado
        .setColor("Red")
        // Mostrar fecha
        .setTimestamp()
        // Mostrar la pf
        .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
        // Footer
        .setFooter({
          text: "Estallados Support",
          iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
        });

      await interaction.channel.bulkDelete(mensajesEliminar, true);
      interaction.reply({
        embeds: [Embed],
      });
    } else {
      if ((mensajes == 0))
        interaction.reply({
          content: `No hay mensajes para eliminar`,
          ephemeral: true,
        });
      // Crear mensaje
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
        // Titulo del mensaje
        .setTitle(`Se han eliminado mensajes`)
        // Descripcion
        .setDescription(`🧹 Se eliminaron ${cantidad} mensajes`)
        // Color del costado
        .setColor("Red")
        // Mostrar fecha
        .setTimestamp()
        // Footer
        .setFooter({
          text: "Estallados Support",
          iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
        });

      await interaction.channel.bulkDelete(cantidad, true);
      interaction.reply({
        embeds: [Embed],
      });
    }
  },
};
