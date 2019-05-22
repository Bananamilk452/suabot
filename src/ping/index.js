const receive = {
    command: "ping",
    description: "서버와 클라이언트의 지연도를 측정합니다",
    parameters: [],
    execute: function(message, bot, params) {
        message.reply(`Pong! 지연도는 ${Math.round(bot.ping)}ms 입니다.`);
    }
};

module.exports = receive