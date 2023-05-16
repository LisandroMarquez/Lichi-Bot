const { EmbedBuilder, SlashCommandBuilder } = require("discord.js");
const slaps = [
  "https://i.giphy.com/media/3XlEk2RxPS1m8/giphy.gif",
  "https://i.giphy.com/media/mEtSQlxqBtWWA/giphy.gif",
  "https://i.giphy.com/media/j3iGKfXRKlLqw/giphy.gif",
  "https://i.giphy.com/media/2M2RtPm8T2kOQ/giphy.gif",
  "https://i.giphy.com/media/l3YSimA8CV1k41b1u/giphy.gif",
  "https://i.giphy.com/media/WLXO8OZmq0JK8/giphy.gif",
  "https://media1.tenor.com/images/0720ffb69ab479d3a00f2d4ac7e0510c/tenor.gif",
  "https://media1.tenor.com/images/8b80166ce48c9c198951361715a90696/tenor.gif",
  "https://media1.tenor.com/images/6aa432caad8e3272d21a68ead3629853/tenor.gif",
  "https://media1.tenor.com/images/4ec47d7b87a9ce093642fc8a3c2969e7/tenor.gif",
];

module.exports = {
  premiumOnly: false,
  data: new SlashCommandBuilder()
    .setName("slap")
    .setDescription("Dale una cachetada a un usuario")
    .addUserOption((option) =>
      option
        .setName("target")
        .setDescription("Usuario a cachetear")
        .setRequired(true)
    ),
  async execute(interaction) {
    const { options, member, guild } = interaction;
    const user = options.getUser("target");
    // Obtener el ID del usuario que ejecuta el comando
    const userId = member.user.id;

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
    // Mostrar la pf
    .setThumbnail(`${user.displayAvatarURL({ dynamic: true })}`)
    // Titulo del mensaje
    .setTitle(`Alguien ha recibido una cachetada!`)
    // Descripcion del embed
    .setDescription(`${member} Le pegó una cachetada a ${user}!`)
    // Seleccionar color
    .setColor("Purple")
    // Imagen cachetada
    .setImage(slaps[Math.floor(Math.random() * slaps.length)])
    // Hora actual
    .setTimestamp()
    // Footer
    .setFooter({
      text: "Estallados Support",
      iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
    });

    return interaction.reply({
      embeds: [ Embed ],
    });
  },
};
