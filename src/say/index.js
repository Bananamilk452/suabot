const receive = {
    command: "say",
    description: "당신이 말한 내용을 따라합니다.",
    parameters: ["말할 내용"],
    execute: function(message, bot, params) {
        message.channel.send(params[1]);
    }
};

module.exports = receive