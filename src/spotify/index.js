const receive = {
    command: "spsearch",
    description: "Spotify에서 노래를 찾습니다.",
    parameters: ["찾을 노래의 이름"],
    execute: function (message, bot, params, config, logger, events) {
        const request = require("request");
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()

        request.get({
            headers: {
                'Content-Type': 'application/json',
                'Authorization': "Bearer " + events[1].token()
            },
            url: 'https://api.spotify.com/v1/search?q=' + encodeURI(message.content.substring(10)) + "&type=track&limit=1"
        }, function (error, response, body) {
            let result = JSON.parse(body).tracks.items[0];
            let explicit;
            if (result.explicit) explicit = "O"
            else if (!result.explicit) explicit = "X"
            embed.setTitle(result.name + " - " + result.artists[0].name)
                .setFooter(message.content.substring(11) + '에 대해 Spotify에서 찾아보았어요!')
                .setURL(result.external_urls.spotify)
                .setDescription(result.album.name)
                .setThumbnail(result.album.images[1].url)
                .addField('가수', result.artists[0].name, true)
                .addField('앨범', result.album.name, true)
                .addField('출시일', result.album.release_date, true)
                .addField('성인용', explicit, true)
                .setColor(0x00AE86)
            async function embedsend() {
                await message.channel.send({
                    embed
                }).catch(err => console.log(err));
                message.channel.send(result.external_urls.spotify).catch(err => console.log(err));
            }
            embedsend()
        });
    }
};

module.exports = receive