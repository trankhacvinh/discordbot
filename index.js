const Discord = require('discord.js')

config = require('./config')
command = require('./Command')

const Logging = require('./Logging')
const MessageEvent = require('./MessageEvent')

const client = new Discord.Client()

var interval_wait_config = null

client.on('ready', () => {

    var log = new Logging(client)
    log.logConnected()
    log.logServers()
    //log.logMemmbers()

    // var generalChannel = client.channels.get(config.channels.general) // Replace with known channel ID
    // generalChannel.send(config.listSourceSubReddit.toString())

})

async function turnOffConfig(id) {
    interval_wait_config = setTimeout(function () {
        config.sourceSubRedditConfig.isConfig = false
        config.sourceSubRedditConfig.channel = ''
        config.sourceSubRedditConfig.step = 0
        var channel = client.channels.get(id)
        channel.send('Kết thúc cấu hình do quá thời gian')
    }, 90000)
}

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user || receivedMessage.author.bot) {
        return
    }
    const hasCommand = MessageEvent.listenCommand(client, receivedMessage);
    if (hasCommand == 0) {
        const mention = MessageEvent.listenMention(client, receivedMessage);

        if (mention == 0) {
            //config.limit.deptrai += 1;
            //receivedMessage.channel.send('now count = ' + config.limit.deptrai)
            MessageEvent.listenAll(client, receivedMessage);
        }
    }
})
client.on('disconnect', () => {

})
client.login(config.token)