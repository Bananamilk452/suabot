var currency = null;
const receive = {
    start: (config, logger) => {
        const request = require("request")

        function CurrencyLoop() {
            request("https://api.exchangeratesapi.io/latest?base=USD&symbols=KRW", function (error, response, body) {
                if (body.error != undefined) {
                    logger.error(`Error in request currency, Error Message : ${body.error}`)
                    logger.error(`Request Currency failed, command related to economy may cause errors.`)
                } else
                    currency = JSON.parse(body).rates.KRW
                logger.info(`Successfully got currency. Currency : ${currency}`)
            });
            setTimeout(CurrencyLoop, 1000 * 60 * 60);
        };

        CurrencyLoop();
    },
    price: () => {
        return currency;
    }
}

module.exports = receive