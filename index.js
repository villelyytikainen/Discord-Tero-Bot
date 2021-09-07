const dotenv = require('dotenv').config();
const deleteMessages = require('./commands/deleteMessages')
const Discord = require('discord.js');
const Twitch = require('./commands/twitch')
const fetch = require('node-fetch');
const {prefix} = require('./config.json');
const getToken = require('./commands/twitch');
const client = new Discord.Client({
    partials: ["MESSAGE"]
});


client.once('ready', ()=>{
    
    console.log('bot connected');
});

client.on('ready',async () => {
    const channel = client.channels.cache.get('771299614924996619');
    let status = null;
    // channel.send(await Twitch.checkIfOnline())
    client.setInterval(() => {
        status = Twitch.checkIfOnline;
        channel.send(Twitch.printStatus(status));
    }, 5000);
})

client.on('message', async(msg) =>{
    let args = msg.content.slice(prefix.length).trim().split(/ +/);

    if(msg.content[0] === prefix){
        }
        else if(args[0] === 'delete'){
            deleteMessages(msg, 100)
        }
    }   
)

client.login(process.env.DISCORD_BOT_TOKEN);