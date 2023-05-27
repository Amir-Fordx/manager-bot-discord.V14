const rrSchema = require('../../Models/ReactionArt')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pannelart')
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
            .setTitle("<:level:1080625005764825089> Art's Menu")
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1089338659418935377/Art_Banner.png')
            .setDescription('**You can select your Art from Select Menu.**')
            .setColor('Grey')
            .addFields(
                { name: 'Art',
            value: [
                `「<:Art:1089314303301124186>」<@&1086011931669840002>`, // Tailor
                `「<:Art:1089314303301124186>」<@&1086011935507615877>`, // Graphic Designer
                `「<:Art:1089314303301124186>」<@&1086011938766594119>`, // Poet
                `「<:Art:1089314303301124186>」<@&1086011955921301647>`, // Computer
                `「<:Art:1089314303301124186>」<@&1086011962485379172>`, // Singing
                `「<:Art:1089314303301124186>」<@&1086011945695588422>`, // Painter
                `「<:Art:1089314303301124186>」<@&1086011949038440549>`, // Calligraphy
                `「<:Art:1089314303301124186>」<@&1086011952859451462>`, // Pottery
                `「<:Art:1089314303301124186>」<@&1086011959398383766>`, // Photography
                `「<:Art:1089314303301124186>」<@&1086011964993581091>`, // Dancer
            ].join('\n')}
            )

            const menuComponents = [
                new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                    .setCustomId('reaction-roles')
                    .setMaxValues(options.length)
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