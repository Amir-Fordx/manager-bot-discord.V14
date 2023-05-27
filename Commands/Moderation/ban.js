const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ban')
        .setDescription('ban a user from the guild.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('user to be ban.')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('reason for the ban.')
        ),

    async execute(interaction) {
        const { channel, options } = interaction;
        const user = options.getUser('target')
        const reason = options.getString('reason') || 'No reason provided.';
        const member = await interaction.guild.members.fetch(user.id)

        const errEmbed = new EmbedBuilder()
            .setDescription(`You can't take action on **${user.username} since they a higher role.`)
            .setColor(0x72c3b)

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })

        await member.ban({ reason })

        const embed = new EmbedBuilder()
            .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
            .setTitle('Ban')
            .setDescription(`<:info:1080631288886722650> **Target:** ${user}\n<:reason:1080625128142028800> **Reason:** \`${reason}\`\n<:moderator:1080631209396281364> **Moderator:** <@${interaction.user.id}>`)
            .setColor('Gold')
            .setTimestamp()

        await interaction.reply({
            embeds: [embed]
        })

    }
}