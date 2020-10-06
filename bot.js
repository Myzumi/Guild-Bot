const Discord = require('discord.js')
const client = new Discord.Client({disableMentions: "everyone"})
const chalk = require('chalk')
const fs = require('fs')
const roles = require(`./roles.json`)
require('dotenv').config()
const {createbot} = require(`./BotHandler`)

client.on(`ready`, () => {
    console.log(chalk.greenBright('Online!'))
    createbot(client)
})



client.login(process.env.TOKEN)