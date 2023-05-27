const { model, Schema } = require('mongoose')

let reactionMafia = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionMafia', reactionMafia)