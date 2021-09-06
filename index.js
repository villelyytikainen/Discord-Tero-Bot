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

client.on('ready', () => {
    client.setInterval(checkIfStreamerOnline, 5000);
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

const checkIfStreamerOnline = async () => {
    const stream = await fetch('https://api.twitch.tv/helix/search/channels?query="kuerps"', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`,
                    'Client-Id': `${process.env.TWITCH_CLIENT_ID}`
                }
            }).then(d => d.json())
            let message = '';

            if(stream.data[0].is_live === true){
                client.channels.cache.get('771299614924996619').send('Cada setä ois livenä, tulkeehaa osoitteesee https://www.twitch.tv/kuerps' )
            }
}