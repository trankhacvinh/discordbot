const Discord = require('discord.js')
const ResponseText = require('./ReponseText')
const axios = require('axios')
const TenTen = require('./TenTen')
const nHentaiAPI = require('nhentai-api-js')
let api = new nHentaiAPI()


const MessageModuleUltis = (function () {
    function checkWiki(receivedMessage) {
        try {
            var message = receivedMessage.content.toLowerCase()
            if (message.includes('wiki')) {
                var search = message.split('wiki')
                if (search.length < 2)
                    return true
                if (search[1].trim() == '')
                    return true
                var dataparam = search[1].trim()
                var url = "https://en.wikipedia.org/api/rest_v1/page/summary/" + encodeURI(dataparam)

                axios.get(url).then((response) => {
                        //receivedMessage.channel.send(response.data)
                        var data = response.data

                        if (data.title == 'Not found.') {
                            receivedMessage.channel.send('Không thấy', {
                                file: 'https://i.imgur.com/0oxGctj.png'
                            })
                        } else {
                            var image = ''
                            if (data.originalimage != null) {
                                image = data.originalimage.source
                            }

                            var extract = data.extract
                            if (extract.length > 1800) {
                                extract = extract.substring(0, 1800) + '...'
                            }

                            if (extract != '') {
                                receivedMessage.channel.send(receivedMessage.author.toString() + ' Kết quả tìm WiKiPeDiA cho `' + dataparam + '` nè:')
                                const embed = new Discord.RichEmbed()
                                    .setTitle(`${data.title}`)
                                    .setAuthor('')
                                    .setColor(0x00AE86)
                                    .setDescription(extract)
                                    .setFooter("Bot chỉ phục vụ mục đích nhân đạo", "https://i.imgur.com/Oqr0kHs.jpg")
                                    .setImage(image)
                                    .setThumbnail(image)
                                    .setTimestamp()
                                    .setURL(data.content_urls.desktop.page)
                                receivedMessage.channel.send({
                                    embed
                                })
                            }
                        }
                    })
                    .catch(function (error) {
                        receivedMessage.channel.send('Không thấy', {
                            file: 'https://i.imgur.com/0oxGctj.png'
                        })
                    })
                    .then(function () {})
                return false
            }
            return true
        } catch (error) {
            receivedMessage.channel.send(error.toString())
            receivedMessage.channel.send('Hi ' + receivedMessage.author.toString() + '\n' +
                'Tìm wiki thì tag iem vô rồi ghi chính xác hộ cái nha `@tên_iem *xin xỏ năn nỉ* wiki **nội dung cần tìm**`' + '\n' +
                'Ví dụ: @tên_iem wiki jav')
            return true
        }
    }

    function googleit(receivedMessage) {
        try {
            var message = receivedMessage.content.toLowerCase()
            if (message.includes('tìm cho'))
                return true
            if (message.includes('tìm')) {
                var search = message.split('tìm')
                if (search.length < 2)
                    return true
                if (search[1].trim() == '')
                    return true
                var dataparam = search[1].trim()
                if (dataparam != '') {
                    var url = 'https://lmgtfy.com/?q=' + encodeURI(dataparam)
                    const embed = new Discord.RichEmbed()
                        .setTitle(`${url}`)
                        .setColor(0x00AE86)
                        .setTimestamp()
                        .setURL(url)
                    receivedMessage.channel.send({
                        embed
                    })
                    return false
                }
            }
            return true
        } catch (error) {
            return true
        }

    }

    function ncovStatus(receivedMessage) {
        try {
            var message = receivedMessage.content.toLowerCase()
            if ((message.includes('tình hình') || message.includes('diễn tiến') || message.includes('diễn biến') ||
                    message.includes('tình trạng')) && (message.includes('ncov') || message.includes('corona') || message.includes('covid'))) {

                var url = 'https://tygia.com/app/covid-19/api.json?type=2'
                axios.get(url).then((response) => {
                    var data = response.data.items

                    if (config.ncovdata == null) {
                        config.ncovdata = data
                    } else {
                        if (config.ncovdata[0].total != data[0].total) {
                            config.ncovdata = data
                        }
                    }
                    var items = {}
                    var responseMessage = 'Tình hình dịch của'
                    if (message.includes('hàn quốc') || message.includes('hàn') ||
                        message.includes('chim ngắm')) {
                        items = config.ncovdata.filter((el) => {
                            return el.type == 's.korea'
                        })
                        responseMessage += ' Hàn Quốc hiện tại là:\n'
                    } else if (message.includes('trung quốc') || message.includes('tàu') || message.includes('khựa')) {
                        items = config.ncovdata.filter((el) => {
                            return el.type == 'china'
                        })
                        responseMessage += ' Trung Quốc hiện tại là:\n'
                    } else if (message.includes('italy')) {
                        items = config.ncovdata.filter((el) => {
                            return el.type == 'italy'
                        })
                        responseMessage += ' Italy hiện tại là:\n'
                    } else if (message.includes('iran')) {
                        items = config.ncovdata.filter((el) => {
                            return el.type == 'iran'
                        })
                        responseMessage += ' Iran hiện tại là:\n'
                    } else if (respomessagenseMessage.includes('japan') || message.includes('nhật') || message.includes('nhật bản')) {
                        items = config.ncovdata.filter((el) => {
                            return el.type == 'japan'
                        })
                        responseMessage += ' Nhật Bản hiện tại là:\n'
                    } else if (message.includes('sing') || message.includes('singapore')) {
                        items = config.ncovdata.filter((el) => {
                            return el.type == 'singapore'
                        })
                        responseMessage += ' Singapore hiện tại là:\n'
                    } else {
                        responseMessage += ' thế giới hiện tại là:\n'
                    }
                    var result = {}
                    if (items.length > 0) {
                        result = items[0]
                    } else {
                        result = data[0]
                    }
                    responseMessage += `Có tổng cộng **${result.total}** ca, chết **${result.death}** ca, bình phục là **${result.recovered}** ca.`
                    if (result.changed.total > 0) {
                        responseMessage += `So với hôm qua thì đã tăng thêm **${result.changed.total}** ca`
                        if (result.changed.death > 0) {
                            responseMessage += ` và số người tử vong tăng thêm **${result.changed.death}** ca`
                        }
                        if (result.changed.recovered > 0) {
                            responseMessage += `. Số người bình phục tăng thêm **${result.changed.recovered}** ca.`
                            if (result.changed.recovered > 500) {
                                responseMessage += ' Đây quả thực là một tín hiệu đáng mừng. Hy vọng dịch sẽ mau chấm dứt.'
                            }
                        }
                    }

                    receivedMessage.channel.send(receivedMessage.author.toString() + ' ' + responseMessage)
                }).catch(() => {
                    receivedMessage.channel.send(receivedMessage.author.toString() + ' Không cập nhật được :(')
                })

                return false
            }
        } catch (error) {
            return true
        }


    }

    return {
        checkWiki: checkWiki,
        googleit: googleit,
        checkNcov: ncovStatus
    }
})()

const Message = (function () {
    function listenAll(client, receivedMessage) {
        try {
            //receivedMessage.channel.send("Hi " + receivedMessage.author.toString() + " sent: " + receivedMessage.content)

            var arr = ResponseText.phanHoiDuaTrenTinNhan(receivedMessage)
            if (arr.length) {
                var reacted = false;
                for (let index = 0; index < arr.length; index++) {
                    const element = arr[index]
                    if (reacted == false && element.react == true && element.react.emo != '') {
                        receivedMessage.react(element.emo)
                        reacted = true;
                    }
                    if (element.type == 'text') {
                        receivedMessage.channel.send(receivedMessage.author.toString() + ' ' + element.text)
                    } else if (element.type == 'image') {
                        receivedMessage.channel.send('', {
                            file: element.text
                        })
                    } else if (element.type == 'tag') {
                        if (element.userId != '') {
                            receivedMessage.channel.send(`<@${element.userId}> Có người nhắc kìa\n`)
                            receivedMessage.channel.send("```" + receivedMessage.content + "```")
                        }
                    }
                }
            }

            return 1
        } catch (e) {
            console.log(e)
            return -1
        }
    }

    function listenCommand(client, receivedMessage) {
        try {
            if (receivedMessage.content.startsWith(config.triggerCommand)) {
                var process = command.process(receivedMessage)
                if (process == 0) {
                    receivedMessage.channel.send(receivedMessage.author.toString() +
                        " Không hiểu? @@ ae làm trò gì vậy?")
                    return 1
                }
            }
            return 0
        } catch (e) {
            console.log(e)
            return -1
        }
    }

    function listenMention(client, receivedMessage) {
        try {
            if (receivedMessage.content.includes(client.user.id.toString())) {
                //config.limit.deptrai += 1
                //receivedMessage.channel.send('you tag me, count = ' + config.limit.deptrai)

                var continueListening = true
                while (continueListening) {
                    continueListening = MessageModuleUltis.checkWiki(receivedMessage)
                    if (continueListening == false) break
                    // continueListening = MessageModuleUltis.googleit(receivedMessage)
                    // if (continueListening == false) break
                    continueListening = MessageModuleUltis.checkNcov(receivedMessage)
                    if (continueListening == false) break

                    try {
                        var message = receivedMessage.content.toLowerCase()
                        if (
                            (message.includes('ev') || message.includes('event') ||
                                message.includes('sự kiện')) &&
                            (message.includes('đang diễn ra') || message.includes('bây giờ') ||
                                message.includes('hiện tại') || message.includes('hiện có') ||
                                message.includes('mới nhất') || message.includes('gần đây'))
                        ) {
                            if (config.events.length > 0) {
                                var responseMessage = ''

                                if (message.includes('đang diễn ra') || message.includes('bây giờ')) {
                                    var nowLives = config.events.filter((el) => {
                                        el.status == 'live'
                                    })
                                    if (nowLives.length > 0) {
                                        responseMessage += 'Sự kiện đang diễn ra là: '
                                        responseMessage += nowLives.map(function (elem) {
                                            return `**${elem.name}**`;
                                        }).join(', ')
                                    }
                                } else
                                if (message.includes('hiện tại') || message.includes('hiện có')) {
                                    var nowLives = config.events.filter((el) => {
                                        el.status == 'live'
                                    })
                                    var nowHaves = config.events.filter((el) => {
                                        el.status == 'open'
                                    })
                                    if (nowLives.length > 0) {
                                        responseMessage += 'Sự kiện đang diễn ra là: '
                                        responseMessage += nowLives.map(function (elem) {
                                            return `**${elem.name}**`;
                                        }).join(', ')
                                        message += '\n'
                                    }
                                    if (nowHaves.length > 0) {
                                        responseMessage += 'Sự kiện hiện có chưa diễn ra: '
                                        responseMessage += nowHaves.map(function (elem) {
                                            return `**${elem.name}**`;
                                        }).join(', ')
                                    }
                                } else if (message.includes('mới nhất') || message.includes('gần đây')) {
                                    var nowLives = config.events.filter((el) => {
                                        el.status == 'live'
                                    })
                                    var nowHaves = config.events.filter((el) => {
                                        el.status == 'open'
                                    })
                                    if (nowLives.length > 0) {
                                        responseMessage += 'Sự kiện gần nhất đang diễn ra là: '
                                        responseMessage += `**${nowLives[nowLives.length].name}**`
                                    } else if (nowHaves.length > 0) {
                                        responseMessage += 'Sự kiện gần nhất hiện có là: '
                                        responseMessage += `**${nowHaves[nowHaves.length].name}**`
                                    }
                                }
                                if (message != '')
                                    receivedMessage.channel.send(`${receivedMessage.author.toString()} ${responseMessage}`)
                            } else {
                                receivedMessage.channel.send(`${receivedMessage.author.toString()} Hiện chưa tổ chức sự kiện nào!`)
                            }
                        }
                    } catch (error) {

                    }

                    var arr = ResponseText.phanHoiDuaTrenTinNhanTag(receivedMessage.content)
                    if (arr.length) {
                        var reacted = false
                        for (let index = 0; index < arr.length; index++) {
                            const element = arr[index]

                            if (reacted == false && element.react == true && element.react.emo != '') {
                                receivedMessage.react(element.emo)
                                reacted = true
                            }

                            if (element.type == 'text') {
                                if (index == 0)
                                    receivedMessage.channel.send(receivedMessage.author.toString() + ' ' + element.text)
                                else
                                    receivedMessage.channel.send(element.text)
                            } else if (element.type == 'image') {
                                receivedMessage.channel.send('', {
                                    file: element.text
                                })
                            } else if (element.type == 'tag') {
                                if (element.text != '') {
                                    receivedMessage.channel.send(receivedMessage.author.toString() + ' ' + element.text)
                                } else {
                                    if (element.userId != '') {
                                        receivedMessage.channel.send(`<@${config.ids.me}> ????\n`)
                                        receivedMessage.channel.send("```" + receivedMessage.content + "```")
                                    }
                                }
                            } else if (element.type == 'tenten') {
                                if (element.text == '') {
                                    TenTen.random().then(data => {
                                        api.g(data.id).then(gallery => {
                                            //var embed = buildTentenEmbed(gallery)
                                            console.log("OK GO")
                                            var thumb = gallery.getPagesThumbnail()[1] || ''
                                            var cover = gallery.getCover()
                                            var title = gallery.title.pretty
                                            var author = gallery.tags.filter((el) => {
                                                return el.type == 'artist'
                                            })[0] || {
                                                name: '',
                                                url: '',
                                                count: 0
                                            }
                                            var url = `https://nhentai.net/g/${gallery.id}`
                                            var engtitle = ''
                                            var japtitle = ''
                                            if (gallery.title.english != '') {
                                                engtitle = gallery.title.english
                                            }
                                            if (gallery.title.japanese != '') {
                                                japtitle = gallery.title.japanese
                                            }
                                            var description = '**Tags**:\n'
                                            gallery.tags.forEach((el) => {
                                                if (el.type == 'tag')
                                                    description += ` **${el.name}** (${el.count}); `
                                            })
                                            if (description.length > 1800)
                                                description = description.substring(0, 1800) + '....'

                                            const embed = new Discord.RichEmbed()
                                                .setTitle(`${title}`)
                                                .setAuthor(`Tác giả ${author.name} (${author.count})`, '') //author.url
                                                .setColor(0x00AE86)
                                                .setDescription(`${description}`)
                                                .setFooter(`BOT phục vụ mục đích làm nhóm lớn mạnh`, `https://i.imgur.com/Oqr0kHs.jpg`)
                                                .setImage(`${cover}`)
                                                .setThumbnail(`${thumb}`)
                                                .setTimestamp()
                                                .setURL(`${url}`)
                                                .addField('*English* : ', `${engtitle}`)
                                                .addField('*Japanese* : ', `${japtitle}`)

                                            receivedMessage.channel.send({
                                                embed
                                            })
                                        })
                                    })
                                } else {
                                    var number = Number(element.text)
                                    api.g(number).then(gallery => {
                                        //var embed = buildTentenEmbed(gallery)
                                        console.log("OK GO Find : " + number)
                                        var thumb = gallery.getPagesThumbnail()[1] || ''
                                        var cover = gallery.getCover()
                                        var title = gallery.title.pretty
                                        var author = gallery.tags.filter((el) => {
                                            return el.type == 'artist'
                                        })[0] || {
                                            name: '',
                                            url: '',
                                            count: 0
                                        }
                                        var url = `https://nhentai.net/g/${gallery.id}`
                                        var engtitle = ''
                                        var japtitle = ''
                                        if (gallery.title.english != '') {
                                            engtitle = gallery.title.english
                                        }
                                        if (gallery.title.japanese != '') {
                                            japtitle = gallery.title.japanese
                                        }
                                        var description = '**Tags**:\n'
                                        gallery.tags.forEach((el) => {
                                            if (el.type == 'tag')
                                                description += ` **${el.name}** (${el.count}); `
                                        })
                                        if (description.length > 1800)
                                            description = description.substring(0, 1800) + '....'

                                        const embed = new Discord.RichEmbed()
                                            .setTitle(`${title}`)
                                            .setAuthor(`Tác giả ${author.name} (${author.count})`, '') //author.url
                                            .setColor(0x00AE86)
                                            .setDescription(`${description}`)
                                            .setFooter(`BOT phục vụ mục đích làm nhóm lớn mạnh`, `https://i.imgur.com/Oqr0kHs.jpg`)
                                            .setImage(`${cover}`)
                                            .setThumbnail(`${thumb}`)
                                            .setTimestamp()
                                            .setURL(`${url}`)
                                            .addField('*English* : ', `${engtitle}`)
                                            .addField('*Japanese* : ', `${japtitle}`)

                                        receivedMessage.channel.send({
                                            embed
                                        })
                                    })
                                }

                                continueListening = false
                                break
                            }
                        }
                        break
                    }

                    continueListening = false

                    var khongPhanUng = ResponseText.khongPhanUng()
                    if (khongPhanUng != '')
                        receivedMessage.channel.send(khongPhanUng)
                }

                return 1
            }

            return 0
        } catch (e) {
            console.log(e)
            return -1
        }
    }

    function buildTentenEmbed(gallery) {
        var title = gallery.title.pretty
        var thumb = gallery.getPagesThumbnail()[0]
        var cover = gallery.getCover()
        var author = gallery.tags.filter((el) => {
            return el.type == 'artist'
        })[0] || {
            name: '',
            url: '',
            count: 0
        }
        var url = `https://nhentai.net/g/${gallery.id}`
        var engtitle = ''
        var japtitle = ''
        if (gallery.title.english != '') {
            engtitle = 'Eng: ' + gallery.title.english
        }
        if (gallery.title.japanese != '') {
            japtitle = 'Jap: ' + gallery.title.japanese
        }
        var description = ''
        gallery.tags.forEach((el) => {
            if (el.type == 'tag')
                description += `${el.type}: ${el.name} (${el.count})\n`
        })
        console.log(description)
        const embed = new Discord.RichEmbed()
            .setTitle(title)
            .setAuthor(author.name + '(' + author.count + ')', author.url)
            .setColor(0x00AE86)
            .setDescription(description)
            .setFooter("BOT phục vụ mục đích làm nhóm lớn mạnh", "https://i.imgur.com/Oqr0kHs.jpg")
            .setImage(cover)
            .setThumbnail(thumb)
            .setTimestamp()
            .setURL(url)
            .addField('English :', engtitle)
            .addField('Japanese', japtitle, true)

        return embed
    }

    function noiNgauNhienVaiCau(rand, ...client) {
        var generalChannel = client[0].channels.get(config.channels.general)
        generalChannel.send('Now is ' + (new Date().getSeconds()) + ' . I will text in ' + rand + ' seconds.')
    }

    function repeat(func, ...data) {
        var myFunction = function () {
            var rand = Math.round(Math.random() * (10000 - 5000)) + 5000
            console.log('time = ' + rand)
            func(rand, ...data)
            setTimeout(myFunction, rand)
        }
        myFunction()
    }

    return {
        listenCommand: listenCommand,
        listenMention: listenMention,
        listenAll: listenAll,
        noiNgauNhienVaiCau: noiNgauNhienVaiCau,
        repeat: repeat
    }
})()

module.exports = Message