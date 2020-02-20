const axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client()
client.login(config.token)

var interval_Ecchi = null

function getEcchiImage() {
    axios.get('https://meme-api.herokuapp.com/gimme/ecchi').then((myJson) => {
        var generalChannel = client.channels.get(config.channels.ecchi)
        const webAttachment = new Discord.Attachment(myJson.data.url)
        generalChannel.send(webAttachment)
    }).catch(function (error) {})
}

function reactToMessage(receivedMessage, emo) {
    receivedMessage.react(emo)
}

function getEmoji(emojiName) {
    const emoji = client.emojis.find(emoji => emoji.name === emojiName);
    return emoji
}

function getMembersMentions(message) {
    var keys = client.users.keys();
    var arr = [];
    for (const k of keys) {
        if (k.length > 5 && message.includes(k)) {
            var user = client.users.get(k)
            arr.push(user)
        }
    }

    return arr
}

module.exports = {
    intervals: {
        ecchi: interval_Ecchi
    },
    getEcchiImage: getEcchiImage,
    reactToMessage: reactToMessage,
    getMembersMentions: getMembersMentions,
    getEmoji: getEmoji
}