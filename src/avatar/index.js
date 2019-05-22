const receive = {
    command: "avatar",
    description: "당신 또는 다른 사람의 프로필 사진을 출력합니다.",
    parameters: [],
    execute: (message, bot, params) => {
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()

        let member = message.mentions.users.first();
        if (!member){
            embed.setTitle(message.author.tag)
            embed.setImage(message.author.avatarURL)

            message.channel.send({embed}).catch(err => console.log(err));
        }
        else if (member) {
            embed.setTitle(member.username + '#' + member.discriminator)
            embed.setImage('https://cdn.discordapp.com/avatars/' + member.id + '/' + member.avatar + '.png?size=2048')

            message.channel.send({embed}).catch(err => console.log(err));
        }
    }
}

module.exports = receive