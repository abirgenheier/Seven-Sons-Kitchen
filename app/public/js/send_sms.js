require('dotenv').config();
const accountSid = 'AC56aac44cb3124673107ee926543dfecf';
const authToken = process.env.TWILIOPASS;
const client = require('twilio')(accountSid, authToken);

client.messages
    .create({
        body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
        from: '+15017122661',
        to: '+15558675310'
    })
    .then(message => console.log(message.sid));


