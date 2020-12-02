(function(){
    const Discord = require('discord.js');
    const {prefix, token} = require('./config.json');
    const deleteMessages = require('./commands/deleteMessages');
    const getPrice = require('./commands/getPrice');

    const client = new Discord.Client();
    const answers = ['mitä?', 'no mitä?!', 'mitä helvettiä?!', 
                    'no mitä tahdot?!', 'oliko asiaa?', 'kerro?'];

    client.once('ready', ()=>{
        console.log('bot connected');
    });

    client.on('message', async (msg)=>{
        let args = msg.content.slice(prefix.length).trim().split(/ +/);
        if(!msg.content.includes('"'))
            args = msg.content.slice(prefix.length).trim();
            
        const command = args.shift().toLowerCase();

        switch(command){
            case 'tuhoa':
                const amount = parseInt(args[0]) + 1;
                if (!amount)
                    msg.channel.send('anna viestien lukumäärä jotka poistaa');
                if (amount > 0 && amount < 100) {
                    deleteMessages(msg, amount);
                }
                break;
            case 'jimms':
                const product = args[0];
                const count = args[1] || 1;
                // count != Number ? msg.channel.send('anna saatana numero!') : count;
                getPrice(product, count).then(data=>{
                    console.table(data.length);
                    for(let i=0; i<data.length; i++){
                        msg.channel.send(JSON.stringify(`${[i+1]}. *${data[i].name}* **${data[i].price}**`, null, 4).replace('"', ''));
                    }
                    //msg.channel.send(JSON.stringify(data, null, 4));
                }).catch(err =>{
                    console.log('error', err);
                })
                break;
        }
        if(msg.content.startsWith(prefix) && !command){
            msg.channel.send(`${msg.author.username}, ${answers[(Math.floor(Math.random()*answers.length))]}`);
        }
        else if(!msg.content.startsWith(prefix) || msg.author.bot)
            return;

        if(msg.content.includes('3080')){
            msg.channel.send('https://i.ytimg.com/vi/BVN9k24KtfM/maxresdefault.jpg');
        }
    })


    client.login(token);
})();