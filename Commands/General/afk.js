const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const afkModel = require('../../Models/Afk')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('afk')
    .setDescription('Toggle your afk status.'),
    async execute(interaction) {
        const {options, guildId, user} = interaction;


        await afkModel.findOne({ Guild: guildId, UseID: user.id }, async (err, data) => {
            
            const embed = new EmbedBuilder()
            .setDescription(`<:afk:1080624246587392050> <@${user.id}> You are now **AFK.**`)

            try {
                if (!data) {
                    await afkModel.create({
                        Guild: guildId,
                        UserID: user.id,
                        Afk: true
                    })
                } else if (data.Afk) {
                    data.Afk = false;
                    data.save()
                    return interaction.reply({ content: `<:err:1080624265428226248> You are **not** afk anymore.`, ephemeral: true })
                } else {
                    data.Afk = true;
                    data.save()
                }
                return interaction.reply({ embeds: [embed]})
            } catch (err) {
                console.log(err)
            }
        }).clone()
    }
}