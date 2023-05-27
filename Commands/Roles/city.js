const rrSchema = require('../../Models/ReactionCity')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pannelcity')
        .setDescription('display reaction role panel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction, client) {
        const { options, guildId, guild, channel, roleId } = interaction;

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
                .setTitle("<:level:1080625005764825089> City's Menu")
                .setThumbnail(`${guild.iconURL()}`)
                .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1089250748598063224/City_Banner.png')
                .setDescription('**You can select your City from Select Menu.**')
                .setColor('Grey')
                .addFields(
                    {
                        name: 'City',
                        value: [
                            `「<:location:1089265351793066034>」<@&1084830062907510834>`, // Bushehr
                            `「<:location:1089265351793066034>」<@&1084828786119430245>`, // Fars
                            `「<:location:1089265351793066034>」<@&1084828790234034216>`, // Tehran
                            `「<:location:1089265351793066034>」<@&1084828793111322648>`, // Gilan
                            `「<:location:1089265351793066034>」<@&1084828795539828736>`, // Mazandaran
                            `「<:location:1089265351793066034>」<@&1084828798173843476>`, // Khorasan Razavi
                            `「<:location:1089265351793066034>」<@&1084828800350703726>`, // Kohkiloye Va Buyer Ahmad
                            `「<:location:1089265351793066034>」<@&1084828803097952286>`, // Karaj
                            `「<:location:1089265351793066034>」<@&1084829325792133140>`, // Azarbayejan Sharghy
                            `「<:location:1089265351793066034>」<@&1084829329218863165>`, // Khuzestan
                            `「<:location:1089265351793066034>」<@&1084829331383132170>`, // Azarbayejan Gharbi
                            `「<:location:1089265351793066034>」<@&1084829333564170330>`, // Ilam
                            `「<:location:1089265351793066034>」<@&1084829705817034802>`, // Yazd
                            `「<:location:1089265351793066034>」<@&1084829736863289425>`, // Esfahan
                            `「<:location:1089265351793066034>」<@&1084829815468720280>`, // Lorestan
                            `「<:location:1089265351793066034>」<@&1084829817536524418>`, // Khorasan Jonubi
                        ].join('\n')
                    },
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

            return interaction.reply({ content: '<:succesfully:1080625167958560829> Succesfully sent your panel.', ephemeral: true })

        } catch (err) {
            console.log(err)
        }
    }
}