const events = require('./Events')
const axios = require('axios')
const ultis = require('./Ultis')

var trigger = config.triggerCommand || '.'
const listCommand = [
    'help', 'deptrai', 'ecchi on/off', 'random soluong dulieu_1 dulieu_2 ...', 'event list', 'ncov'
]

var interval_wait_config = null

function processCommand(receivedMessage) {
    let fullCommand = receivedMessage.content.substr(1).toLowerCase() // Remove the leading exclamation mark
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
        case 'random':
            randomCommand(arguments, receivedMessage)
            break
        case 'event':
            eventCommand(arguments, receivedMessage)
            break
        case 'ncov':
            ncovCommand(arguments, receivedMessage)
            break
        default:
            return 0
    }
    return 1
}

function helpCommand(arguments, receivedMessage) {
    if (arguments.length > 0) {
        if (arguments[0] == 'ecchi') {
            receivedMessage.channel.send('Gõ `.ecchi config start` và làm theo hướng dẫn').then(r => r.delete(10000))
        } else if (arguments[0] == 'random') {
            var message = 'Hiện tại cung cấp những lệnh random sau:\n'
            message += '1. Random 1 số bất kỳ trong khoảng giá trị vd: ngẫu nhiên 1 số trong khoản 5 đến 10 `.random 1 5-10`\n'
            message += '2. Random nhiều số bất kỳ trong khoảng giá trị vd: ngẫu nhiên 3 số trong khoảng 5 đến 10 `.random 3 5-10`\n'
            message += '3. Random 1 giá trị trong danh sách, cách nhau bằng khoảng trắng vd: ngẫu nhiên 1 giá trị `.random 1 bầu cua tôm cá`\n'
            message += '4. Random nhiều giá trị trong danh sách, cách nhau bằng khoảng trắng vd: ngẫu nhiên 3 giá trị `.random 3 bầu cua tôm cá`\n'
            message += '5. Random 1 hay nhiều hero bất kỳ của King\' Raid vd: `.random 1 hero` hay `.random 3 heroes`'
            message += '6. Random 1 hero hay nhiều hero bất kỳ của King\' Raid theo Class vd: `.random 1 hero class archer priest` hay `.random 3 heroes class knight mechanic archer`'
            message += '7. Random 1 hero hay nhiều hero bất kỳ của King\' Raid theo Giới tính vd: `.random 1 hero nam`, `.random 1 hero female` hay `.random 3 heroes nu`, `.random 3 heroes male`'
            message += '8. Random 1 hero hay nhiều hero bất kỳ của King\' Raid theo Giới tính và Class, lưu ý Giới tính trước, Class sau vd: `.random 1 hero nam class archer` hay `.random 3 heroes nu class knight mechanic archer`'
            receivedMessage.channel.send(message).then(r => r.delete(10000))
        }
    } else {
        var message = '(づ｡◕‿‿◕｡)づ Các lệnh có sẵn của BOT gồm:\n'
        listCommand.forEach((item) => {
            message += '` ' + `${trigger}${item}` + ' `\n'
        })
        message += '- Ngoài ra bạn vẫn có thể thao tác với BOT bằng cách chat trên kênh hay tag trực tiếp như:\n'
        message += '---- `@tên_iem bé tìm yui hatano`\n'
        message += '---- `@tên_iem thử wiki fate stay night`\n'
        message += '---- `Này @tên_iem, Đỗ Nam Trung là gay có phải không?`\n'
        message += '---- `@tên_iem hát một bài`\n'
        message += '---- `@tên_iem tìm 2ten bằng cách `xin` bot `2ten` hay đại loại vậy`\n'
        message += '¯\_( ͡° ͜ʖ ͡°)_/¯'
        receivedMessage.channel.send(message)
    }
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

function getEcchiConfig() {
    return `-- Đang cấu hình: ${config.sourceSubRedditConfig.isConfig}\n-- Cấu hình hiện tại:\n---- Thể loại : ${config.sourceSubRedditConfig.theloai}\n---- Nhãn : ${config.sourceSubRedditConfig.nhan}\n---Thời gian : ${config.sourceSubRedditConfig.thoiGian} phút`
}

function getEcchiHelpStep() {
    var step = [
        '`.ecchi theloai real | anime | all ` để chọn loại hình nghệ thuật, vd `.ecchi theloai anime `',
        '`.ecchi nhan 16 | 18 | all ` để chọn độ nặng đô, vd `.ecchi theloai 18 `',
        '`.ecchi list ` sẽ hiện danh sách cac1 tag theo **thể loại** và **nhãn** đã cấu hình',
        '`.ecchi tag on tag_1, tag_2, tag_3, ...` để bật các tag muốn bot sẽ lấy thông tin, các tag phù hợp với **thể loại** và **mức độ** sẽ được ghi nhận, vd `.ecchi tag on ahegao, programing, ngoctrinh `',
        '`.ecchi tag off tag_1, tag_2, tag_3, ...` để tắt các tag muốn bot sẽ lấy thông tin, vd `.ecchi tag off ahegao, programing, ngoctrinh `',
        '`.ecchi tag on all` sẽ bật tất cả tag trong danh sách được cấu hình',
        '`.ecchi tag off all` sẽ tắt tất cả tag trong danh sách được cấu hình',
        '`.ecchi time 5 ` để chọn thời gian đăng.Thời gian ít nhất bạn có thể đặt là 2 phút, vd `.ecchi time 2 `'
    ]
    return step
}

function setEcchiConfig(isConfig, channel) {
    config.sourceSubRedditConfig.isConfig = isConfig
    config.sourceSubRedditConfig.channel = channel
}

async function autoTurnOffConfig(id) {
    interval_wait_config = setTimeout(function () {
        setEcchiConfig(false, '')
        events.sendMessage('Kết thúc cấu hình do hết thời gian quy định', id)
    }, 90000)
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
            }, config.sourceSubRedditConfig.thoiGian * 60000)
        } else if (arguments[0] == 'off') {
            receivedMessage.react("🥰")
            receivedMessage.channel.send("Chúc mừng " + receivedMessage.author.toString() + " đã vượt qua được cửa ải của nhân gian!")
            clearInterval(events.intervals.ecchi)
        } else if (arguments[0] == 'config' && arguments.length == 1) {
            receivedMessage.channel.send(getEcchiConfig()).then(r => r.delete(10000))
            if (config.sourceSubRedditConfig.isConfig == false) {
                receivedMessage.channel.send('Bạn có thể gõ `.ecchi config start` để bắt đầu cấu hình').then(r => r.delete(10000))
            }
        } else if (arguments[0] == 'config' && arguments[1] == 'start') {
            if (config.sourceSubRedditConfig.isConfig == false) {
                receivedMessage.channel.send('Tôi sẽ bắt đầu cấu hình. Xin hãy làm theo hướng dẫn.')
                setEcchiConfig(true, receivedMessage.channel.id)
                autoTurnOffConfig(receivedMessage.channel.id)
                receivedMessage.channel.send(getEcchiConfig()).then(r => r.delete(10000))
                receivedMessage.channel.send('Bạn có thể gõ `.ecchi config stop ` để kết thúc cấu hình')
                receivedMessage.channel.send('-- Hãy gõ các lệnh sau để cấu hình:\n' + getEcchiHelpStep().join('\n'))
                receivedMessage.channel.send('-- Thao tác cấu hình sẽ tự động kết thúc sau 1 khoảng thời gian quy định. Thân ái và quyết thắng!')
            } else {
                receivedMessage.channel.send('Bạn đang cấu hình, xin hãy tiếp tục. Nếu quên vui lòng gõ `.ecchi help`')
            }
        } else if (arguments[0] == 'config' && arguments[1] == 'stop') {
            if (config.sourceSubRedditConfig.channel == receivedMessage.channel.id) {
                try {
                    setEcchiConfig(false, '')
                    receivedMessage.channel.send('Bạn đã ngưng cấu hình!')
                    clearInterval(interval_wait_config)
                } catch (error) {
                    channel.send('Sai cú pháp cấu hình')
                }
            }
        } else if (arguments[0] == 'theloai') {
            if (config.sourceSubRedditConfig.isConfig == true &&
                config.sourceSubRedditConfig.channel == receivedMessage.channel.id) {
                try {
                    if (arguments[1] == 'all' || arguments[1] == 'real' || arguments[1] == 'anime') {
                        config.sourceSubRedditConfig.theloai = arguments[1]
                    }
                } catch (error) {
                    receivedMessage.channel.send('Sai cú pháp cấu hình')
                }
            }
        } else if (arguments[0] == 'nhan') {
            if (config.sourceSubRedditConfig.isConfig == true &&
                config.sourceSubRedditConfig.channel == receivedMessage.channel.id) {
                try {
                    if (arguments[1] == 'all' || arguments[1] == '16' || arguments[1] == '18') {
                        config.sourceSubRedditConfig.nhan = arguments[1]
                    }
                } catch (error) {
                    receivedMessage.channel.send('Sai cú pháp cấu hình')
                }
            }
        } else if (arguments[0] == 'list') {
            var message = getSubRedditListText()
            receivedMessage.channel.send(message)
        } else if (arguments[0] == 'tag' && arguments[1] == 'on') {
            if (config.sourceSubRedditConfig.isConfig == true &&
                config.sourceSubRedditConfig.channel == receivedMessage.channel.id) {
                if (arguments[2] != '') {
                    var resultArray = getSubRedditList()
                    if (arguments[2] == 'all') {
                        for (let j = 0; j < resultArray.length; j++) {
                            resultArray[j].status = 1
                        }
                    } else {
                        var tags = arguments[2].toLowerCase().split(',')
                        if (tags.length > 0) {
                            for (let i = 0; i < tags.length; i++) {
                                const tag = tags[i];
                                for (let j = 0; j < resultArray.length; j++) {
                                    if (resultArray[j].name.toLowerCase() == tag) {
                                        resultArray[j].status = 1
                                        break;
                                    }
                                }
                            }
                        }
                    }
                }
            }
        } else if (arguments[0] == 'tag' && arguments[1] == 'off') {
            if (config.sourceSubRedditConfig.isConfig == true &&
                config.sourceSubRedditConfig.channel == receivedMessage.channel.id) {
                if (arguments[2] != '') {
                    var resultArray = getSubRedditList()
                    if (arguments[2] == 'all') {
                        for (let j = 0; j < resultArray.length; j++) {
                            resultArray[j].status = 0
                        }
                    } else {
                        var tags = arguments[2].toLowerCase().split(',')
                        if (tags.length > 0) {
                            for (let i = 0; i < tags.length; i++) {
                                const tag = tags[i];
                                for (let j = 0; j < resultArray.length; j++) {
                                    if (resultArray[j].name.toLowerCase() == tag) {
                                        resultArray[j].status = 0
                                        break;
                                    }
                                }
                            }

                        }
                    }
                }
            }
        } else if (arguments[0] == 'time') {
            try {
                var time = Number(arguments[1])
                if (time >= 2) {
                    config.sourceSubRedditConfig.thoiGian = time
                }
            } catch (error) {

            }
        } else if (arguments[0] == 'help') {
            receivedMessage.channel.send('Gõ `.ecchi config start ` để bắt đầu cấu hình')
            receivedMessage.channel.send('Gõ `.ecchi config stop ` để kết thúc cấu hình')
            receivedMessage.channel.send('-- Hãy gõ các lệnh sau để cấu hình:\n' + getEcchiHelpStep().join('\n'))
            receivedMessage.channel.send('-- Thao tác cấu hình sẽ tự động kết thúc sau 1 khoảng thời gian quy định. Thân ái và quyết thắng!')
        }
    }
}

function getSubRedditListSource() {
    var sourceArray = []
    if (config.sourceSubRedditConfig.theloai == 'all') {
        sourceArray = [...config.listSourceSubReddit.anime.sub, ...config.listSourceSubReddit.real.sub]
    } else if (config.sourceSubRedditConfig.theloai == 'anime') {
        sourceArray = config.listSourceSubReddit.anime.sub
    } else if (config.sourceSubRedditConfig.theloai == 'real') {
        sourceArray = config.listSourceSubReddit.real.sub
    }
    return sourceArray
}

function getSubRedditList() {
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
        resultArray = sourceArray
    } else {
        resultArray = sourceArray.filter((el) => {
            return el.pg == config.sourceSubRedditConfig.nhan
        })
    }

    return resultArray
}

function getSubRedditListText() {
    var message = ''
    var resultArray = getSubRedditList()
    var message = ''
    if (config.sourceSubRedditConfig.theloai == 'all') {
        message += 'Thể loại: All\n'
    } else if (config.sourceSubRedditConfig.theloai == 'anime') {
        message += 'Thể loại: Hàng anime\n'
    } else if (config.sourceSubRedditConfig.theloai == 'real') {
        message += 'Thể loại: Hàng thật\n'
    }
    if (config.sourceSubRedditConfig.nhan == 'all') {
        message += 'Nhãn: All\n'
    } else if (config.sourceSubRedditConfig.nhan == '16') {
        message += 'Nhãn: 16+\n'
    } else if (config.sourceSubRedditConfig.nhan == '18') {
        message += 'Nhãn: 18+\n'
    }
    message += '-- **Danh sách hiện tại:**\n'
    if (resultArray.length > 0) {
        var count = 0
        resultArray.forEach((el) => {
            var sperate = ''
            if (count % 2 == 0) sperate = '\t\t|\t\t'
            else sperate = '\n'
            var status = el.status == 0 ? '`OFF`' : '**`ON`**'
            message += (count + 1) + '.' + el.name + '\t' + status + sperate
            count += 1
        })
    } else {
        message = '-- Không lấy được danh sách'
    }
    return message
}

function randomCommand(arguments, receivedMessage) {
    try {
        var number = Number(arguments[0])
        if (number > 0) {
            if (arguments.length == 2) {
                if (arguments[1] == 'hero' || arguments[1] == 'heroes') {
                    if (config.kingraid.length > 0) {

                        if (number >= config.kingraid.length) {
                            receivedMessage.channel.send(receivedMessage.author.toString() + ' Có ' + number + ' hero lấy hết làm cái gì???')
                            return
                        }

                        var list = config.kingraid
                        list = ultis.shuffleArray(list)

                        var heroes = {
                            text: '',
                            images: []
                        }
                        var listHeroName = []
                        for (let i = 0; i < number; i++) {
                            listHeroName.push(`**${list[i].name}**(*${list[i].class}*)`)
                            heroes.images.push(list[i].img)
                        }
                        list = []
                        if (listHeroName.length > 0) {
                            heroes.text = 'Kết quả là: ' + listHeroName.join(', ')
                        }
                        listHeroName = []
                        events.sendMessageComplex(heroes, receivedMessage.channel.id)
                    } else {
                        receivedMessage.channel.send(receivedMessage.author.toString() + ' Không lấy được danh sách :(')
                    }
                } else if (arguments[1] == 'class') {
                    if (config.kingraidClass.length > 0) {
                        var arr = JSON.parse(JSON.stringify(config.kingraidClass))
                        arr = ultis.shuffleArray(arr)
                        var arres = []
                        for (let i = 0; i < number; i++) {
                            arres.push(`**${arr[i]}**`)
                        }
                        receivedMessage.channel.send(receivedMessage.author.toString() + ' Kết quả là : ' + arres.join(', '))
                        arr = []
                        message = []
                    }
                } else if (arguments[1].includes('-')) {
                    var splits = arguments[1].split('-')
                    var num1 = Number(splits[0])
                    var num2 = Number(splits[1])
                    if (num1 >= 0 && num2 >= 0) {
                        if (num1 == num2) {
                            receivedMessage.channel.send(`${receivedMessage.author.toString()} 2 số bằng nhau random gì má?`)
                        } else {
                            var resultar = []
                            if (num1 > num2) {
                                for (let i = 0; i < number; i++) {
                                    resultar.push(ultis.randomMinMax(num2, num1, num2))
                                }
                            } else if (num1 < num2) {
                                for (let i = 0; i < number; i++) {
                                    resultar.push(ultis.randomMinMax(num1, num2, num1))
                                }
                            }
                            if (resultar.length > 0) {
                                receivedMessage.channel.send(`${receivedMessage.author.toString()} Kết quả là **${resultar.join(', ')}**`)
                                config.lastRandomCommand = 'random ' + arguments.join(' ')
                            }
                        }
                    }
                }
            } else if (arguments.length > 2) {
                if (arguments[1] == 'hero' || arguments[1] == 'heroes') {
                    if (config.kingraid.length > 0) {

                        if (number >= config.kingraid.length) {
                            receivedMessage.channel.send(receivedMessage.author.toString() + ' Có ' + number + ' hero lấy hết làm cái gì???')
                            return
                        }

                        var list = config.kingraid
                        list = ultis.shuffleArray(list)
                        var classes = []
                        if (arguments[2] == 'nam' || arguments[2] == 'male') {
                            list = list.filter((el) => {
                                return el.gender == 'male'
                            })
                        } else if (arguments[2] == 'nữ' || arguments[2] == 'nu' || arguments[2] == 'female') {
                            list = list.filter((el) => {
                                return el.gender == 'female'
                            })
                        } else if (arguments[2] == 'class' && arguments.length > 3) {
                            classes = arguments
                            classes.splice(0, 3)
                        }
                        if (arguments[3] == 'class' && arguments.length > 4) {
                            classes = arguments
                            classes.splice(0, 4)
                        }
                        if (classes.length > 0) {
                            list = list.filter((el) => {
                                for (let cl in classes) {
                                    if (el.class == classes[cl])
                                        return true
                                }
                                return false
                            })
                        }

                        if (list.length > 0) {
                            var heroes = {
                                text: '',
                                images: []
                            }
                            var listHeroName = []
                            for (let i = 0; i < number; i++) {
                                listHeroName.push(`**${list[i].name}**(*${list[i].class}*)`)
                                heroes.images.push(list[i].img)
                            }
                            list = []
                            if (listHeroName.length > 0) {
                                heroes.text = 'Kết quả là: ' + listHeroName.join(', ')
                            }
                            listHeroName = []
                            events.sendMessageComplex(heroes, receivedMessage.channel.id)
                        } else {
                            receivedMessage.channel.send(receivedMessage.author.toString() + ' Không có hero phù hợp')
                        }
                    } else {
                        receivedMessage.channel.send(receivedMessage.author.toString() + ' Không lấy được danh sách :(')
                    }
                } else {
                    var array = arguments
                    array.shift()
                    array = ultis.shuffleArray(array)
                    var resultar = []
                    if (number >= array.length) {
                        receivedMessage.channel.send(`${receivedMessage.author.toString()} Có ${array.length} lấy ${number} thì random gì má?`)
                    } else {
                        for (let i = 0; i < number; i++) {
                            resultar.push(array[i])
                        }
                        if (resultar.length > 0) {
                            receivedMessage.channel.send(`${receivedMessage.author.toString()} Kết quả là **${resultar.join(', ')}**`)
                            config.lastRandomCommand = 'random ' + arguments.join(' ')
                        }
                    }
                }
            }
        }
    } catch (error) {
        receivedMessage.channel.send(receivedMessage.author.toString() + ' Ae random cái qq gì vậy??')
    }
}

function convertStatus(stt) {
    switch (stt) {
        case 'live':
            return 'Đang diễn ra'
        case 'open':
            return 'Đang mở'
        case 'close':
            return 'Đã đóng'
        default:
            return ''
    }
}

function eventCommand(arguments, receivedMessage) {
    try {
        if (arguments[0] == 'list') {
            var message = ''
            var count = 1
            if (config.events.length > 0) {
                var arr = config.events
                arr.reverse()
                arr.forEach((el) => {
                    message += `${count}. ${el.name}\t\t**${convertStatus(el.status)}**\t\tID: **${el.id}**\n`
                    count += 1
                })
                receivedMessage.channel.send(`${receivedMessage.author.toString()} Danh sách sự kiện:\nTrạng thái gồm: **open** (Đang mở) | **live** (Đang diễn ra) | **close** (Đã đóng)\n${message}`)
            } else {
                receivedMessage.channel.send(`${receivedMessage.author.toString()} Hiện chưa có sự kiện nào trong danh sách`)
            }
        } else if (arguments[0] == 'add') {
            arguments.shift()
            var eventName = arguments.join(' ')
            var id = new Date().getTime()
            config.events.push({
                id: id,
                name: eventName,
                status: 'open'
            })
        } else if (arguments[0] == 'set') {
            if (config.events.length > 0) {
                var events = config.events.filter((el) => {
                    return el.id == arguments[1]
                })
                if (events.length > 0) {
                    var event = events[0]
                    if (arguments[2] == 'open') {
                        event.status = 'open'
                    } else if (arguments[2] == 'live') {
                        event.status = 'live'
                    } else if (arguments[2] == 'close') {
                        event.status = 'close'
                    }
                    receivedMessage.channel.send(`${receivedMessage.author.toString()} Sự kiện:\n${event.name}\t**${event.status}**\tID: ${event.id}`)
                } else {
                    receivedMessage.channel.send(`${receivedMessage.author.toString()} Không tìm thấy sự kiện có ID phù hợp, hãy xem lại ID trong danh sách`)
                }
            } else {
                receivedMessage.channel.send(`${receivedMessage.author.toString()} Hiện chưa có sự kiện nào trong danh sách`)
            }
        } else if (arguments[0] == 'remove') {
            if (receivedMessage.author.id != config.ids.me) {
                receivedMessage.channel.send(`${receivedMessage.author.toString()} Mòe mới được xóa <@${config.ids.me}>`)
            } else {
                if (config.events.length > 0) {
                    var events = config.events.filter((el) => {
                        return el.id == arguments[1]
                    })
                    if (events.length > 0) {
                        var event = events[0]
                        config.events = config.events.filter(x => x.id !== event.id)
                        receivedMessage.channel.send(`${receivedMessage.author.toString()} Sự kiện:\n${event.name}, ID: ${event.id} đã bị xóa`)
                    } else {
                        receivedMessage.channel.send(`${receivedMessage.author.toString()} Không tìm thấy sự kiện có ID phù hợp, hãy xem lại ID trong danh sách`)
                    }
                } else {
                    receivedMessage.channel.send(`${receivedMessage.author.toString()} Hiện chưa có sự kiện nào trong danh sách`)
                }
            }
        } else if (arguments[0] == 'fixid') {
            var events = config.events.filter((el) => {
                return el.id.trim() == ''
            })
            events.forEach((el) => {
                el.id = new Date().getTime()
            })
        }
    } catch (error) {

    }
}

function ncovCommand(arguments, receivedMessage) {
    var url = 'https://tygia.com/app/covid-19/api.json?type=2'
    axios.get(url).then((response) => {
        var data = response.data.items
        var message = 'Tình hình NCOV trên thế giới toàn bộ như sau: (Top 20)\n'
        var count = 0;
        for (let i = 0; i <= 20; i++) {
            const el = data[i]
            if (i == 0) el.type = 'Thế giới'
            message += `**${el.type}**\t\t\t\t\t\tTrường hợp: **${el.total}**\t\tChết: **${el.death}**\t\tHồi phục: **${el.recovered}**\n`
        }
        receivedMessage.channel.send(receivedMessage.author.toString() + ' ' + message)
    }).catch(() => {
        receivedMessage.channel.send(receivedMessage.author.toString() + ' Không cập nhật được :(')
    })
}

module.exports = {
    process: processCommand
}