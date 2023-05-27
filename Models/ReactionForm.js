const { model, Schema } = require('mongoose')

let reactionForm = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionForm', reactionForm)