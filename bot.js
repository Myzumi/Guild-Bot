const Discord = require('discord.js');
const client = new Discord.Client({ disableMentions: 'everyone' });
const chalk = require('chalk');
const fs = require('fs');
const roles = require(`./roles.json`);
require('dotenv').config();
const { createbot } = require(`./BotHandler`);
if (process.env.hypixelapikey === 'YOUHYPIXELAPIKEY')
  console.log(
    chalk.redBright(
      'Warning! No Hypixel api key set, this can result in errors'
    )
  );
const hypixelapi = require('hypixel-api');
const api = new hypixelapi(process.env.hypixelapikey);

client.on(`ready`, () => {
  console.log(chalk.greenBright('Online!'));
  createbot(client, api);
});

client.login(process.env.TOKEN);
