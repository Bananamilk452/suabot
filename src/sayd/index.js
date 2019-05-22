const receive = {
    command: "sayd",
    description: "당신이 말한 내용을 따라합니다. 단, 당신이 말한 내용은 삭제됩니다.",
    parameters: ["말할 내용"],
    execute: function (message, bot, params, config, logger) {
        message.delete()
            .catch(err => {
                message.channel.send('예상치 못한 에러가 발생하였습니다 : ' + err);
                logger.error(err)
            });
        message.channel.send(params[1]);
    }
};

module.exports = receive