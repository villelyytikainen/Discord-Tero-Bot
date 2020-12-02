function deleteMessages(message, amount){
    message.channel.bulkDelete(amount, true).catch(err => {
        console.log(err);
        message.channel.send('virhe poistettaessa viestejä');
    });
}

module.exports = deleteMessages;