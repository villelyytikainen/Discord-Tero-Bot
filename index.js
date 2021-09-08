const dotenv = require('dotenv').config();
const deleteMessages = require('./commands/deleteMessages')
const Discord = require('discord.js');
const Twitch = require('./commands/twitch')
const {prefix} = require('./config.json');
const client = new Discord.Client({
    partials: ["MESSAGE"]
});


client.once('ready', ()=>{
    
    console.log('bot connected');
});

client.on('ready',async () => {
    const channel = client.channels.cache.get('745895949246660710');
    let announced = false;
    let status = null;

    //Keep checking the live status of stream
    client.setInterval(async() => {
        status = await Twitch.checkIfOnline(); 
        if(status === true && !announced){
            channel.send(Twitch.printStatus())
            announced = true;
        }
        else{
            announced = false;
        }
    }, 5000);
})

//Commands to the bot
client.on('message', async(msg) =>{
    let args = msg.content.slice(prefix.length).trim().split(/ +/);

    if(msg.content[0] === prefix){
        switch(args[0]){
            case 'delete':
                deleteMessages(msg, 100)
            break;
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);