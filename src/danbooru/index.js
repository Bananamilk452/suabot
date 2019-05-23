const receive = {
    command: "danbooru",
    description: "danbooru에서 일러스트를 가져옵니다. (비-NSFW 채널에서는 rating:safe 옵션이 무조건 붙습니다. 또한 몇몇 태그는 검색이 불가능합니다.)",
    parameters: ["태그"],
    execute: function (message, bot, params, config, logger, events) {
        const Danbooru = require('danbooru')
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()

        // Perform a search for popular image posts
        const booru = new Danbooru()
        let tag = message.content.substring(11)
        if (!message.channel.nsfw) tag = tag + " rating:safe"
        booru.posts({
            tags: tag
        }).then(posts => {
            try {
            const index = Math.floor(Math.random() * posts.length)
            const post = posts[index]
                const url = booru.url(post.file_url)
                embed.setTitle("Danbooru에서 찾아보았어요!")
                .setFooter(post.tag_string_general)
                .setURL(url)
                .setImage(url)
                .setColor(0x00AE86)
                message.channel.send({embed}).catch(err => console.log(err));
            } catch (error) {
                logger.error(error)
                message.reply("알맞지 않은 태그 또는 부합하는 일러스트가 없습니다!")
            }
            });
    }
};

module.exports = receive