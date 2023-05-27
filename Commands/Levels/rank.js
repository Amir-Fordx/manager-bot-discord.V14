const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('rank')
    .setDescription("Get info about someone's rank")
    .addUserOption(option =>
        option
        .setName('user')
        .setDescription('Select a user.')
    ),
    async execute(interaction) {
        const { options, guildId, user } = interaction;
        const member = options.getMember('user') || user;
        const levelUser = await Levels.fetch(member.id, guildId)

        const embed = new EmbedBuilder()

        if (!levelUser) return interaction.reply({ content: "<:pin:1080625098186293248> Seems like this user has not earned any xp so far.", ephemeral: true })

        embed.setDescription(`<:rank:1080625116997759047> **<@${member.id}>** is currently level ${levelUser.level} and has ${levelUser.xp.toLocaleString()} xp.`)
        .setColor('Blue')
        .setTimestamp()

        return interaction.reply({embeds: [embed]})
    }
}