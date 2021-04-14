const minecraft = require("mineflayer");
const chalk = require("chalk");
const fs = require("fs");
const Discord = require("discord.js");
const config = require("./config.json");
const mcapi = require("mojangjs");
const roles = require("./roles.json");
const HypixelAPI = require("hypixel-api");
require("dotenv").config();
const hypixel = new HypixelAPI(process.env.apikey1);
let bot = null;
const keygen2 = require("crypto-random-string");

// file deepcode ignore javascript%2Fdc_interfile_project%2FRegExpBadCharRange: <please specify a reason of ignoring this>
// file deepcode ignore javascript%2Fdc_interfile_project%2FRegExpBadCharRange: <please specify a reason of ignoring this>
// file deepcode ignore PromiseNotCaughtNode: <please specify a reason of ignoring this>

function createbot(client) {
  //  client = client

  console.log("Login in bot");
  bot = minecraft.createBot({
    host: "mc.hypixel.net",
    port: 25565,
    username: process.env.minecraftusername,
    password: process.env.minecraftpsw,
    version: "1.13.2",
  });

  bot.on("message", (message) => {
    // Logs chat to console in colours
    console.log(chatMsg.toAnsi());
    // If in lobby, send to Limbo
    const msg = chatMsg.toString();
    if (msg.endsWith(' joined the lobby!') && msg.includes('[MVP+')) {
      console.log('Lobby detected: Sending to Limbo.');
      minebot.chat('/ac \u00a7ca');
  });

  bot.on("login", () => {
    console.log('Logged in')
    // client.bothandlerstatus = "Online!"
    setTimeout(() => {
      bot.chat('/ac \u00a7c<3');
      console.log("In Limbo.");
    }, 15000);
  });
  bot.on("error", (err) => {
    console.log(err);
  });

  bot.chatAddPattern(
    // From [VIP] Player: gBa1b2n3h4j5u6i7o4
    /^Guild > (\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*?: (\w*[A-z0-9_ \.\,;:\-_\/]{1,10000})*$/i,
    "guild_chat",
    "Custom chat event"
  );
  bot.chatAddPattern(
    // From [VIP] Player: gBa1b2n3h4j5u6i7o4
    /^Officer > (\[.*?\])*.*? ([\w\d]{2,17}).*?( \[.*?\])*.*?: (\w*[A-z0-9_ \.\,;:\-_\/]{1,10000})*$/i,
    "officer_chat",
    "Custom chat event"
  );
    	
  bot.on("guild_chat", (rank, username, grank, message) => {
    sendGuildChatToDiscord(rank, username,grank, message)
  });

  bot.on("officer_chat", (rank, username, grank, message) => {
    sendOfficerChatToDiscord(rank, username,grank, message)
  });

  function sendGuildChatToDiscord(rank, username, grank, message) {
    if (grank === '' || grank === undefined) {
      client.guilds.cache.get(config.guildid).channels.cache.get(config.guildchat).send(`Guild > ${rank} ${username}: ${message}`)
    }else {
      client.guilds.cache.get(config.guildid).channels.cache.get(config.guildchat).send(`Guild > ${rank} ${username}${grank}: ${message}`)
    }
  }

  function sendOfficerChatToDiscord(rank, username, grank, message) {
    if (grank === '' || grank === undefined) {
      client.guilds.cache.get(config.guildid).channels.cache.get(config.officerchat).send(`Officer > ${rank} ${username}: ${message}`)
    }else {
      client.guilds.cache.get(config.guildid).channels.cache.get(config.officerchat).send(`Officer > ${rank} ${username}${grank}: ${message}`)
    }
  }
}

function AddNormalChatListener() {
  bot.chatAddPattern(
    // From [VIP] Player: gBa1b2n3h4j5u6i7o4
    /(.)/,
    "normal_chat",
    "Custom chat event"
  );
}

exports.createbot = createbot;
