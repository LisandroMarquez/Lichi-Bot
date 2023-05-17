const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
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
    const Game = new Hangman({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "🪢  1P - Ahorcado  🪢",
        color: "#9234eb",
        statusTitle: "Status",
        overTitle: "Game Over",
      },
      hangman: {
        hat: "👒",
        head: "🫠",
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
