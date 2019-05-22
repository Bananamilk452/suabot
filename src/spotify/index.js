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
                'Authorization': "Bearer " + events.spotify.token()
            },
            url: 'https://api.spotify.com/v1/search?q=' + message.content.substring(10).replace(/ /gm, "%20") + "&type=track&limit=1"
        }, function (error, response, body) {
            let result = JSON.parse(body);
            let explicit;
            if (result.tracks.items[0].explicit) explicit = "O"
            else if (!result.tracks.items[0].explicit) explicit = "X"
            embed.setTitle(result.tracks.items[0].name + " - " + result.tracks.items[0].artists[0].name)
                .setFooter(message.content.substring(10) + '에 대해 Spotify에서 찾아보았어요!')
                .setURL(result.tracks.items[0].external_urls.spotify)
                .setDescription(result.tracks.items[0].album.name)
                .setThumbnail(result.tracks.items[0].album.images[1].url)
                .addField('가수', result.tracks.items[0].artists[0].name, true)
                .addField('앨범', result.tracks.items[0].album.name, true)
                .addField('출시일', result.tracks.items[0].album.release_date, true)
                .addField('성인용', explicit, true)
                .setColor(0x00AE86)
            async function embedsend() {
                await message.channel.send({
                    embed
                }).catch(err => console.log(err));
                message.channel.send(result.tracks.items[0].external_urls.spotify).catch(err => console.log(err));
            }
            embedsend()
        });
    }
};

module.exports = receive