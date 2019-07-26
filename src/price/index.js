const receive = {
    command: "price",
    description: "현재 화폐의 가격을 표시합니다.",
    parameters: [],
    execute: function (message, bot, params, config, logger, events) {
        const request = require("request");
        const Discord = require("discord.js");
        const embed = new Discord.RichEmbed()

        var id = ["bitcoin", "ethereum", "ripple", "litecoin", "cosmos", "eos"]
        var currency = events.currency.price

        id.forEach(element => {
            request.post({
                headers: {
                    'Content-Type': 'application/json'
                },
                url: 'https://graphql.coincap.io',
                body: {
                    "query": "query { asset(id: \"" + element + "\") {priceUsd name id changePercent24Hr}}"
                },
                json: true
            }, function (error, response, body) {
                let data = body.data.asset;
                let per = data.changePercent24Hr

                function percent(per) {
                    if (per.startsWith("-")) return per.slice(0, 5) + "%"
                    else return per.slice(0, 4) + "%"
                }
                console.log(data.name + " : " + String(Math.round(Number(data.priceUsd) * currency)) + "원 / 전날 대비 : " + percent(per))
            });
        })
    }
};

module.exports = receive