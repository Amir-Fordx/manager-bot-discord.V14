const { EmbedBuilder } = require('discord.js');
const afkModel = require('../../Models/Afk')
// Afk Command Event.
module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (message.author.bot || !message.guild) return;

        afkModel.findOne({Guild: message.guild.id, UserID: message.author.id}, async (err, data) => {
            if (data.Afk) {
                data.Afk = true;
                data.save()
            }
            return;
        })

        const embed = new EmbedBuilder()
        .setDescription(`<@${message.author.id}> Aroos rafte gol bekeshe [**AFK**].`) // Your Afk Message.

        const taggedMember = message.mentions.users.map(msg => msg.id);

        if (taggedMember.length > 0) {
            taggedMember.forEach(m => {
                afkModel.findOne({ Guild: message.guild.id, UserID: m}, async (err, data) => {
                    if (data.Afk) {
                        message.reply({ embeds: [embed] })
                    }
                    return;
                })
            })
        }
    }
}