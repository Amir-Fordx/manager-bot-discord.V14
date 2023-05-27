const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType } = require('discord.js')
const logSchema = require('../../Models/Logs')
// Setup Loogs, Set Channel Log's
module.exports = {
    data: new SlashCommandBuilder()
        .setName('setup-logs')
        .setDescription('Set up your logging channel for the audit logs.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Channel for logging messages.')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { channel, guildId, options } = interaction;
        const logChannel = options.getChannel('channel') || channel;
        const embed = new EmbedBuilder()

        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            if (!data) {

                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                })

                embed.setDescription("<:succesfully:1080625167958560829> Data was seccesfully sent to the database.")
                    .setColor('DarkGreen')
                    .setTimestamp()
            } else if (data) {
                logSchema.deleteOne({ Guild: guildId })
                await logSchema.create({
                    Guild: guildId,
                    Channel: logChannel.id
                })
                embed.setDescription('<:succesfully:1080625167958560829> Old data was succesfully replaced with the new data.')
                    .setColor('DarkGreen')
                    .setTimestamp()
            }

            if (err) {
                embed.setDescription('<:err:1080624265428226248> Something went wrong, please connect the developers')
                    .setColor('DarkOrange')
                    .setTimestamp()
            }
            return interaction.reply({ embeds: [embed], ephemeral: true })
        })
    }
}