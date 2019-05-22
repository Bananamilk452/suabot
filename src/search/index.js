const receive = {
    command: "search",
    description: "구글에서 검색한 내용을 출력합니다.",
    parameters: ['검색 내용'],
    execute: (message, bot, params) => {
    const google = require('google')
    const Discord = require("discord.js");
    const embed = new Discord.RichEmbed() 
    google.resultsPerPage = 1
    var searchword = message.content.substring(8)
        
    google(searchword, function (err, res){
    if (err) message.channel.send('예상치 못한 에러가 발생하였습니다. : ' + err);

        var link = res.links[0]
        embed.setTitle(link.title)
        .setFooter(searchword + '에 대해 찾아보았어요!')
        .setURL(link.href)
        .setDescription(link.description)
        .setColor(0x00AE86)
        message.channel.send({embed}).catch(err => console.log(err));   

        });
    }
}

module.exports = receive