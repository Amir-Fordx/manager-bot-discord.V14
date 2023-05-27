const rrSchema = require('../../Models/ReactionForm')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pannelform')
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
            .setTitle("<:level:1080625005764825089> Relatin Ship Menu")
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1084035962067222569/relationship_3.png')
            .setDescription('**You can select your Relation Ship from Select Menu.**')
            .setColor('Grey')
            .addFields(
                { name: 'Relation Ship',
            value: [
                `「<:Single:1084019301159272459>」<@&1083543396699869244>`, // Single
                `「<:InRell:1084019516897501204>」<@&1083690028040990740>`,  // In Rell
                `「<:Married:1084019641044717578>」<@&1083690031585177700>`,  // Marrid
                `「<:LGBT:1084020305485377538>」<@&1083690035343282187>`,  // LGBT
                `「<:Man:1084020430890864671>」<@&1083761878418858134>`,  // MR
                `「<:Woman:1084020475514081360>」<@&1083761822789808289>`  // Miss
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