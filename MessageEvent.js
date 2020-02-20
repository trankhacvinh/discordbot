const Discord = require('discord.js')
const ResponseText = require('./ReponseText')
const axios = require('axios')

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
                            .setTitle(data.title)
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
                })
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
            if (message.includes('tìm')) {
                var search = message.split('tìm')
                if (search.length < 2)
                    return true
                if (search[1].trim() == '')
                    return true
                var dataparam = search[1].trim()
                if (dataparam != '') {
                    var url = 'https://lmgtfy.com/?q=' + dataparam
                    const embed = new Discord.RichEmbed()
                        .setTitle(url)
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

    return {
        checkWiki: checkWiki,
        googleit: googleit
    }
})()

const Message = (function () {
    function listenAll(client, receivedMessage) {
        try {
            //receivedMessage.channel.send("Hi " + receivedMessage.author.toString() + " sent: " + receivedMessage.content)

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
                    continueListening = MessageModuleUltis.googleit(receivedMessage)
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