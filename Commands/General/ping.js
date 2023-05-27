const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const { version: discordjsVersion } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('bot Status.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),
    execute(interaction, client) {
        const embed = new EmbedBuilder()
            .setColor('DarkGold')
            .setDescription('```js\n' + `Bot Ping ${client.ws.ping}ms!\n` + `Node.js Version ${process.version}\n` + `Discord.js Version ${discordjsVersion}\n` + `Memory ${(process.memoryUsage().rss / 1024 / 1024).toFixed(2)} MB RSS\n` + `Guilds ${client.guilds.cache.size}` + '```')

            .setTimestamp()

        interaction.reply({ embeds: [embed] })
    }
}