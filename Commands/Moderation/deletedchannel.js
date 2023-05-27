const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('delete-channel')
        .setDescription('Delete a discord channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Select a channel you wanna delete.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { options, guild } = interaction;

        const channel = options.getChannel('channel')
        const embed = new EmbedBuilder()
            .setTitle('Channel Delete')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`<:pin:1080625098186293248> **Name:** \`[${channel.id}]\`\n<:moderator:1080631209396281364> **Moderator:** <@${interaction.user.id}>\n<:succesfully:1080625167958560829> **Action:** __succesfully__`)
            .setColor('Grey')

        channel.delete()

        await interaction.reply({ embeds: [embed] })
    }
}