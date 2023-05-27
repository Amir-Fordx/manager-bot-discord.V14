const { model, Schema } = require('mongoose')

let reactionCityA = new Schema({
    GuildID: String,
    roles: Array
})

module.exports = model('ReactionCityA', reactionCityA)