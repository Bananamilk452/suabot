var SpotifyToken = null;
const receive = {
    start: (config, logger) => {
        const request = require("request")
        const Base64 = require('js-base64').Base64;

        var SpotifyClient = Base64.encode(`${config.spotify.client}:${config.spotify.secret}`);
        
        function TokenLoop() {
            request.post({
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': "Basic " + SpotifyClient
                },
                url: 'https://accounts.spotify.com/api/token',
                body: "grant_type=client_credentials"
            }, function (error, response, body) {
                body = JSON.parse(body);
                if (body.error != undefined) {
                    logger.error(`Error in creation Spotify Token, Error Message : ${body.error}`)
                    logger.error(`Token creation failed, command related to Spotify may cause errors.`)
                } else
                    SpotifyToken = body.access_token
                logger.info(`Successfully created a Spotify Token. Token : ${SpotifyToken}`)
            });
            setTimeout(TokenLoop, 1000 * 60 * 59);
        };

        TokenLoop();
    },
    token: () => {
        return SpotifyToken;
    }
}

module.exports = receive