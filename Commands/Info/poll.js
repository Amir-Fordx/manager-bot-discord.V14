const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits, ChannelType } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('event')
        .setDescription('Create a pool and send it to a cretatin channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Type the event name')
                .setRequired(true)
        )
        .addStringOption(option =>
            option
                .setName('description')
                .setDescription('Describe the poll')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('Where do you want to send the poll to?')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildText)
        ),

    async execute(interaction) {
        const { options, guild } = interaction;

        const Name = options.getString('name')
        const channel = options.getChannel('channel')
        const description = options.getString('description')

        const embed = new EmbedBuilder()
            .setThumbnail(`${guild.iconURL()}`)
            .setImage('https://media.discordapp.net/attachments/1077872072841232435/1079916193269415976/Test2.png?width=406&height=406')
            .setTitle(`<:event:1080632533210890360> **Name:**\n ${Name}`)
            .setColor('Gold')
            .setDescription(`<:info:1080631288886722650> **Description:**\n __${description}__`)

        try {
            const m = await channel.send({ embeds: [embed] })
            await m.react('<:success:1080625179857797181>')
            await m.react('<:error:1080624284482949161>')
            await interaction.reply({ content: '<:succesfully:1080625167958560829> Poll was succesfully sent to channel.', ephemeral: true })
        } catch (err) {
            console.log(err)
        }
    }
}