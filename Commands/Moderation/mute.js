const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const ms = require('ms')
// Mute? Nope, Timeout Command.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('Timeout a member from the guild.')
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('elect the user you wish the mute')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('time')
                .setDescription('how long should the mute last?')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('reason')
                .setDescription('what is the reason the mute?')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;

        const user = options.getUser('target')
        const member = guild.members.cache.get(user.id)
        const time = options.getString('time')
        const convertedTime = ms(time)
        const reason = options.getString('reason') || 'No reason provided'

        const errEmbed = new EmbedBuilder()
            .setDescription('<:err:1080624265428226248> Something went wrong. please try again later.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle('**Added**')
            .setDescription(`<:succesfully:1080625167958560829> Succesfully Added Timeout ${user}`)
            .addFields(
                { name: 'Reason', value: `${reason}`, inline: true },
                { name: 'Duration', value: `${time}`, inline: true }
            )
            .setColor(0x5fb041)
            .setTimestamp()

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })
        if (!convertedTime)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })
        try {
            await member.timeout(convertedTime, reason)
            interaction.reply({
                embeds: [succesEmbed]
            })
        } catch (err) {
            console.log(err)
        }
    }
}