require('dotenv').config();
const Discord = require('discord.js');
const fetch = require('node-fetch');
const {prefix, token} = require('./config.json');
const client = new Discord.Client();

client.once('ready', ()=>{
    
    console.log('bot connected');
});

client.on('message', (msg) =>{
    let args = msg.content.slice(prefix.length).trim().split(/ +/);
    if(msg.content[0] === prefix){
        if(args[0] === 'steam'){
            msg.reply(`http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${process.env.STEAM_TOKEN}&steamids=76561197960435530`)
        }
    }
        
})


client.login(token);