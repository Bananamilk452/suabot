const Discord = require("discord.js");
const bot = new Discord.Client();

const commands = require("./src");
const handler =  require("./handler");
const config = require("./config.json");
const events = require("./events");
const logger = require("./logger");

events.forEach(element => {
    element.start(config, logger)
});
handler.start(bot, config, commands, logger, events);

bot.login(config.discordtoken);