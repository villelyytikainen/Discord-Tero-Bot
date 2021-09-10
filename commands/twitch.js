const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const Twitch = {
    announced: false,
    advertised: false,

    getToken: async () => {
        const token = await fetch(`https://id.twitch.tv/oauth2/token?client_id=${process.env.TWITCH_CLIENT_ID}&client_secret=${process.env.TWITCH_CLIENT_SECRET}&grant_type=client_credentials`, {
        method: 'POST'
    }).catch(err => console.log(err));

    return token.json();
    },

    checkIfOnline: async () => {
        const stream = await fetch('https://api.twitch.tv/helix/search/channels?query="kuerps"', {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${process.env.TWITCH_TOKEN}`,
                        'Client-Id': `${process.env.TWITCH_CLIENT_ID}`
                    }
                }).then(res => res.json())
    
                return stream.data[0].is_live;
    },

    printStatus: () => {
        const streamUrl = 'https://www.twitch.tv/kuerps';
        const messages = ['Kurppa riimaa, tulkeehaa kahtommaa ositteessee',
                          'Livet tulilla, tulkkeehaa',
                          '']
        return `${messages[Math.floor(Math.random()*messages.length)]} ${streamUrl}`
    }
}


module.exports = Twitch;