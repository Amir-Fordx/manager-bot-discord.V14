const rrSchema = require('../../Models/ReactionRoles')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pannelcolor')
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
            .setTitle("<:level:1080625005764825089> Color's Menu")
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1084038187145510933/Color.png')
            .setDescription('**You can select your color from Select Menu.**')
            .setColor('Grey')
            .addFields(
                {
                    name: 'Colors',
                    value: [
                        `「<:Ansel:1083188556106833960>」<@&1083210613376946277>`, // RGB
                        `「<:Aqua:1083188559193845831>」<@&1083210676773863535>`, // Ansel
                        `「<:Black:1083188561739780197>」<@&1083210661695332434>`, // Red
                        `「<:Blue:1083188564487045161>」<@&1083210669580619856>`, // Hot Pink
                        `「<:BlueViolet:1083188566068314203>」<@&1083210667827396769>`, // Plum
                        `「<:DeepPink:1083188569088208966>」<@&1083210638454706217>`, // Deep Pink
                        `「<:DimGray:1083188570849816687>」<@&1083210666501996644>`, // Yellow
                        `「<:Gold:1083188574171697242>」<@&1083210649909329920>`, // Lime
                        `「<:Grassy:1083188575971065957>」<@&1083210652904075304>`, // Gold
                        `「<:Green:1083188579167129640>」<@&1083210653998796923>`, // Grassy
                        `「<:HotPink:1083188580739977217>」<@&1083210614891098112>`, // White
                        `「<:Lime:1083188583688589392>」<@&1083210651289272452>`, // Green
                        `「<:Navy:1083188585508896798>」<@&1083210674626367539>`, // Purple
                        
                    ].join('\n')
                },
                    {
                        name: 'Colors',
                        value: [
                            `「<:OrangeRed:1083188588499435620>」<@&1083210664761380865>`, // Black
                            `「<:Pulm:1083188591334797343>」<@&1083210646490972200>`, // Slate Grey
                            `「<:Purple:1083188594979635261>」<@&1083210658071453777>`, // Sun Yellow
                            `「<:Red:1083188596489588757>」<@&1083210611816669204>`, // Dim Grey
                            `「<:Rgb:1083201489088032878>」<@&1083210610268983366>`, // Orange Red
                            `「<:SexyIce:1083188599673081856>」<@&1083210678560637058>`, // Blue Violet
                            `「<:SlateGray:1083188602432921650>」<@&1083210659824672859>`, // Navy
                            `「<:Sunyellow:1083188756309364837>」<@&1083210663184318534>`, // Blue
                            `「<:White:1083188605431857192>」<@&1083210655814914079>`, // Aqua
                            `「<:Yellow:1083188758310031450>」<@&1083210647698939915>`, // Sexy Ice
                        ].join('\n')
                    }
                
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