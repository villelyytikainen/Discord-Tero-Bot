const dotenv = require('dotenv').config();
const fs = require('fs');
const Twitch = require('./custom_commands/twitch');
const {prefix} = require('./config.json');
const { Client, Intents, Collection } = require('discord.js');
const { Routes } = require('discord-api-types/v9');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const TEST_GUILD_ID = process.env.TEST_GUILD_ID;
const {REST} = require('@discordjs/rest');
const commands = [];
client.commands = new Collection();

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    commands.push(command);
    client.commands.set(command.name, command);
}

client.once('ready', ()=>{
    console.log(`${client.user.tag} is now connected to the guild!`);
});

client.on('interactionCreate', async interaction => {
    if(!interaction.isCommand())
        return;
    
    const command = client.commands.get(interaction.commandName);

    if(!command)
        return;

    try{
        await command.execute(interaction);
    }catch(error){
        if(error)
            console.error(error);
        await interaction.reply({content: 'There was an error while executing this command!', ephemeral: true})
    }
})

client.on('ready',async () => {
    const channel = client.channels.cache.get('745895949246660710');
    let announced = false;
    let status = null;

    //Keep checking the live status of stream
    setInterval(async() => {
        status = await Twitch.checkIfOnline(); 
        if(status === true && !announced){
            channel.send(Twitch.printStatus())
            announced = true;
        }
        else{
            announced = false;
        }
    }, 2000);
})

//Commands to the bot
client.on('messageCreate', async(message) =>{
    let args = message.content.slice(prefix.length).trim().split(/ +/);

    if(message.mentions.has(client.user.id)){
        message.reply(':middle_finger:')
    }
    if(message.content[0] === prefix){
        switch(args[0]){
            case 'delete':
                Utils.deleteMessages(message, args[1])
            break;
        }
    }
});

client.login(process.env.DISCORD_BOT_TOKEN);