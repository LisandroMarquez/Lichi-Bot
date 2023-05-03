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
    // Creación botones
    // Botón 1
    const btn_menu = new ButtonBuilder()
      .setCustomId("menu")
      .setLabel("Menú ↩️")
      .setStyle(ButtonStyle.Primary);
    // Botón 2
    const btn_random = new ButtonBuilder()
      .setCustomId("random")
      .setLabel("Random 🎲")
      .setStyle(ButtonStyle.Secondary);
    // Botón 3
    const btn_util = new ButtonBuilder()
      .setCustomId("utility")
      .setLabel("Utilidad 🛠️")
      .setStyle(ButtonStyle.Secondary);
    // Botón 4
    const btn_mod = new ButtonBuilder()
      .setCustomId("mod")
      .setLabel("Moderación 🛡️")
      .setStyle(ButtonStyle.Secondary);
    // Botón 5
    const btn_close = new ButtonBuilder()
      .setCustomId("delete")
      .setLabel("Cerrar 💣")
      .setStyle(ButtonStyle.Danger);

    // Creación row_buttons
    // Row 1
    const row_menu = new ActionRowBuilder().addComponents(
      btn_random,
      btn_util,
      btn_mod,
      btn_close
    );
    // Row 2
    const row_random = new ActionRowBuilder().addComponents(
      btn_menu,
      btn_util,
      btn_mod,
      btn_close
    );
    // Row 3
    const row_util = new ActionRowBuilder().addComponents(
      btn_menu,
      btn_random,
      btn_mod,
      btn_close
    );
    // Row 4
    const row_mod = new ActionRowBuilder().addComponents(
      btn_menu,
      btn_random,
      btn_util,
      btn_close
    );

    // Embeds
    // Menu
    const embed_menu = new EmbedBuilder()
      .setTitle("Menu Inicial")
      .setColor("#4b63a6")
      .setThumbnail("https://cdn-icons-png.flaticon.com/512/4771/4771275.png")
      .setDescription(
        'Selecciona el apartado del cual deseas información o utiliza el botón "Cerrar" para eliminar este mensaje'
      )
      .addFields(
        {
          name: "🎲 Random 🎲",
          value: "Comandos sin finalidad más que el entretenimiento",
        },
        {
          name: "🛠️ Utilidad 🛠️",
          value: "Comandos de utilidad como su propio nombre indica",
        },
        {
          name: "🛡️ Moderación 🛡️",
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
      .setColor("#4b63a6")
      .addFields(
        {
          name: "🚫 /ban 🚫",
          value: "Banear al usuario a señalar (motivo no obligatorio)",
        },
        {
          name: "🔄 /unban 🔄",
          value:
            "Desbanear al usuario a señalar (le avisa por privado si es posible)",
        },
        {
          name: "🛑 /kick 🛑",
          value: "Kickear al usuario a señalar (motivo no obligatorio)",
        },
        {
          name: "‼️ /warn ‼️",
          value:
            "Dar una advertencia al usuario a señalar (le avisa por privado si es posible)",
        },
        {
          name: "♻️ /unwarn ♻️",
          value:
            "Quitar una advertencia al usuario a señalar (le avisa por privado si es posible)",
        },
        {
          name: "💤 /timeout 💤",
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

    // Utility
    const embed_utility = new EmbedBuilder()
      .setTitle("Comandos de Utilidad")
      .setColor("#4b63a6")
      .addFields(
        {
          name: "ℹ️ /userinfo ℹ️",
          value: "Brinda información general de un usuario",
        },
        {
          name: "🏡 /serverinfo 🏡",
          value: "Brinda información general sobre este servidor",
        },
        {
          name: "💡 /sugerencia 💡",
          value: "Realiza una sugerencia en el canal con ese nombre",
        },
        {
          name: "🥷🏻 /imitar 🥷🏻",
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

    // Random
    const embed_random = new EmbedBuilder()
      .setTitle("Comandos de Entretenimiento")
      .setColor("#4b63a6")
      .addFields(
        {
          name: "🎱 /8ball 🎱",
          value: "Da una respuesta random a tu pregunta",
        },
        {
          name: "☄️ /prediccion ☄️",
          value: "Arroja un porcentaje random a tu predicción",
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
      .setColor("#4b63a6")
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
    await interaction.reply({
      embeds: [embed_menu],
      components: [row_menu],
    });

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
        await i.update({
          embeds: [embed_mod],
          components: [row_mod],
        });
      }
      // Random
      else if (i.customId === "random") {
        await i.update({
          embeds: [embed_random],
          components: [row_random],
        });
      }
      // Utility
      else if (i.customId === "utility") {
        await i.update({
          embeds: [embed_utility],
          components: [row_util],
        });
      }
      // Menu
      else if (i.customId === "menu") {
        await i.update({
          embeds: [embed_menu],
          components: [row_menu],
        });
      }
    });
  },
};
