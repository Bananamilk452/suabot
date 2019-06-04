const receive = {
    command: "search",
    description: "구글에서 검색한 내용을 출력합니다.",
    parameters: ['검색 내용'],
    execute: (message, bot, params, config, logger, events) => {
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()
        var request = require('request');
        var cheerio = require("cheerio");
        var stitle, surl, scontent
        var searchword = message.content.substring(9)

        request('https://www.google.com/search?hl=ko&q=' + encodeURI(searchword) + '&sa=N&num=1&ie=UTF-8&oe=UTF-8&gws_rd=ssl', function (error, response, body) {
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(body)
                var main = $('#main').children()[3].children[0]

                try {
                    stitle = main.children[0].children[0].children[0].children[0].data
                    surl = main.children[0].children[0].attribs.href
                    scontent = main.children[2].children[0].children[0].children[0].children[0].children[0].children[2].data

                    embed.setTitle(stitle)
                        .setFooter(searchword + '에 대해 찾아보았어요!')
                        .setURL(surl.substring(7))
                        .setDescription(scontent)
                        .setColor(0x00AE86)
                    message.channel.send({embed}).catch(err => console.log(err))
                } catch (err) {message.channel.send('예상치 못한 에러가 발생하였습니다. : ' + err);}
            } else {

                logger.warn(error);
            }
        });

    }
}

module.exports = receive