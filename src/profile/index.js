const receive = {
    command: "profile",
    description: "당신 또는 다른 사람의 프로필을 출력합니다.",
    parameters: [],
    execute: (message, bot, params) => {
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()

        let member = message.mentions.users.first();
        let roles = "";
        if (!member){
            embed.setAuthor(message.author.tag, message.author.avatarURL)
            .setThumbnail(message.author.avatarURL)
            .addField('ID', message.author.id, true)
            .addField('별명', message.guild.member(message.author).nickname || "없음", true)
            .addField('상태', message.author.presence.status, true)
            .addField('플레이 중', message.author.presence.game || "없음", true)
            .addField('접속 날짜', message.guild.member(message.author).joinedAt)
            .addField('가입 날짜', message.author.createdAt)
            .setColor(0x00AE86)
                message.guild.member(message.author).roles.forEach(element => {
                    roles = roles + element.name + ", "
                });
            embed.addField('역할', roles)
            message.channel.send({embed}).catch(err => console.log(err));
        }
        else if (member) {
            embed.setAuthor(member.username + '#' + member.discriminator, member.avatarURL)
            .setThumbnail(member.avatarURL)
            .addField('ID', member.id, true)
            .addField('별명', message.guild.member(member).nickname || "없음", true)
            .addField('상태', member.presence.status, true)
            .addField('플레이 중', member.presence.game || "없음", true)
            .addField('접속 날짜', message.guild.member(member).joinedAt)
            .addField('가입 날짜', member.createdAt)
            .setColor(0x00AE86)
                message.guild.member(member).roles.forEach(element => {
                    roles = roles + element.name + ", "
                });
            embed.addField('역할', roles)

            message.channel.send({embed}).catch(err => console.log(err));
        }
    }
}

module.exports = receive