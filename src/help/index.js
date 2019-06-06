const receive = {
  command: "help",
  description: "사용 가능한 명령어 목록을 출력합니다.",
  parameters: [],
  execute: (message, bot, params) => {
    const Discord = require("discord.js");
    const commands = require("../../src");
    const embed = new Discord.RichEmbed()
      .setAuthor('안녕하세요! 수아 봇이에요!')
      .setDescription('아래가 사용 가능한 명령어들이에요!')
      .setColor(0x00AE86)

    commands.forEach(element => {
      embed.addField('`s!' + element.command + '`', element.description)
    });
    message.channel.send({embed}).catch(err => console.log(err));
  }
}

module.exports = receive