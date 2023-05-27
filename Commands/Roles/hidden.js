const rrSchema = require('../../Models/ReactionHidden')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pannelhidden')
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
            .setTitle("<:level:1080625005764825089> Hidden Channel's Menu")
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1084044724672938004/Hidden.png')
            .setDescription("**You can select your Hidden Channel's from Select Menu.**")
            .setColor('Grey')
            .addFields(
                { name: 'Hiddens',
            value: [
                `「<:Hide:1084036141059145808>」<@&1083210683589595146>`, // Hidden All
                `「<:Hide2:1084036143844163624>」<@&1083210686873731173>`, // Hidden Residegi
                `「<:Hide2:1084036143844163624>」<@&1083210684831109194>`, // Hidden Borad
                `「<:Hide2:1084036143844163624>」<@&1083210689142853793>`, // Hidden Notify
                `「<:Hide2:1084036143844163624>」<@&1083210692989042728>`, // Hidden Adult
                `「<:Hide2:1084036143844163624>」<@&1083210690703147038>`, // Hidden Event
                `「<:Hide2:1084036143844163624>」<@&1083210694679334922>`, // Hidden Grate
                `「<:Hide2:1084036143844163624>」<@&1083210698491961414>`, // Hidden Music
                `「<:Hide2:1084036143844163624>」<@&1083210696759709737>`, // Hidden Mafia
                `「<:Hide2:1084036143844163624>」<@&1083210701130186782>`, // Hidden Private
                `「<:Hide2:1084036143844163624>」<@&1083210723628437575>`, // Hidden Radio
                `「<:Hide2:1084036143844163624>」<@&1083210703814537256>`, // Hidden Game
                `「<:Hide2:1084036143844163624>」<@&1084046988749840394>`, // Hidden Art
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