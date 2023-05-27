const {
    SlashCommandBuilder,
    EmbedBuilder,
    PermissionFlagsBits
} = require('discord.js')
const LockSchema = require('../../Models/Lock')
const ms = require('ms')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('lock')
        .setDescription('Lock a channel for specify time.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('Specify a time for the Lockdown: 1m, 1h, 1d.')
                .setRequired(false)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('Specify the reason for the Lockdown.')
                .setRequired(false)
        ),
    async execute(interaction, client) {
        const {
            guild,
            channel,
            options
        } = interaction;
        const Reason = options.getString('reason') || 'No reason specified.';
        const time = options.getString('time') || 'No time specified / infinite.';

        const embed = new EmbedBuilder()

        if (!channel.permissionsFor(guild.id).has('SendMessages'))
            return interaction.reply({
                embeds: [
                    embed.setColor('DarkOrange')
                        .setDescription('<:info:1080631288886722650> This channel is already **Locked.**')
                ],
                ephemeral: true
            })
        channel.permissionOverwrites.edit(guild.id, {
            SendMessages: false
        })

        interaction.reply({
            embeds: [
                embed.setColor('DarkOrange')
                    .setDescription(`<:lock:1080625029450043472> This channel is now **Locked** for [${time}] with reason ${Reason}.`)
            ]
        })
        const Time = options.getString('time')
        if (Time) {
            const ExpireDate = Date.now() + ms(Time)
            LockSchema.create({
                GuildID: guild.id,
                ChannelID: channel.id,
                Time: ExpireDate
            })

            setTimeout(async () => {
                channel.permissionOverwrites.edit(guild.id, {
                    SendMessages: null
                })
                interaction.reply({
                    embeds: [
                        embed.setColor('DarkGreen')
                            .setDescription(`<:lock:1080625029450043472> The **Lockdown** with reason ${Reason} and with length ${time} has been canceled.`)
                    ]
                })
                    .catch(() => { })

                await LockSchema.deleteOne({ ChanenlID: channel.id })
            }, ms(Time))
        }
    }
}