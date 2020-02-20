const events = require('./Events')

var trigger = config.triggerCommand || '.'
const listCommand = [
    'help', 'deptrai', 'ecchi on/off'
]

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1) // Remove the leading exclamation mark
    let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
    let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
    let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command

    console.log("Command received: " + primaryCommand)
    console.log("Arguments: " + arguments)

    switch (primaryCommand) {
        case 'help':
            helpCommand(arguments, receivedMessage)
            break
        case 'deptrai':
            deptraiCommand(arguments, receivedMessage)
            break
        case 'ecchi':
            ecchiCommand(arguments, receivedMessage)
            break
        default:
            return 0
    }
    return 1
}

function helpCommand(arguments, receivedMessage) {
    var message = '(づ｡◕‿‿◕｡)づ Các lệnh có sẵn của BOT gồm:\n'
    listCommand.forEach((item) => {
        message += '` ' + `${trigger}${item}` + ' `\n'
    })
    message += '- Ngoài ra bạn vẫn có thể thao tác với BOT bằng cách chat trên kênh hay tag trực tiếp như:\n'
    message += '---- `@tên_iem bé tìm yui hatano`\n'
    message += '---- `@tên_iem thử wiki fate stay night`\n'
    message += '---- `Này @tên_iem, Đỗ Nam Trung là gay có phải không?`\n'
    message += '---- `@tên_iem hát một bài`\n'
    message += '¯\_( ͡° ͜ʖ ͡°)_/¯'
    receivedMessage.channel.send(message)
}

function deptraiCommand(arguments, receivedMessage) {
    var message = receivedMessage.content;
    var mem1 = null
    var mem2 = null
    var members = events.getMembersMentions(message);
    if (members.length > 1) {
        mem1 = members[0]
        mem2 = members[1]
    }

    if (mem1 != null && mem2 != null) {

        config.limit.deptrai += 1;
        if (config.limit.deptrai >= 10) {
            receivedMessage.channel.send(`Hỏi nhiều quá các mẹ. Éo chơi nữa >_<`)
            events.reactToMessage(receivedMessage, "😡")
            config.limit.deptrai = 0;
            return;
        }

        var idDepTrai = '';

        if (mem1.id === config.ids.me || mem2.id === config.ids.me) {
            idDepTrai = config.ids.me
            if (mem1.id === config.ids.bot || mem2.id === config.ids.bot) {
                if (config.limit.deptraiMe < 3) {
                    receivedMessage.channel.send(`<@${idDepTrai}> đẹp trai nhất nhé! Bot chỉ đứng thứ 2 thôi nhé!`)
                    events.reactToMessage(receivedMessage, "🥰")
                    config.limit.deptraiMe += 1
                } else {
                    config.limit.deptraiMe = 0;
                    receivedMessage.channel.send(`Biết kết quả là <@${idDepTrai}> rồi. Hỏi hoài không ngán à? Hỏi lằm hỏi lốn!`)
                    events.reactToMessage(receivedMessage, "🥰")
                }
            } else {
                receivedMessage.react("👎")
                receivedMessage.channel.send(`<@${idDepTrai}> đẹp trai nhất nhé! Hỏi qq nhé!`)
            }
        } else {

            var date = new Date()
            var day = date.getDate()
            if (mem1.id > mem2.id && (day % 2 == 0)) {
                idDepTrai = mem1
            } else {
                idDepTrai = mem2
            }
            receivedMessage.channel.send(`Kết quả : ${idDepTrai} đẹp trai hơn`)
        }
    } else {
        events.reactToMessage(receivedMessage, "👎")
        receivedMessage.channel.send(receivedMessage.author.toString() + ' gì vậy má?')
    }

    return;
}

function ecchiCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        if (arguments[0] == 'on') {
            if (config.ids.me != receivedMessage.author.id) {
                receivedMessage.channel.send("Đáng thất vọng. Ae thật dâm tặc!")
            }
            events.getEcchiImage()
            events.intervals.ecchi = setInterval(() => {
                events.getEcchiImage()
            }, config.interval.ecchi);
        } else if (arguments[0] == 'off') {
            receivedMessage.react("🥰")
            receivedMessage.channel.send("Chúc mừng " + receivedMessage.author.toString() + " đã vượt qua được cửa ải của nhân gian!")
            clearInterval(events.intervals.ecchi)
        }
    }
}


module.exports = {
    process: processCommand
}