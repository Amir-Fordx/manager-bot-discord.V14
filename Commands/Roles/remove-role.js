const rrSchema = require('../../Models/ReactionRoles')
const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('removecolor')
    .setDescription('removes custom reaction role.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption(option =>
        option
        .setName('role')
        .setDescription('role to be removed.')
        .setRequired(true)
    ),
    async execute(interaction) {
        const {options, guildId, member} = interaction;
        const role = options.getRole('role')

        try {

            const data = await rrSchema.findOne({ GuildID: guildId })

            if (!data)
                return interaction.reply({ content: '<:err:1080624265428226248> This server does not have any data.', ephemeral: true })

            const roles = data.roles;
            const findRole = roles.find((r) => r.roleId === role.id)

            if (!findRole)
                return interaction.reply({ content: '<:err:1080624265428226248> This role does not exist.', ephemeral: true})

            const FilteredRiles = roles.filter((r) => r.roleId !== role.id)
            data.roles = FilteredRiles;
            await data.save()

            const embed = new EmbedBuilder()
            .setDescription(`<:succesfully:1080625167958560829> Succesfully Removed role **${role.name}**`)
            .setColor('Gold')

            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (err) {
            console.log(err)
        }
    }
}