const Discord = require("discord.js");
const bot = new Discord.Client();

const commands = require("./src");
const handler =  require("./handler");
const config = require("./config.json");
const events = require("./events");
const logger = require("./logger");

handler.start(bot, config, commands, logger);
var Base64 = require('js-base64').Base64;


/* 
// Spotify Token 생성 (1시간) //
var SpotifyClient = Base64.encode(`${config.spotify.client}:${config.spotify.clientsecret}`);
var SpotifyToken = null;
function TokenLoop() {
    request.post({
    headers: {'Content-Type' : 'application/x-www-form-urlencoded',
                'Authorization' : "Basic " + SpotifyClient },
    url:     'https://accounts.spotify.com/api/token',
    body:    "grant_type=client_credentials"
    }, function(error, response, body){
        body = JSON.parse(body);
        if (body.error != undefined) {
            logger.error(`Error in creation Spotify Token, Error Message : ${body.error}`)
            logger.error(`Token creation failed, command related to Spotify may cause errors.`)
        }
        else
            SpotifyToken = body.access_token
            logger.info(`Successfully created a Spotify Token. Token : ${SpotifyToken}`)
    });
    setTimeout(TokenLoop, 3540000);
};

TokenLoop(); */

bot.login(config.discordtoken);