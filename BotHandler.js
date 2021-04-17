const minecraft = require('mineflayer');
const config = require('./config.json');
const chalk = require('chalk');
const hypixelapi = require('hypixel-api');
const Discord = require('discord.js');
const RegexHandler = require('./RegexHandler');
require('dotenv').config();
let bot = null;
let cd = [];
/**
 *
 * @param {Discord.Client} client
 * @param {hypixelapi} api
 */

async function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
}

async function createbot(client, api) {
  console.log('Login in bot');
  bot = minecraft.createBot({
    host: 'mc.hypixel.net',
    port: 25565,
    username: process.env.minecraftusername,
    password: process.env.minecraftpsw,
    version: '1.13.2',
  });
  async function rejoinLimbo() {
    console.log('Trying to send to Limbo');
    bot.chat(`/ac \u00a7c<3`);
    // Add a check if in Lobby -> HPAPI
    console.log('In Limbo');
    if (cd.includes('recon')) cd = await removeItemOnce(cd, 'recon');
  }
  bot.on('message', (message) => {});

  bot.on('login', () => {
    console.log('Logged in');
    // replace Housing to Limbo | PR [29]
    setTimeout(() => {
      rejoinLimbo();
    }, 15000);
  });
  bot.on('error', (err) => {
    console.log(err);
  });

  bot.chatAddPattern(
    // Guild > [VIP] Player: gBa1b2n3h4j5u6i7o4
    RegexHandler.regex_guildchat,
    'guild_chat',
    'Custom chat event'
  );
  bot.chatAddPattern(
    // Officer > [VIP] Player: gBa1b2n3h4j5u6i7o4
    RegexHandler.regex_officerchat,
    'officer_chat',
    'Custom chat event'
  );
  bot.chatAddPattern(
    // [VIP] Player joined the lobby!
    RegexHandler.regex_lobbyjoin,
    'in_lobby',
    'Custom chat event'
  );

  bot.on('in_lobby', () => {
    if (cd.includes('recon')) return;
    cd.push('recon');
    console.log(
      chalk.redBright('Bot is outside of Limbo, trying to send to limbo again')
    );
    rejoinLimbo();
  });

  bot.on('guild_chat', (rank, username, grank, message) => {
    sendGuildChatToDiscord(rank, username, grank, message);
  });

  bot.on('officer_chat', (rank, username, grank, message) => {
    sendOfficerChatToDiscord(rank, username, grank, message);
  });

  async function sendGuildChatToDiscord(rank, username, grank, message) {
    if (grank === '' || grank === undefined) {
      client.guilds.cache
        .get(config.guildid)
        .channels.cache.get(config.guildchat)
        .send(`Guild > ${rank} ${username}: ${message}`);
    } else {
      client.guilds.cache
        .get(config.guildid)
        .channels.cache.get(config.guildchat)
        .send(`Guild > ${rank} ${username}${grank}: ${message}`);
    }
  }

  async function sendOfficerChatToDiscord(rank, username, grank, message) {
    if (grank === '' || grank === undefined) {
      client.guilds.cache
        .get(config.guildid)
        .channels.cache.get(config.officerchat)
        .send(`Officer > ${rank} ${username}: ${message}`);
    } else {
      client.guilds.cache
        .get(config.guildid)
        .channels.cache.get(config.officerchat)
        .send(`Officer > ${rank} ${username}${grank}: ${message}`);
    }
  }
}

exports.createbot = createbot;
