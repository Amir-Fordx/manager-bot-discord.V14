const { model, Schema } = require('mongoose')

let reactionCity = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionCity', reactionCity)