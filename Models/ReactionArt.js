const { model, Schema } = require('mongoose')

let reactionArt = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionArt', reactionArt)