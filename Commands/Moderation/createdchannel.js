const {
    SlashCommandBuilder,
    PermissionFlagsBits,
    ChannelType,
    GuildCategory,
    EmbedBuilder
} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('create-channel')
        .setDescription('Create a custom discord channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels)
        .addStringOption(option =>
            option
                .setName('channeltype')
                .setDescription('Set the type of channel.')
                .setRequired(true)
                .addChoices({
                    name: 'Text',
                    value: 'textchannel'
                }, {
                    name: 'Voice',
                    value: 'voicechannel'
                })
        )
        .addStringOption(option =>
            option
                .setName('name')
                .setDescription('Set the name of the channel.')
                .setRequired(true)
        )
        .addChannelOption(option =>
            option
                .setName('parent')
                .setDescription('Set the parent of the channel.')
                .setRequired(true)
                .addChannelTypes(ChannelType.GuildCategory)
        )
        .addRoleOption(option =>
            option
                .setName('permission')
                .setDescription('The permission role the channel.')
                .setRequired(true)
        )
        .addRoleOption(option =>
            option
                .setName('everyone')
                .setDescription('Tag @everyone')
                .setRequired(true)
        ),
    async execute(interaction) {
        const { guild, member, options } = interaction;

        const { ViewChannel, ReadMessageHistory, SendMessages, Connect, Speak } = PermissionFlagsBits;

        const channeltype = options.getString('channeltype')
        const channelname = options.getString('name')
        const parent = options.getChannel('parent')
        const everyone = options.getRole('everyone')
        const permissions = options.getRole('permission')

        if (channeltype === 'textchannel') {
            await guild.channels.create({
                name: `${channelname}`,
                type: ChannelType.GuildText,
                parent: parent,

                permissionOverwrites: [
                    {
                        id: permissions,
                        allow: [ViewChannel, SendMessages, ReadMessageHistory]
                    },
                    {
                        id: everyone,
                        deny: [ViewChannel, SendMessages, ReadMessageHistory]
                    }
                ]
            })
        }

        if (channeltype === 'voicechannel') {
            await guild.channels.create({
                name: `${channelname}`,
                type: ChannelType.GuildVoice,
                parent: parent,

                permissionOverwrites: [
                    {
                        id: permissions,
                        allow: [ViewChannel, Connect, Speak]
                    },
                    {
                        id: everyone,
                        deny: [ViewChannel, Connect, Speak]
                    }
                ]
            })
        }
        const channel = options.getChannel('channel')
        const embed = new EmbedBuilder()
            .setTitle('Channel Create')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`<:pin:1080625098186293248> **Name:** \`[${channelname}]\`\n<:moderator:1080631209396281364> **Moderator:** <@${interaction.user.id}>\n<:succesfully:1080625167958560829> **Action:** __succesfully__`)
            .setColor('Grey')

        await interaction.reply({ embeds: [embed] })
    }
}