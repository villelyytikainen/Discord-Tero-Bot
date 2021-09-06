const fetch = require('node-fetch')

const Twitch = {
    getToken: async () => {
        const token = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
    }).catch(err => console.log(err));

    return token.json();
    }
}


module.exports = Twitch;