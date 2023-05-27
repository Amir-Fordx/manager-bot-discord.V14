const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('uptime')
    .setDescription('Show you the uptime the bot.'),

    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        const embed = new EmbedBuilder()
        .setColor('DarkPurple')
        .setDescription(`<:uptime:1080625242747187202> ${client.user.username}'s Uptime`)
        .setTimestamp()
        .addFields(
            { name: 'Uptime', value: ` \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.`}
        )
        interaction.reply({ embeds: [embed ]})
    }
}