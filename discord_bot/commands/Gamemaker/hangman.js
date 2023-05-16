const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  EmbedBuilder,
} = require("discord.js");
const { Hangman } = require("discord-gamecord");
const Json = require('../Gamemaker/palabras.json')

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ahorcado")
    .setDescription("Juega al ahorcado con el bot!"),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const { guild, member } = interaction;
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
      // Mostrar la pf del server
      .setThumbnail(`${guild.iconURL({ dynamic: true })}`)
      // Titulo del mensaje
      .setTitle(`${member.nickname} está jugando al Ahorcado!`)
      // Seleccionar color
      .setColor("Purple")
      // Hora actual
      .setTimestamp()
      // Footer
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    const Game = new Hangman({
      message: interaction,
      embed: Embed,
      hangman: {
        hat: "👒",
        head: "🥺",
        shirt: "🧥",
        pants: "👖",
        boots: "👞👞",
      },
      customWord: Json.palabras[Math.floor(Math.random() * Json.palabras.length)],
      timeoutTime: 60000,
      winMessage: "Ganaste! La palabra era **{word}**",
      loseMessage: `Perdiste! La palabra era **{word}**`,
      playerOnlyMessage: "Solo {player} puede usar estos botones",
    });

    Game.startGame();
    Game.on("gameover", (result) => {
      return;
    });
  },
};
