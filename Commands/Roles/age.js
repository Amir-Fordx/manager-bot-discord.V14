const rrSchema = require('../../Models/ReactionAge')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pannelage')
    .setDescription('display reaction role panel.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const {options, guildId, guild, channel, roleId} = interaction;
        
        try {
            const data = await rrSchema.findOne({ GuildID: guildId })
            if (!data.roles.length > 0)
            return interaction.reply({ content: 'This server does not have any data.', ephemeral: true })

            const options = data.roles.map(x => {
                const role = guild.roles.cache.get(x.roleId)
                 return {
                    label: role.name,
                    value: role.id,
                    description: x.roleDescription,
                    emoji: x.roleEmoji || null
                }
            })

            const panelEmbed = new EmbedBuilder()
            .setTitle("<:level:1080625005764825089> Age Menu")
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1089249998681686168/Age.png')
            .setDescription('**You can select your Age from Select Menu.**')
            .setColor('Grey')
            .addFields(
                { name: 'Age',
            value: [
                `「<:Age:1089249602999431209>」<@&1084332120576643092>`, // 15-19
                `「<:Age:1089249602999431209>」<@&1084332160531578960>`, // 20-24
                `「<:Age:1089249602999431209>」<@&1084332165526986812>`, // 25-29
                `「<:Age:1089249602999431209>」<@&1084332170547560469>`, // 30-39
                `「<:Age:1089249602999431209>」<@&1084332175505236089>`, // 40 +
            ].join('\n')}
            )

            const menuComponents = [
                new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('reaction-roles')
                    .addOptions(options)
                )
            ];

            channel.send({ embeds: [panelEmbed], components: menuComponents })

            return interaction.reply({ content: '<:succesfully:1080625167958560829> Succesfully sent your panel.', ephemeral: true})
           
        } catch (err) {
            console.log(err)
        }
    }
}