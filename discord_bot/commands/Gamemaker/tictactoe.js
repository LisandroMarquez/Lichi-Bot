const { TicTacToe } = require("discord-gamecord");
const {
  SlashCommandBuilder,
  ChatInputCommandInteraction,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("tictactoe")
    .setDescription("Juega al Ta-Te-Ti con otro usuario!")
    .addUserOption((option) =>
      option
        .setName("user")
        .setDescription("Usuario para jugar")
        .setRequired(true)
    ),

  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   */
  async execute(interaction) {
    const Game = new TicTacToe({
      message: interaction,
      isSlashGame: true,
      opponent: interaction.options.getUser("user"),
      embed: {
        title: "🈴  2P - Tic Tac Toe  *️⃣",
        color: "#9234eb",
        statusTitle: "Status",
        overTitle: "Game Over",
      },
      emojis: {
        xButton: "🈴",
        oButton: "*️⃣",
        blankButton: "⬛",
      },
      mentionUser: true,
      timeoutTime: 60000,
      xButtonStyle: "DANGER",
      oButtonStyle: "PRIMARY",
      turnMessage: "{emoji} | Es el turno de: **{player}**.",
      winMessage: "{emoji} | **{player}** ganó al Tic-Tac-Toe.",
      tieMessage: "Empate! Nadie ganó :)",
      timeoutMessage: "El juego no se finalizo! Nadie ganó",
      playerOnlyMessage: "Solo {player} y {opponent} pueden jugar esta partida.",
    });

    Game.startGame();
    Game.on("gameOver", (result) => {
      return;
    });
  },
};
