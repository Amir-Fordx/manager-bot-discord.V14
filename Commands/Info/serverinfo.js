const { SlashCommandBuilder, EmbedBuilder, ChannelType, GuildVerificationLevel, GuildExplicitContentFilter, GuildNSFWLevel } = require('discord.js');
const { split } = require('lodash');

module.exports = {
    data: new SlashCommandBuilder()
    .setName('serverinfo')
    .setDescription('Get information aboute the server.')
    .setDMPermission(false),

    async execute(interaction) {
        const { guild } = interaction;
        const { members, channels, emojis, roles, stickers } = guild;

        const sortedRoles = roles.cache.map(role => role).slice(1, roles.cache.size).sort((a, b) => b.position - a.position)
        const userRoles = sortedRoles.filter(role => !role.managed)
        const managedRoles = sortedRoles.filter(role => role.managed)
        const botCount = members.cache.filter(member => member.user.bot).sizeM

        const maxDisplayRoles = (roles, maxFieldLength = 1024) => {
            let totalLength = 0;
            const result = [];

            for (const role of roles) {
                const roleString = `<@&${role.id}>`;

                if(roleString.length + totalLength > maxFieldLength)
                break;

                totalLength += roleString.length + 1
                result.push(roleString)
            }
            return result.length
        };
        const getChannelTypeSize = type => channels.cache.filter(channel => type.includes(channel.type)).size;
        const totalChannels = getChannelTypeSize([ ChannelType.GuildText, ChannelType.GuildNews, ChannelType.GuildVoice, ChannelType.GuildStageVoice, ChannelType.GuildForum, ChannelType.GuildPublicThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread, ChannelType.GuildCategory, ])

        const embed = new EmbedBuilder()
        .setColor('DarkNavy')
        .setTitle(`<:pin:1080625098186293248> ${guild.name}'s Information`)
        .setThumbnail(guild.iconURL({ size: 1024 }))
        .setImage(guild.bannerURL({ size: 1024 }))
        .addFields(
            { name: '<:help:1080624300471615568> Description', value: `${guild.description || 'None'}`},
            {
                name: '<:uptime:1080625242747187202> General',
                value: [
                    `**Created At** <t:${parseInt(guild.createdTimestamp / 1000)}:R>`,
                    `**ID** ${guild.id}`,
                    `**Owner** <@${guild.ownerId}>`,
                    `**Language** ${new Intl.DisplayNames(['en'], { type: 'language'}).of(guild.preferredLocale)}`,
                    `**VanityURL()** ${guild.vanityURLcode || 'None'}`
                ].join('\n')
            },
            {
                name: `<:info:1080631288886722650> Member's`,
                value: `${guild.memberCount}`,
                inline: true
            },
            {
                name: `<:reload:1080625137419816980> User Roles (${maxDisplayRoles(userRoles)} of ${userRoles.length})`,
                value: `${userRoles.slice(0, maxDisplayRoles(userRoles)).join(" ") || 'None'}`
            },
            {
                name: `<:reload:1080625137419816980> Bot Roles (${maxDisplayRoles(managedRoles)} of ${managedRoles.length})`,
                value: `${managedRoles.slice(0, maxDisplayRoles(managedRoles)).join(' ') || 'None'}`
            },
            {
                name: `<:panel:1080625085922148493> Total Channel's (${totalChannels})`,
                value: [
                    `**Text** ${getChannelTypeSize([ChannelType.GuildText, ChannelType.GuildForum, ChannelType.GuildNews])}`,
                    `**Voice** ${getChannelTypeSize([ChannelType.GuildVoice, ChannelType.GuildStageVoice])}`,
                    `**Thread** ${getChannelTypeSize([ChannelType.GuildPrivateThread, ChannelType.GuildPrivateThread, ChannelType.GuildNewsThread])}`,
                    `**Category** ${getChannelTypeSize([ChannelType.GuildCategory])}`
                ].join('\n'),
                inline: true
            },
            {
                name: `<:reload:1080625137419816980> Emojis (${emojis.cache.size + stickers.cache.size})`,
                value: [
                    `**Animated** ${emojis.cache.filter(emoji => emoji.animated).size}`,
                    `**Statics** ${emojis.cache.filter(emoji => !emoji.animated).size}`,
                    `**Stickers** ${stickers.cache.size}`,
                ].join('\n'),
                inline: true
            },
            {
                name: '<:welcome:1080625255476908173> Nitro',
                value: [
                    `**Level** ${guild.premiumTier || 'None'}`,
                    `**Boost's** ${guild.premiumSubscriptionCount}`,
                    `**Booster's** ${guild.members.cache.filter(member => member.roles.premiumSubscriberRole).size}`,
                ].join('\n'),
                inline: true
            },
            {
                name: '<:url:1080633976198287451> Banner',
                value: guild.bannerURL() ? "** **" : 'None'
            }
        )
        interaction.reply({ embeds: [embed]})
    }
}