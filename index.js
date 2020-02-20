const Discord = require('discord.js')

config = require('./config')
command = require('./Command')

const Logging = require('./Logging')
const MessageEvent = require('./MessageEvent')

const client = new Discord.Client()

client.on('ready', () => {

    var log = new Logging(client)
    log.logConnected()
    //log.logServers()
    //log.logMemmbers()
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user || receivedMessage.author.bot) {
        return
    }

    //Xu ly theo gio giac

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