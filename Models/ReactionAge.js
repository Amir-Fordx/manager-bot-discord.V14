const { model, Schema } = require('mongoose')

let reactionAge = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionAge', reactionAge)