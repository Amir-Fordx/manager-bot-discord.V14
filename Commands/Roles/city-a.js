const rrSchema = require('../../Models/ReactionCityA')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('pannelcitya')
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
                            `「<:location:1089265351793066034>」<@&1084829819684007976>`, // Khorasan Shomali
                            `「<:location:1089265351793066034>」<@&1084829822280286228>`, // Semnan
                            `「<:location:1089265351793066034>」<@&1084830065193394177>`, // Sistan & Baluchestan
                            `「<:location:1089265351793066034>」<@&1084830067387027498>`, // Chaharmahale Bakhtiari
                            `「<:location:1089265351793066034>」<@&1084830069555466310>`, // Qom
                            `「<:location:1089265351793066034>」<@&1084830493708664843>`, // Hamedan
                            `「<:location:1089265351793066034>」<@&1084830495310872606>`, // Kerman
                            `「<:location:1089265351793066034>」<@&1084830496661442621>`, // Ghazvin
                            `「<:location:1089265351793066034>」<@&1084830499211583538>`, // Markazi
                            `「<:location:1089265351793066034>」<@&1084830501354864660>`, // Zanjan
                            `「<:location:1089265351793066034>」<@&1084830503301029918>`, // Golestan
                            `「<:location:1089265351793066034>」<@&1084830504701939712>`, // Ardebil
                            `「<:location:1089265351793066034>」<@&1084830757547151390>`, // Kermanshah
                            `「<:location:1089265351793066034>」<@&1084830758872563793>`, // Hormozgan
                            `「<:location:1089265351793066034>」<@&1084830762064412724>`, // Kordestan
                            `「<:OutOfIran:1089316110828060743>」<@&1084831013550690364>`, // Out Of Iran
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

            return interaction.reply({ content: '<:succesfully:1080625167958560829> Succesfully sent your panel.', ephemeral: true })

        } catch (err) {
            console.log(err)
        }
    }
}