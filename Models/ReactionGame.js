const { model, Schema } = require('mongoose')

let reactionGame = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionGame', reactionGame)