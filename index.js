const Discord = require('discord.js')

config = require('./config')
command = require('./Command')

const Logging = require('./Logging')
const MessageEvent = require('./MessageEvent')

const client = new Discord.Client()

client.on('ready', () => {

    var log = new Logging(client)
    log.logConnected();
    log.logServers();
})

client.on('message', (receivedMessage) => {
    if (receivedMessage.author == client.user) {
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
    var generalChannel = client.channels.get(config.channels.general)
    generalChannel.send('BOT is đi ngủ (。-ω-)zzz…')
})
client.login(config.token)