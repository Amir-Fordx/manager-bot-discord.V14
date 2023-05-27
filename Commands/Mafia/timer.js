const { EmbedBuilder, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js')
const moment = require('moment');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('day')
        .setDescription('Start mafia day.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const time = `<t:${(Date.now() + 60 * 1000).toString().slice(0, -3)}:R>`;
        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('<:level:1080625005764825089> Mafia')
            .addFields(
                {name: '<:panel:1080625085922148493> Timer', 
                value: [
                    `<:time:1080625210673332294> **Time Left :** ${time}`,
                    `<:moderator:1080631209396281364> **Moderator :** <@${interaction.user.id}>`
                ].join('\n')}
            )
            .setImage('https://cdn.discordapp.com/attachments/1049406847314042930/1082105525656899694/tenor-1.gif')
            .setTimestamp()

        interaction.reply({ embeds: [embed] })
        setTimeout(() => {
            interaction.channel.send({ content: `**Time** is up <@${interaction.user.id}>` })
       }, 60 * 1000);
    }
}