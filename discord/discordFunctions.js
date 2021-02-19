const Discord = require("discord.js");
const client = new discord.Client();
const dotenv = require("dotenv").config();
const token = process.env.DISCORD_TOKEN;

module.exports.getChannels = (serverId) => {
    Discord.GuildManager.fetch(id).then(guild => {
        return guild.channels.cache.filter(channel => channel.type === "text");
    }).catch(error => {
        return error;
    });
}

module.exports.sendMessage = (serverId, channelId, message) => {
    Discord.GuildManager.fetch(id).then(guild => {
        guild.channels.cache.find(channel => channel.id === channelId).then(channel => {
            if(channel.type === "text") {
                channel.send(message);
            } else {
                return "Channel is not a text channel.";
            }
        }).catch(error => {
            return error;
        });
    }).catch(error => {
        return error;
    });
}

client.login(token);