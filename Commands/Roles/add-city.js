const rrSchema = require('../../Models/ReactionCity')
const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('city')
    .setDescription('add custom reaction role.')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
    .addRoleOption(option =>
        option
        .setName('role')
        .setDescription('role to be assigned.')
        .setRequired(true)
    )
    .addStringOption(option =>
        option
        .setName('description')
        .setDescription('description of the role.')
        .setRequired(false)
    )
    .addStringOption(option =>
        option
        .setName('emoji')
        .setDescription('emoji for the role.')
        .setRequired(false)
    ),
    async execute(interaction) {
        const {options, guildId, member} = interaction;
        const role = options.getRole('role')
        const description = options.getString('description')
        const emoji = options.getString('emoji')

        try {
            if (role.position >= member.roles.highest.position)
            return interaction.reply({ content: `<:info:1080631288886722650> I don't have permission for that.`, ephemeral: true })

            const data = await rrSchema.findOne({ GuildID: guildId })
            const newRole = {
                roleId: role.id,
                roleDescription: description || 'No description.',
                roleEmoji: emoji || ''
            }
            if (data) {
                let roleData = data.roles.find((x) => x.roleId === role.id)

                if (roleData) {
                    roleData = newRoleData;
                } else {
                    data.roles = [...data.roles, newRole]
                }
                await data.save()
            } else {
                await rrSchema.create({
                    GuildID: guildId,
                    roles: newRole
                })
            }
            const embed = new EmbedBuilder()
            .setDescription(`<:succesfully:1080625167958560829> Succesfully created new role **${role.name}**`)
            .setColor('Gold')

            return interaction.reply({ embeds: [embed], ephemeral: true })
        } catch (err) {
            console.log(err)
        }
    }
}