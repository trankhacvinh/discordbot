const Ultis = require('./Ultis')
var khongPhanUngData = [
    '....', 'Xin để em bình yên',
    'Hmm...', 'UwU', 'UmU', '(´＿｀。)'
]

var sleepingData = [
    '( > . < ) zzZ',
    '(。-ω - ) zzz…',
    ':sleeping: :sleeping: :sleeping:'
]

var khoChiuData = [
    'Tag lằm tag lốn', '凸ಠ益ಠ)凸', 'bớt tag giùm', ':face_with_symbols_over_mouth:',
    ':rage:'
]

var khoChiuEmoData = ['😤', '😡', '🤬']

var memePepeData = [{
        type: 'yes',
        link: 'https://i.imgur.com/2ST4m28.png'
    },
    {
        type: 'yes',
        link: 'https://i.imgur.com/ccZaEbF.png'
    },
    {
        type: 'yes',
        link: 'https://i.imgur.com/okgiSQc.png',
    }, {
        type: 'yes',
        link: 'https://i.imgur.com/MShOXoy.png'
    },
    {
        type: 'no',
        link: 'https://i.imgur.com/vFTBFNG.gif'
    },
    {
        type: 'no',
        link: 'https://i.imgur.com/IsuL4cu.png'
    },
    {
        type: 'no',
        link: 'https://i.imgur.com/qqNkq6W.gif'
    }
]

var shouldResponse = [{
    type: 'yes',
    text: 'Nên nhé'
}, {
    type: 'yes',
    text: 'Quẩy đi'
}, {
    type: 'yes',
    text: 'Ok nhé'
}, {
    type: 'yes',
    text: 'Cứ mạnh dạn quất'
}, {
    type: 'no',
    text: 'Khuyên thật bỏ đi mà làm ngườI'
}, {
    type: 'no',
    text: 'Xin đừng'
}, {
    type: 'no',
    text: 'Không nên nhé'
}, {
    type: 'no',
    text: 'Đừng nhé'
}]

var yesNoResponse = [{
        type: 'yes',
        text: 'Chuẩn nhé'
    }, {
        type: 'yes',
        text: 'Ok'
    },
    {
        type: 'yes',
        text: 'Đúng nhé'
    },
    {
        type: 'yes',
        text: 'Quá hợp lý'
    },
    {
        type: 'yes',
        text: 'Còn phải hỏi'
    },
    {
        type: 'yes',
        text: 'Toẹt vời'
    },
    {
        type: 'no',
        text: 'Sai nhé'
    }, {
        type: 'no',
        text: '96,69% sai nhé'
    }, {
        type: 'no',
        text: 'Sai rõ ràng nhé'
    }, {
        type: 'none',
        text: 'Không ý kiến'
    }, {
        type: 'none',
        text: 'Ai biết?'
    }, {
        type: 'none',
        text: '¯\_( ͡° ͜ʖ ͡°)_/¯'
    }, {
        type: 'none',
        text: 'Chịu thôi'
    }
]

var emoReactData = [{
        type: 'good',
        text: '👌'
    }, {
        type: 'good',
        text: '🤞'
    }, {
        type: 'good',
        text: '👍'
    }, {
        type: 'good',
        text: '👏'
    }, {
        type: 'good',
        text: '😘'
    }, {
        type: 'good',
        text: '😄'
    }, {
        type: 'bad',
        text: '😤'
    }, {
        type: 'bad',
        text: '😡'
    }, {
        type: 'bad',
        text: '😠'
    }, {
        type: 'bad',
        text: '🤬'
    },
    {
        type: 'bad',
        text: '👎'
    }
]

const ResponseText = (function () {

    function generateResponseJson(type, text, react, emo, userid) {
        return {
            type: type,
            text: text,
            react: react,
            emo: emo,
            userId: userid
        }
    }

    function khongPhanUng() {
        var traLoi = Ultis.randomPercent(0.5)
        if (traLoi) {
            var hour = new Date().getHours();
            if (hour < 23 && hour > 5) {
                var text = Ultis.randomArray(khongPhanUngData)
                return text
            } else {
                var text = Ultis.randomArray(sleepingData)
                return text
            }
        }
        return ''
    }

    function phanHoiDuaTrenTinNhan(receivedMessage) {
        var message = receivedMessage.content
        var arr = []

        if (config.limit.readingText == 10) {
            config.limit.readingTagText += 1
            return arr
        } else {
            if (config.limit.readingText > 15)
                config.limit.readingText = Ultis.randomMinMax(0, 5, 0)
        }

        var message = message.toLowerCase()
        if (message.includes('solo')) {
            arr.push(generateResponseJson('text', 'Tuổi gì solo yasuo với em', false, ''))
            return arr
        }
        if (message.includes('bot') && (message.includes('ngu') || message.includes('cùi'))) {
            arr.push(generateResponseJson('text', 'Anh em hổ báo, làm kèo solo không???', false, ''))
            arr.push(generateResponseJson('image', 'https://i.imgur.com/zSPN6nU.png', false, ''))
            return arr
        }
        if (message.includes('bot') && (message.includes('xấu trai') || message.includes('xấu'))) {
            arr.push(generateResponseJson('text', 'Anh em nói Bot xấu á? Solo yasuo không?', true, '😂'))
            arr.push(generateResponseJson('image', 'https://i.imgur.com/Ttf7tNK.png', false, ''))

            return arr
        }

        if ((message.includes('mòe') || message.includes('moè')) && receivedMessage.author.id != config.ids.me) {
            var traLoi = Ultis.randomPercent(0.7)
            if (traLoi) {
                arr.push(generateResponseJson('tag', '', false, '', config.ids.me))
                return arr
            }
        }
        if ((message.includes('nhái') || message.includes('nhaí')) && receivedMessage.author.id != config.ids.chuGuild) {
            var traLoi = Ultis.randomPercent(0.7)
            if (traLoi) {
                arr.push(generateResponseJson('tag', '', false, '', config.ids.chuGuild))
                return arr
            }
        }

        config.limit.readingText += 1
        return arr
    }

    function phanHoiDuaTrenTinNhanTag(message) {

        try {
            var arr = []

            var message = message.toLowerCase()
            if (message.length < 50) {
                if (message.includes('chào') || message.includes('hello') || message.includes('hi')) {
                    var reactArr = emoReactData.filter((el) => {
                        return el.type == 'good'
                    })
                    var shouldReact = Ultis.randomPercent(0.7)
                    arr.push(generateResponseJson('text', Ultis.randomArray(helloResponse).text, shouldReact, Ultis.randomArray(reactArr).text))
                    return arr
                } else if (message.includes('bye') || message.includes('tạm biệt')) {
                    arr.push(generateResponseJson('text', Ultis.randomArray(helloResponse).text, shouldReact, Ultis.randomArray(reactArr).text))
                    return arr
                }
            }

            if (config.limit.readingTagText >= 10 && config.limit.readingTagText < 13) {
                arr.push(generateResponseJson('tag', Ultis.randomArray(khoChiuData), Ultis.randomPercent(0.5), Ultis.randomArray(khoChiuEmoData)))
                config.limit.readingTagText += 1
                return arr
            } else {
                if (config.limit.readingTagText > 15)
                    config.limit.readingTagText = Ultis.randomMinMax(0, 5, 0)
            }

            if (message.includes('nên không') || message.includes('có nên không') ||
                message.includes('nên k') || message.includes('có nên k') || message.includes('có nên')
            ) {
                var yes = Ultis.randomPercent(0.5)
                var neutral = Ultis.randomPercent(0.8)

                if (message.length < 50)
                    neutral = true

                if (neutral) {
                    var neutext = yesNoResponse.filter((el) => {
                        return el.type == 'none'
                    })
                    arr.push(generateResponseJson('text', Ultis.randomArray(neutext).text, false, ''))

                    var showimg = Ultis.randomPercent(0.5)
                    if (showimg) {
                        arr.push(generateResponseJson('image', 'https://i.imgur.com/QTxYMsS.png', false, ''))
                    }
                } else {
                    var textarr = yes ? shouldResponse.filter((el) => {
                            return el.type == 'yes'
                        }) :
                        shouldResponse.filter((el) => {
                            return el.type == 'no'
                        })
                    var meme = yes ? memePepeData.filter((el) => {
                            return el.type == 'yes'
                        }) :
                        memePepeData.filter((el) => {
                            return el.type == 'no'
                        })
                    var reactArr = yes ? emoReactData.filter((el) => {
                            return el.type == 'good'
                        }) :
                        emoReactData.filter((el) => {
                            return el.type == 'bad'
                        })
                    var shouldReact = yes ? Ultis.randomPercent(0.7) : false
                    arr.push(generateResponseJson('text', Ultis.randomArray(textarr).text, shouldReact, Ultis.randomArray(reactArr).text))
                    arr.push(generateResponseJson('image', Ultis.randomArray(meme).link, false, ''))
                }

                return arr
            }
            if (message.includes('phải không') || message.includes('đúng không') ||
                message.includes('phải k') || message.includes('đúng k') || message.includes('sai k') ||
                message.includes('phải ko') || message.includes('đúng ko') || message.includes('sai ko') ||
                message.includes('sai không') || message.includes('đúng hay sai') ||
                (message.includes('phải là') && (message.includes('không') || message.includes('ko')))
            ) {
                var yes = Ultis.randomPercent(0.5)
                var neutral = Ultis.randomPercent(0.8)

                if (message.length < 50)
                    neutral = true

                if (neutral) {
                    var neutext = yesNoResponse.filter((el) => {
                        return el.type == 'none'
                    })
                    arr.push(generateResponseJson('text', Ultis.randomArray(neutext).text, false, ''))

                    var showimg = Ultis.randomPercent(0.5)
                    if (showimg) {
                        arr.push(generateResponseJson('image', 'https://i.imgur.com/QTxYMsS.png', false, ''))
                    }
                } else {
                    var textarr = yes ? yesNoResponse.filter((el) => {
                            return el.type == 'yes'
                        }) :
                        yesNoResponse.filter((el) => {
                            return el.type == 'no'
                        })
                    var meme = yes ? memePepeData.filter((el) => {
                            return el.type == 'yes'
                        }) :
                        memePepeData.filter((el) => {
                            return el.type == 'no'
                        })
                    var reactArr = yes ? emoReactData.filter((el) => {
                            return el.type == 'good'
                        }) :
                        emoReactData.filter((el) => {
                            return el.type == 'bad'
                        })
                    var shouldReact = yes ? Ultis.randomPercent(0.7) : false
                    arr.push(generateResponseJson('text', Ultis.randomArray(textarr).text, shouldReact, Ultis.randomArray(reactArr).text))
                    arr.push(generateResponseJson('image', Ultis.randomArray(meme).link, false, ''))
                }

                return arr
            }

            if (message.includes('hát') && message.includes('một bài')) {
                var showtext = Ultis.randomPercent(0.5)
                if (showtext) {
                    if (config.limit.singASong % 3 == 0) {
                        arr.push(generateResponseJson('tag', 'Em thì chưa học hát nhiều, mới được dạy 1 bài, xin mạn phép hát cho anh nghe\n', false, '', ''))
                        arr.push(generateResponseJson('text', 'Bài hát có tên là `ABCD song`, tạm dịch bài hát `ABCD`, có lẽ ae cũng được nghe nhiều rồi\n', false, '', ''))
                        var song = `Hey boy(girl), Listen to me\nI know you may get this alot\n\tBut you are so beautiful\nI will give you an **A** because you are **Awesome**\n\tI will give you **B** because you are **Beautiful**\nI will give you **C** because you are **Confident**\n\tAnd finally I will give you my **D** because you **Deserve** it\n`
                        arr.push(generateResponseJson('text', song, false, '', ''))
                        arr.push(generateResponseJson('image', 'https://media1.giphy.com/media/WuD3LzM1cyv60/giphy.gif', false, ''))
                        config.limit.singASong += 1
                        return arr
                    } else {
                        arr.push(generateResponseJson('tag', 'Pé nhớ là pé hát nãy rồi mà???', false, '', ''))
                        config.limit.singASong += 1
                        config.limit.readingTagText += 1
                        return arr
                    }
                }
            }

            if ((message.includes('tìm') || message.includes('cho') || message.includes('xin')) &&
                (message.includes('2ten') || message.includes('hentai') || message.includes('tenten'))
            ) {
                if (message.includes('số')) {
                    var nextword = Ultis.findNextWord('số', message)
                    arr.push(generateResponseJson('tenten', nextword, false, '', ''))
                    nextword = ''
                    return arr
                } else if (message.includes('mã')) {
                    var nextword = Ultis.findNextWord('mã', message)
                    arr.push(generateResponseJson('tenten', nextword, false, '', ''))
                    nextword = ''
                    return arr
                }
                arr.push(generateResponseJson('tenten', '', false, '', ''))
                return arr
            }

            config.limit.readingTagText += 1
            return arr
        } catch (error) {
            return []
        }
    }

    return {
        khongPhanUng: khongPhanUng,
        phanHoiDuaTrenTinNhan: phanHoiDuaTrenTinNhan,
        phanHoiDuaTrenTinNhanTag: phanHoiDuaTrenTinNhanTag
    }
})()

module.exports = ResponseText