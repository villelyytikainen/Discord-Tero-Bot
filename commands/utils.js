const Utils = {
    deleteMessages:(message, amount) =>{
        const userId = message.author.id
        console.log(userId)
        //console.log(message.channel.author.id)
        // if(userId === message.channel.author.id)
        if(amount <= 0 || amount > 100 || isNaN(amount))
            message.reply('Anna poistettavien viestien lukumäärä');
        else{
            Utils.iterateMessages(message)
            console.log('delete')
            message.channel.bulkDelete(amount, true)
            .catch(err => {
                console.log(err);
                message.channel.send('Virhe poistettaessa viestejä');
            });
        }
    },

    iterateMessages:(messages) =>{
        console.log('iterate')
        messages.fetch({limit: 100}.then(msg => {
            console.log(msg)
        }))
    }
}

module.exports = Utils;