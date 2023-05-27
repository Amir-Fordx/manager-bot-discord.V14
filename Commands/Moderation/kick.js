const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('kick')
        .setDescription('kick a user from the guild.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('user to be kicked.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('reason for the kick')
        ),

    async execute(interaction) {
        const { channel, options } = interaction;
        const user = options.getUser('target')
        const reason = options.getString('reason')
        const member = await interaction.guild.members.fetch(user.id)

        const errEmbed = new EmbedBuilder()
            .setDescription(`<:err:1080624265428226248> You can't take action on **${user.username}** since they have a higher role.`)
            .setColor(0x72c3b)
        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })
        await member.kick(reason)

        const embed = new EmbedBuilder()
            .setDescription(`<:succesfully:1080625167958560829> Succesfully kicked ${user} with reason **${reason}**`)
        await interaction.reply({
            embeds: [embed]
        })
    }
}