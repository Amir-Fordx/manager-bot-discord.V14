const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
// Mafia Buuton Channel.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('buttonmafia')
        .setDescription('set your mafia channel')
        .addChannelOption(option =>
            option
                .setName('channel')
                .setDescription('send a mafia role embed in this channel')
                .setRequired(true)
        )
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    async execute(interaction) {
        const { client, guild } = interaction;
        const channel = interaction.options.getChannel('channel')
        const verifyEmbed = new EmbedBuilder()
            .setTitle('<:Mafia_Player:1085210495096733696> Mafia Role')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription('__**Click the button below to get the mafia role**__')
            .setColor(0x5fb041)
            .setFooter({text: guild.name, iconURL: guild.iconURL()})
        let sendChannel = channel.send({
            embeds: ([verifyEmbed]),
            components: [
                new ActionRowBuilder().setComponents(
                    new ButtonBuilder().setCustomId('mafia-role').setLabel('Mafia Role').setStyle(ButtonStyle.Success)
                )
            ]
        })
        if (!sendChannel) {
            return interaction.reply({ content: '<:err:1080624265428226248> there was an error! try again later.', ephemeral: true })
        } else {
            return interaction.reply({ content: '<:succesfully:1080625167958560829> mafia channel was succesfully set.', ephemeral: true })
        }
    }
}