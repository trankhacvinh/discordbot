var khongPhanUngData = [
    '....', 'Xin để em bình yên',
    'Hmm...', 'UwU', 'UmU', '(´＿｀。)'
]

var sleepingData = [
    '( > . < ) zzZ',
    '(。-ω - ) zzz…',
    ':sleeping: :sleeping: :sleeping:'
]

const ResponseText = (function () {

    function randomMinMax(min, max, thereshold) {
        var rand = Math.round(Math.random() * (max - min)) + thereshold
    }

    function randomArray(array) {
        const res = array[Math.floor(Math.random() * array.length)]
        return res
    }

    function randomPercent(percent) {
        var random_boolean = Math.random() >= percent
        return random_boolean
    }

    function khongPhanUng() {
        var traLoi = randomPercent(0.7)
        if (traLoi) {
            var hour = new Date().getHours();
            if (hour < 23 && hour > 5) {
                var text = randomArray(khongPhanUngData)
                return text
            } else {
                var text = randomArray(sleepingData)
            }
        }
        return ''
    }

    return {
        khongPhanUng: khongPhanUng
    }
})()

module.exports = ResponseText