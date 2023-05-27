const { Client, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js')
const ms = require('ms')
// Unmute? Nope, Timeout Remove Command.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('remove-timeout')
        .setDescription('Remove a timeout from the member.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('select the user you wish the mute')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, options } = interaction;
        const user = options.getUser('target')
        const member = guild.members.cache.get(user.id)

        const errEmbed = new EmbedBuilder()
            .setDescription('<:err:1080624265428226248> Something went wrong. please try again later.')
            .setColor(0xc72c3b)

        const succesEmbed = new EmbedBuilder()
            .setTitle('**Removed**')
            .setDescription(`<:succesfully:1080625167958560829> Succesfully removed timeout ${user}`)
            .setColor(0x5fb041)
            .setTimestamp()

        if (member.roles.highest.position >= interaction.member.roles.highest.position)
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            }) //this if statement is optinal (but recommended)
        if (!interaction.guild.members.me.permissions.has(PermissionFlagsBits.ModerateMembers))
            return interaction.reply({
                embeds: [errEmbed],
                ephemeral: true
            })

        try {
            await member.timeout(null)
            interaction.reply({
                embeds: [succesEmbed]
            })
        } catch (err) {
            console.log(err)
        }
    }
}