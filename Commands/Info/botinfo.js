const {
    SlashCommandBuilder,
    EmbedBuilder
} = require('discord.js')
const cpuStat = require('cpu-stat')
module.exports = {
    data: new SlashCommandBuilder()
        .setName('botinfo')
        .setDescription('Get information aboute this bot.'),

    async execute(interaction, client) {
        const days = Math.floor(client.uptime / 86400000)
        const hours = Math.floor(client.uptime / 3600000) % 24
        const minutes = Math.floor(client.uptime / 60000) % 60
        const seconds = Math.floor(client.uptime / 1000) % 60

        cpuStat.usagePercent(function (error, percent) {
            if (error) return interaction.reply({
                content: `${error}`
            })

            const memoryUsage = formatBytes(process.memoryUsage().heapUsed)
            const node = process.version
            const cpu = percent.toFixed(2)

            const embed = new EmbedBuilder()
                .setColor('DarkButNotBlack')
                .setTitle('<:uptime:1080625242747187202> Bot Information')
                .setDescription(`**Developer's** <@807033850609795102>\n` + '```js\n' + `Username  ${client.user.username}\n` + `ID  ${client.user.id}\n` + 'Creation date  jan 30, 2023\n' + 'Help Command  /help\n' + `Uptime  \`${days}\` days, \`${hours}\` hours, \`${minutes}\` minutes and \`${seconds}\` seconds.\n` + `Bot Ping  ${client.ws.ping}ms\n` + `Node Version  ${node}\n` + `CPU Usage  ${cpu}%\n` + `Memory Usage  ${memoryUsage}` + '```')
                .setTimestamp()
            interaction.reply({ embeds: [embed] })
        })

        function formatBytes(a, b) {
            let c = 1024
            d = b || 2
            e = ['B', 'KB', 'MB', 'GB', 'TB']
            f = Math.floor(Math.log(a) / Math.log(c))

            return parseFloat((a / Math.pow(c, f)).toFixed(b)) + '' + e[f]
        }
    }
}