const nHentaiAPI = require('nhentai-api-js')

const TenTen = (function () {
    let api = new nHentaiAPI()

    function randomTenten() {
        return api.random()
    }

    return {
        random: randomTenten
    }
})()

module.exports = TenTen