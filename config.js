const listSubReddit = require('./ListSubReddit.json')
const listEvent = require('./ListEvent.json')
const listKingRaid = require('./KingRaidData.json')

/*End require */
const ch_general = "679584353520451584";
const ch_ecchi = "679617050150174720"
//const ch_general_VNA = "678548998562512903"
//const ch_ecchi_VNA = "678563701871083531"
const botId = '678620052689256448'
const vinhId = '525247662815969290'

const config = {
    token: 'Njc4NjIwMDUyNjg5MjU2NDQ4.Xk6snA.BTUFSnfHVoEcwreTz866JIr3h94',
    triggerCommand: '.',
    channels: {
        general: '679584353520451584',
        ecchi: '679617050150174720'
    },
    ids: {
        bot: botId,
        me: vinhId,
        chuGuild: '678790981381914635'
    },
    interval: {
        ecchi: 300000
    },
    limit: {
        deptrai: 0,
        deptraiMe: 0,
        readingText: 0,
        readingTagText: 0,
        singASong: 0
    },
    listSourceSubReddit: listSubReddit,
    sourceSubRedditConfig: {
        isConfig: false,
        channel: '',
        step: 0,
        theloai: 'all',
        nhan: 'all',
        thoiGian: 5,
        listOn: ['ecchi']
    },
    events: listEvent.event,
    kingraid: listKingRaid.heroes,
    kingraidClass: ['Knight', 'Warrior', 'Assassin', 'Archer', 'Mechanic', 'Wizard',
        'Priest'
    ],
    lastRandomCommand: '',
    ncovdata: null
}

module.exports = config