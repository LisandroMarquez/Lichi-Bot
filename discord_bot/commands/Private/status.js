const {
  SlashCommandBuilder,
  ActivityType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  developer: true,
  data: new SlashCommandBuilder()
    .setName("status")
    .setDescription("Cambia el estado del bot [Dev Only]")
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addStringOption((option) =>
      option
        .setName("opciones")
        .setDescription("Selecciona una opcion")
        .setRequired(true)
        .addChoices(
          { name: "Viendo", value: "Watching" },
          { name: "Escuchando", value: "Listening" },
          { name: "Jugando", value: "Playing" },
          { name: "Compitiendo", value: "Competing" }
        )
    )
    .addStringOption((option) =>
      option
        .setName("contenido")
        .setDescription("Contenido de la actividad")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("estado")
        .setDescription("Selecciona el estado del bot")
        .addChoices(
          { name: "Online", value: "online" },
          { name: "Ausente", value: "idle" },
          { name: "No molestar", value: "dnd" },
          { name: "Invisible", value: "invisible" }
        )
    ),

  async execute(interaction, client) {
    const { options } = interaction;

    client.user.setPresence({
      activities: [
        {
          name: options.getString("contenido"),
          type: ActivityType[`${options.getString("opciones")}`],
        },
      ],
      status: options.getString("estado"),
    }); /* Aqui cuando terminen de rellenar se cambiara el estado del bot */

    await interaction.reply({
      content: "Se actualizo el estado con exito [✓]",
      ephemeral: true,
    }); /* Esto se mandara cuando el comando si funciono */
  },
};
