const { model, Schema } = require('mongoose')

let reactionHidden = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionHidden', reactionHidden)