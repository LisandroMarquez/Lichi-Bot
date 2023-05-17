const {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
} = require("discord.js");
const { FastType } = require("discord-gamecord");
const Json = require("../Gamemaker/palabras.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("fast-typing")
    .setDescription(
      "Intenta escribir las oraciones en el menor tiempo posible!"
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const Game = new FastType({
      message: interaction,
      isSlashGame: true,
      embed: {
        title: "⌨️  1P - Escritura Fugaz  ⌨️",
        color: "#9234eb",
        description:
          "Tienes {time} segundos para escribir la siguiente oración!\nNota: Las **MAYÚSCULAS** no son necesarias y las **TILDES** cuentan",
      },
      timeoutTime: 120000,
      sentence:
        Json.oraciones[Math.floor(Math.random() * Json.oraciones.length)],
      winMessage:
        "**Ganaste!**\nFinalizaste en {time} segundos con un promedio de {wpm} letras por segundo.",
      loseMessage:
        "**Perdiste!**\nNo escribiste correctamente la oración en el tiempo indicado.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      return;
    });
  },
};
