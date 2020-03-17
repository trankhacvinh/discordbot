const axios = require('axios')
const Discord = require('discord.js')
const client = new Discord.Client()
const Ultis = require('./Ultis')
client.login(config.token)

var interval_Ecchi = null

function getSubRedditListOn() {
    var sourceArray = []
    var resultArray = []
    if (config.sourceSubRedditConfig.theloai == 'all') {
        sourceArray = [...config.listSourceSubReddit.anime.sub, ...config.listSourceSubReddit.real.sub]
    } else if (config.sourceSubRedditConfig.theloai == 'anime') {
        sourceArray = config.listSourceSubReddit.anime.sub
    } else if (config.sourceSubRedditConfig.theloai == 'real') {
        sourceArray = config.listSourceSubReddit.real.sub
    }
    if (config.sourceSubRedditConfig.nhan == 'all') {
        resultArray = sourceArray.filter((el) => {
            return el.status == 1
        })
    } else {
        resultArray = sourceArray.filter((el) => {
            return el.pg == config.sourceSubRedditConfig.nhan && el.status == 1
        })
    }

    return resultArray
}

async function getEcchiImage() {

    var listLink = getSubRedditListOn()

    if (listLink.length > 0) {
        var max = 3
        var res = Ultis.randomArray(listLink)
        var link = `https://meme-api.herokuapp.com/gimme/${res.name}`
        for (let index = 0; index < max; index++) {
            setTimeout(() => {
                axios.get(link).then((myJson) => {
                    var generalChannel = client.channels.get(config.channels.ecchi)
                    const webAttachment = new Discord.Attachment(myJson.data.url)
                    generalChannel.send(webAttachment)
                }).catch(function (error) {
                    console.log('CANT sent img to channel ERROR: ' + error)
                })
            }, 1000)
        }
    }
}

function reactToMessage(receivedMessage, emo) {
    receivedMessage.react(emo)
}

function getEmoji(emojiName) {
    const emoji = client.emojis.find(emoji => emoji.name === emojiName);
    return emoji
}

function sendMessage(message, channelId) {
    var channel = client.channels.get(channelId)
    channel.send(message)
}

function sendMessageComplex(messageObject, channelId) {
    try {
        var channel = client.channels.get(channelId)
        if (messageObject.text != '') {
            channel.send(messageObject.text)
        }
        if (messageObject.images.length > 0) {
            messageObject.images.forEach(element => {
                const webAttachment = new Discord.Attachment(element)
                channel.send(webAttachment)
            })
        }
    } catch (error) {}
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
    getEmoji: getEmoji,
    sendMessage: sendMessage,
    sendMessageComplex: sendMessageComplex
}