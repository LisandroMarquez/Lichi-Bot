const {
  ChatInputCommandInteraction,
  AttachmentBuilder,
  EmbedBuilder,
} = require("discord.js");

const { registerFont } = require("canvas");
const Canvas = require("canvas");

module.exports = {
  name: "guildMemberAdd",
  once: false,
  /**
   *
   * @param {ChatInputCommandInteraction} member
   */
  async execute(member) {
    registerFont("./Acme-Regular.ttf", {
      family: "specialFont",
    });

    const applyText = (canvas, text) => {
      const ctx = canvas.getContext("2d");

      // Set font size
      let fontsize = 85;
      do {
        ctx.font = `${(fontsize -= 10)}px specialFont`;
      } while (
        // If text longer than image, text smaller
        ctx.measureText(text).width >
        canvas.width - 150
      );
      return ctx.font;
    };

    // Create template
    const canvas = Canvas.createCanvas(1080, 468);
    const ctx = canvas.getContext("2d");
    const background = await Canvas.loadImage("./a.jpg");

    // Scale images if necessary
    ctx.drawImage(background, 0, 0, 1080, 560);

    // Font color
    ctx.fillStyle = "#ffffff";

    // Welcome text
    ctx.textAlign = "center";
    ctx.font = applyText(canvas, `Bienvenido/a ${member.user.username} al servidor Estallados`);

    // Center text
    ctx.fillText(`Bienvenido/a ${member.user.username} al servidor de Estallados`, 535, 385);
    ctx.beginPath();
    ctx.arc(530, 161, 115, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    // Insert avatar user
    const avatar = await Canvas.loadImage(
      member.user.displayAvatarURL({ size: 1024, extension: "png" })
    );
    ctx.drawImage(avatar, 410, 35, 250, 250);

    // Create image
    const attachment = new AttachmentBuilder(canvas.toBuffer("image/png"), {
      name: "welcome.png",
    });

    // Take channel to send welcome message to new members
    const channel = member.guild.channels.cache.get("1093292937032511660"); // Channel estallados: 796514542933770270

    // Asd
    const { guild } = member;

    // Create embeded text with image created
    const embed = new EmbedBuilder()
      .setAuthor({
        name: `${guild.name}`,
        iconURL: `${
          guild.iconURL({ dynamic: true }) ||
          "https://cdn.discordapp.com/attachments/849093461914157078/1066883078544429066/Da_Rules.jpg"
        }`,
        url: "https://discord.gg/zS5GAyWsh3",
      })
      .setTitle(
        ":cyclone:  Démosle una cálida bienvenida al nuevo miembro de Estallados!  :blush: :heart_exclamation:"
      )
      .setImage(`attachment://welcome.png`)
      .setColor('#b80431')
      .setTimestamp()
      .setFooter({
        text: "Estallados Support",
        iconURL: "https://media.tenor.com/YHSvndvR0nsAAAAC/goose-peepo.gif",
      });

    // Return
    await channel.send({ embeds: [embed], files: [attachment] });
  },
};
