const { SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('leaderboard')
    .setDescription('Get the leaderboard from the rank systeam.'),
    async execute(interaction, client) {
        const {options, guildId, user} = interaction;
        const rawLeaderboard = await Levels.fetchLeaderboard(guildId, 10)
        if(rawLeaderboard.length < 1) return interaction.reply("Nobody's in the leaderboard yet.")

        const embed = new EmbedBuilder()

        const leaderboard = await Levels.computeLeaderboard(client, rawLeaderboard, true)

        const lb = leaderboard.map(e => `<:panel:1080625085922148493> **${e.position} **<@${e.userID}>\n<:levels:1080631317923893258> **Level:** ${e.level}\n<:level:1080625005764825089> **XP:** ${e.xp.toLocaleString()}\n<:uptime:1080625242747187202> **discriminator:** ${e.discriminator}`)

        embed.setTitle('<:levels:1080631317923893258> Leaderboard')
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setDescription(lb.join('\n\n'))
        .setTimestamp()

        return interaction.reply({ embeds: [embed] })
    }
}