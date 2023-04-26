const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("help")
    .setDescription("Lista de comandos del bot"),
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    // Creación botón
    const buttons = new ActionRowBuilder().addComponents(
      // Botón 1
      new ButtonBuilder()
        .setCustomId("menu")
        .setLabel("Menú")
        .setStyle(ButtonStyle.Success),
      // Botón 2
      new ButtonBuilder()
        .setCustomId("utility")
        .setLabel("Utilidad")
        .setStyle(ButtonStyle.Primary),
      // Botón 3
      new ButtonBuilder()
        .setCustomId("mod")
        .setLabel("Moderación")
        .setStyle(ButtonStyle.Secondary),
      // Botón 4
      new ButtonBuilder()
        .setCustomId("delete")
        .setLabel("Cerrar")
        .setStyle(ButtonStyle.Danger)
    );

    // Embeds
    // Menu
    const embed_menu = new EmbedBuilder()
      .setTitle("Menu Inicial")
      .setColor("Purple")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/4771/4771275.png")
      .setDescription(
        'Selecciona el apartado del cual deseas información o utiliza el botón "Cerrar" para eliminar este mensaje'
      )
      .addFields(
        {
          name: "Utilidad",
          value: "Comandos que puede usar cualquier persona",
        },
        {
          name: "Moderación",
          value: "Comandos exclusivos de moderación",
        }
      )
      .setAuthor({
        name: "Help Menu - Index [Lichi Bot]",
        iconURL: "https://cdn-icons-png.flaticon.com/512/4712/4712116.png",
      })
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // Moderator
    const embed_mod = new EmbedBuilder()
      .setTitle("Comandos de Moderación")
      .setColor("Purple")
      .addFields(
        {
          name: "/ban",
          value: "Banear al usuario a señalar (motivo no obligatorio)",
        },
        {
          name: "/unban",
          value: "Desbanear al usuario a señalar (le avisa por privado si es posible)",
        },
        {
          name: "/kick",
          value: "Kickear al usuario a señalar (motivo no obligatorio)",
        },
        {
          name: "/warn",
          value: "Dar una advertencia al usuario a señalar (le avisa por privado si es posible)",
        },
        {
          name: "/unwarn",
          value: "Quitar una advertencia al usuario a señalar (le avisa por privado si es posible)",
        },
        {
          name: "/timeout",
          value: "Dar timeout al usuario a señalar (motivo no obligatorio)",
        }
      )
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/4542/4542155.png")
      .setAuthor({
        name: "Help Menu - Moderator [Lichi Bot]",
        iconURL: "https://cdn-icons-png.flaticon.com/512/4712/4712086.png",
      })
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // Otros
    const embed_otros = new EmbedBuilder()
      .setTitle("Comandos de Utilidad")
      .setColor("Purple")
      .addFields(
        {
          name: "/userinfo",
          value: "Brinda información general de un usuario",
        },
        {
          name: "/serverinfo",
          value: "Brinda información general sobre este servidor",
        },
        {
          name: "/sugerencia",
          value: "Realiza una sugerencia en el canal con ese nombre",
        },
        {
          name: "/imitar",
          value: "Imita a un usuario y dí lo que desees",
        }
      )
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/4632/4632321.png")
      .setAuthor({
        name: "Help Menu - Utility [Lichi Bot]",
        iconURL: "https://cdn-icons-png.flaticon.com/512/4712/4712143.png",
      })
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // Menú cerrado
    const embed_close = new EmbedBuilder()
      .setTitle("Menú de Comandos Cerrado")
      .setColor("Purple")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/9940/9940467.png")
      .setAuthor({
        name: "Lichi Bot",
        iconURL: "https://cdn-icons-png.flaticon.com/512/4712/4712109.png",
      })
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });
    // Botón inicial
    await interaction.reply({ embeds: [embed_menu], components: [buttons] });

    // Editar el mensaje al clickear el boton
    const collector = interaction.channel.createMessageComponentCollector();
    collector.on("collect", async (i) => {
      // Lo que devuelve
      // Cerrar
      if (i.customId === "delete") {
        await i.update({ embeds: [embed_close], components: [] });
      }
      // Moderacion
      else if (i.customId === "mod") {
        await i.update({ embeds: [embed_mod], components: [buttons] });
      }
      // Otros
      else if (i.customId === "utility") {
        await i.update({ embeds: [embed_otros], components: [buttons] });
      }
      // Menu
      else if (i.customId === "menu") {
        await i.update({ embeds: [embed_menu], components: [buttons] });
      }
    });
  },
};
