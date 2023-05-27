const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban')
        .setDescription('unban a user from the guild.')
        .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
        .addStringOption(option =>
            option
                .setName('userid')
                .setDescription('Id of the user you want to unban.')
                .setRequired(true)
        ),

    async execute(interaction) {
        const { channel, options } = interaction;
        const userId = options.getString('userid')
        try {
            await interaction.guild.members.unban(userId)

            const embed = new EmbedBuilder()
                .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
                .setTitle('Unban')
                .setDescription(`<:info:1080631288886722650> **Target:** \`${userId}\`\n<:moderator:1080631209396281364> **Moderator:** <@${interaction.user.id}>`)
                .setColor('Gold')
                .setTimestamp()

            await interaction.reply({
                embeds: [embed]
            })
        } catch (err) {
            console.log(err)
            const errEmbed = new EmbedBuilder()
                .setDescription(`<:err:1080624265428226248> Please provide a valid member's ID.`)
                .setColor('DarkGold')

            interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })
        }
    }
}