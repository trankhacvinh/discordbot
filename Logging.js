function Logging(clientp) {
    this.client = clientp
}

Logging.prototype.logConnected = function () {
    console.log("Connected as " + this.client.user.tag)
}

Logging.prototype.logServers = function () {
    console.log("Servers:")
    this.client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)
        guild.channels.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
    })
}

Logging.prototype.logMemmbers = function () {
    console.log("Servers and Member:")
    this.client.guilds.forEach((guild) => {
        console.log(" - " + guild.name)

        guild.members.forEach((member) => {
            console.log(`${member.nickname} - ${member.displayName} - ${member.id}`)
        })
    })
}

module.exports = Logging