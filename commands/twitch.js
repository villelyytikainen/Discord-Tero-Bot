const fetch = require('node-fetch')

const Twitch = {
    announced: false,

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

    printStatus: (status) => {
        if(status && !announced){
            return 'Yes'
        }
        else{
            return 'No'
        }
        this.announced = true;
    }
}


module.exports = Twitch;