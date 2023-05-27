const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js')
const LockSchema = require('../../Models/Lock')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('unlock')
        .setDescription('Unlock a channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),

    async execute(interaction, client) {
        const {
            guild,
            channel
        } = interaction;

        const embed = new EmbedBuilder()

        if (channel.permissionsFor(guild.id).has('SendMessages'))
            return interaction.reply({
                embeds: [
                    embed.setColor('DarkOrange')
                        .setDescription("<:err:1080624265428226248> This channel isn't already **Unlocked.**")
                ],
                ephemeral: true
            })
        channel.permissionOverwrites.edit(guild.id, {
            SendMessages: null
        })

        await LockSchema.deleteOne({ ChannelID: channel.id })
        interaction.reply({
            embeds: [
                embed.setDescription('<:unlocked_1f513:1080625223935729755> The **Lockedown** been canceled.')
            ]
        })
    }
}