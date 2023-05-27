const rrSchema = require('../../Models/ReactionGame')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('pannelgame')
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
            .setTitle("<:level:1080625005764825089> Game's Menu")
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://cdn.discordapp.com/attachments/1077872072841232435/1089268775406284861/Game.png')
            .setDescription("**You can select your Game's from Select Menu.**")
            .setColor('Grey')
            .addFields(
                { name: 'Game',
            value: [
                `「<:Dota2:1089262878055469086>」<@&1084826393604534283>`, // Dota-2
                `「<:LeagueOfLegends:1089262953833971722>」<@&1084827898797633606>`, // League Of Legends
                `「<:Gta:1089263006376005692>」<@&1084827647521071216>`, // Gta
                `「<:Plato:1089263045307539506>」<@&1084827971447181382>`, // Plato
                `「<:CsGo:1089263094729015307>」<@&1084827680941297675>`, // Cs-Go
                `「<:Apex:1089263164115386378>」<@&1084827740173242410>`, // Apex Legends
                `「<:CallOfDuty:1089263216162508850>」<@&1084827772402290718>`, // Call Of Duty
                `「<:Fortnite:1089263285364347070>」<@&1084827993337254028>`, // Fortnite
                `「<:RainBow6:1089263329232560198>」<@&1084828006830325852>`, // Rainbow Six Siege
                `「<:Pubg:1089263359360237609>」<@&1084827861833228421>`, // Pubg
                `「<:Fifa:1089263389525684276>」<@&1084834432374034453>`, // Fifa
                `「<:Fifa:1089263389525684276>」<@&1084834427680600157>`, // P.E.S
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