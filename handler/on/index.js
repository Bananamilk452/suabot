const receive = {
    start: (bot, config, commands, logger) => {
    bot.on("message", message => {
        if (message.author.bot) return;
        if (message.channel.type === "dm" && message.author.id !== bot.user.id) message.channel.send("명령어는 채팅창에 입력해주세요!"); 
            else if (message.channel.type === "text") {
                var message_text = message.content;
                if (message_text.slice(0, config.prefix.length) == config.prefix) {
                    handle_command(message, message_text.substring(config.prefix.length));
            }
        }
    });

    bot.on("ready", () => {
        logger.info(`Bot Started, ${bot.users.size} of online users, ${bot.channels.size} of channels, ${bot.guilds.size} of guilds. \nLogged in as ${bot.user.tag}`);
        bot.user.setActivity(`s!help로 명령어를 확인하세요!`);
    });

    function search_command(command_name) {
        for(var i = 0; i < commands.length; i++) {
            if(commands[i].command == command_name.toLowerCase()) {
                return commands[i];
            }
        }
    
        return false;
    }
    
    function handle_command(message, text) {
        var params = text.split(" ");
        var command = search_command(params[0]);
    
        if(command) {
            if(params.length - 1 < command.parameters.length) {
                message.reply("알맞지 않는 내용입니다!");
            } else {
                command.execute(message, bot, params, config, logger);
            }
        }
    }
    }
}

module.exports = receive