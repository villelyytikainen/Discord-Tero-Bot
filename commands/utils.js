

module.exports = {
    name: 'deletemessages',
    description: 'Delete messages',
    option: [
        {
            name: 'amount',
            description: 'amount of messages to delete',
            type: Number,
            required: true,
        },
    ],
};