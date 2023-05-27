const { EmbedBuilder } = require("discord.js");

function handleLogs(client) {
    const logSchema = require("../Models/Logs");

    function send_log(guildId, embed) {
        logSchema.findOne({ Guild: guildId }, async (err, data) => {
            const LogChannel = client.channels.cache.get(data.Channel);
        });
    }

    // Message Delete
    client.on("messageDelete", function (message) {
        if (message.author.bot) return;

        const embed = new EmbedBuilder()
            .setTitle('Message Deleted')
            .setColor('Grey')
            .setDescription(`

            **Author : ** <@${message.author.id}>

            **Channel : ** __<#${message.channel.id}>__

            **Deleted Message : **\`${message.content.replace(/`/g, "'")}\`

            **Date : ** \`${message.createdAt}\`
            `)
            .setThumbnail(`${message.author.displayAvatarURL()}`)
            .setTimestamp()

        const Log = client.channels.cache.get('1083196278483189770').send({ embeds: [embed] })
    });

    // Channel Permissions Update
    client.on("guildChannelPermissionsUpdate", (channel, oldPermissions, newPermissions,) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Updated')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`<#${channel.id}> | Permissions updated!\n` + ' ```js\n' + `Name:${channel.name}\nID:${channel.id}` + '```')
            .setTimestamp();

        const Log = client.channels.cache.get('1083196093195628574').send({ embeds: [embed] })
    })

    // Member Boost
    client.on("guildMemberBoost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Add Boost')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`<@${member.user.id}> Has started boosting  **${member.guild.name}!**`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196686249230407').send({ embeds: [embed] })

    })

    // Member Unboost
    client.on("guildMemberUnboost", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Remove Boost')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`<@${member.user.id}> Has stopped boosting  **${member.guild.name}!**`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196686249230407').send({ embeds: [embed] })

    })

    // Member Role Add
    client.on("guildMemberRoleAdd", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Add')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`**User**: <@${member.user.id}> \n**Added**: <@&${role.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196789894684672').send({ embeds: [embed] })

    })

    // Member Role Remove
    client.on("guildMemberRoleRemove", (member, role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Remove')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`**User**: <@${member.user.id}> \n**Removed**: <@&${role.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196789894684672').send({ embeds: [embed] })

    })

    // Member Nickname Update
    client.on("guildMemberNicknameUpdate", (member, oldNickname, newNickname) => {

        const embed = new EmbedBuilder()
            .setTitle('Nickname Updated')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`**User**: <@${member.user.id}>\n**Old:**: \`${oldNickname}\` \n**New: ** \`${newNickname}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196789894684672').send({ embeds: [embed] })

    })

    // Guild member add // Set Nickname.
    client.on("guildMemberAdd", async (member) => {
        member.roles.add('1083210753001140284')
        await member.setNickname(`${member.user.username}` + 'ₛₘₖ')

        const embed = new EmbedBuilder()
            .setTitle('User Joined')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Green')
            .setDescription(`**Member:** ${member.user}\n**ID:** \`${member.user.id}\`\n**Tag:** \`${member.user.tag}\``,
                member.user.displayAvatarURL({ dynamic: true }))
            .setTimestamp();

        const Log = client.channels.cache.get('1083196331406921779').send({ embeds: [embed] })

    });

    // Member Remove
    client.on("guildMemberRemove", (member) => {

        const embed = new EmbedBuilder()
            .setTitle('User Left')
            .setThumbnail(`${member.user.displayAvatarURL()}`)
            .setColor('Red')
            .setDescription(`**Member:** ${member.user}\n**ID:** \`${member.user.id}\`\n**Tag:** \`${member.user.tag}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196331406921779').send({ embeds: [embed] })

    });

    // Boost Level Up
    client.on("guildBoostLevelUp", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('Boost Level Up')
            .setColor('Red')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`**${guild.name}** **reached the boost level** \`${newLevel}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196686249230407').send({ embeds: [embed] })

    })

    // Boost Level Down
    client.on("guildBoostLevelDown", (guild, oldLevel, newLevel) => {

        const embed = new EmbedBuilder()
            .setTitle('Boost Level Down')
            .setColor('Grey')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`**${guild.name}** lost a level from\n \`${oldLevel}\` to \`${newLevel}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196686249230407').send({ embeds: [embed] })

    })

    // Banner Add
    client.on("guildBannerAdd", (guild, bannerURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Banner Add')
            .setColor('Grey')
            .setImage(bannerURL)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196739848245269').send({ embeds: [embed] })

    })

    // Vanity URL Add
    client.on("guildVanityURLAdd", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Added')
            .setColor('Grey')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`\`${vanityURL}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196739848245269').send({ embeds: [embed] })

    })

    // Vanity URL Remove
    client.on("guildVanityURLRemove", (guild, vanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Removed')
            .setColor('Grey')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`\`${vanityURL}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196739848245269').send({ embeds: [embed] })

    })

    // Vanity URL Update
    client.on("guildVanityURLUpdate", (guild, oldVanityURL, newVanityURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Vanity Updated')
            .setColor('Grey')
            .setThumbnail(`${guild.iconURL()}`)
            .setDescription(`\`${oldVanityURL}\` **to** \`${newVanityURL}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196739848245269').send({ embeds: [embed] })

    })

    // message Pinned
    client.on("messagePinned", (message) => {

        const embed = new EmbedBuilder()
            .setTitle('Message Pinned')
            .setColor('Grey')
            .setDescription(`${message} ** *has been pinned by* ** ${message.author}`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196278483189770').send({ embeds: [embed] })

    })

    // Message Edit
    client.on("messageContentEdited", (message, oldContent, newContent) => {

        const embed = new EmbedBuilder()
            .setTitle('Message Edited')
            .setColor('Grey')
            .setDescription(`** *Message Edited from* ** \`${oldContent}\` **to** \`${newContent}\` by <@${message.author.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196278483189770').send({ embeds: [embed] })

    })

    // Role Position Updated
    client.on("rolePositionUpdate", (role, oldPosition, newPosition) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Position Updated')
            .setColor('Grey')
            .setDescription(`**Role**: <@&${role.id}>` + "**\nOld Position**: " + `\`${oldPosition}\`` + "**\nNew position**: " + `\`${newPosition}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196227270737940').send({ embeds: [embed] })

    })

    // Role Permission Updated
    client.on("rolePermissionsUpdate", (role, oldPermissions, newPermissions) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Permission Updated')
            .setColor('Grey')
            .setDescription(`**Role**: <@&${role.id}>` + " **\nOld**: " + `\`${oldPermissions}\`` + " **\nNew**: " + `\`${newPermissions}\``)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196227270737940').send({ embeds: [embed] })

    })

    // Avatar Updated
    client.on("userAvatarUpdate", (user, oldAvatarURL, newAvatarURL) => {

        const embed = new EmbedBuilder()
            .setTitle('Avatar Updated')
            .setColor('Grey')
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setDescription(`**User**: <@${user.id}> **\nOld: ** ${oldAvatarURL} **\nNew: ** ${newAvatarURL}]`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196789894684672').send({ embeds: [embed] })

    })

    // Username Updated
    client.on("userUsernameUpdate", (user, oldUsername, newUsername) => {

        const embed = new EmbedBuilder()
            .setTitle('Username Updated')
            .setColor('Grey')
            .setThumbnail(`${user.displayAvatarURL()}`)
            .setDescription(`<@${user.id}> **\nOld: ** ${oldUsername} **\nNew: ** ${newUsername}`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196789894684672').send({ embeds: [embed] })

    })

    // Joined VC
    client.on("voiceChannelJoin", (member, channel) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Voice join')
            .setDescription(`**User**: <@${member.user.id}>` + '\n**Channel**: ' + `<#${channel.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196419541844068').send({ embeds: [embed] })

    })

    // Left VC
    client.on("voiceChannelLeave", (member, channel) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Voice Left')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription(`**User**: <@${member.user.id}>` + '\n**Channel**: ' + `<#${channel.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196419541844068').send({ embeds: [embed] })

    })

    // VC Switch
    client.on("voiceChannelSwitch", (member, oldChannel, newChannel) => {

        const embed = new EmbedBuilder()
            .setTitle('Voice Channel Switched')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`**User: **<@${member.user.id}>` + "\n**Left** " + `<#${oldChannel.id}>` + "\n**Joined** " + `<#${newChannel.id}> `)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196419541844068').send({ embeds: [embed] })

    })

    // VC Mute
    client.on("voiceChannelMute", (member, muteType) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Muted')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription(`**User**: ` + `<@${member.user.id}>` + '\n**Type**: ' + muteType)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196555982557234').send({ embeds: [embed] })

    })

    // VC Unmute
    client.on("voiceChannelUnmute", (member, oldMuteType) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Unmuted')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User**:' + `<@${member.user.id}>` + `\n**Type**: ` + oldMuteType)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196555982557234').send({ embeds: [embed] })

    })

    // VC Defean
    client.on("voiceChannelDeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Deafend')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User**: ' + `<@${member.user.id}>` + `\n**Type**: ` + deafType)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196555982557234').send({ embeds: [embed] })

    })

    // VC Undefean
    client.on("voiceChannelUndeaf", (member, deafType) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Undeafend')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User**: ' + `<@${member.user.id}>` + `\n**Type**: ` + deafType)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196555982557234').send({ embeds: [embed] })

    })

    // User Started to Stream
    client.on("voiceStreamingStart", (member, voiceChannel) => {


        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Started Stream')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User**: ' + `<@${member.user.id}>` + "\n\n**Channel** " + `<#${voiceChannel.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('1083196033238061066').send({ embeds: [embed] })

    })

    // User Stopped to Stream
    client.on("voiceStreamingStop", (member, voiceChannel) => {


        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setTitle('Stopped Stream')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User**: ' + `<@${member.user.id}>` + "\n\n**Channel** " + `<#${voiceChannel.id}>`)
            .setTimestamp();

        const Log = client.channels.cache.get('11083196033238061066').send({ embeds: [embed] })
    });

    // Guild Member Offline
    client.on("guildMemberOffline", (member, oldStatus) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User Offline**' + `<@${member.user.id}>` + "\n Went offline!")
            .setTimestamp();

        const Log = client.channels.cache.get('1083196636940992633').send({ embeds: [embed] })

    });

    // Guild Member Online
    client.on("guildMemberOnline", (member, newStatus) => {

        const embed = new EmbedBuilder()
            .setColor('Grey')
            .setThumbnail(`${member.displayAvatarURL()}`)
            .setDescription('**User Online**' + `<@${member.user.id}>` + "\n**Was offline and is now** " + newStatus + "!")
            .setTimestamp();

        const Log = client.channels.cache.get('1083196636940992633').send({ embeds: [embed] })

    });

    // Role Created
    client.on("roleCreate", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Created')
            .setColor('Green')
            .setDescription(`**Role**: ${role}` + '```js\n' + `Rolename: ${role.name}\n` + `RoleID: ${role.id}\n` + `HEX Code: ${role.hexColor}\n` + `Position: ${role.position}` + '```')
            .setTimestamp();

        const Log = client.channels.cache.get('1083196227270737940').send({ embeds: [embed] })

    });

    // Role Deleted
    client.on("roleDelete", (role) => {

        const embed = new EmbedBuilder()
            .setTitle('Role Deleted')
            .setColor('Red')
            .setDescription(`**Role**: ${role}` + '```js\n' + `Rolename: ${role.name}\n` + `RoleID: ${role.id}\n` + `HEX Code: ${role.hexColor}\n` + `Position: ${role.position}` + '```')
            .setTimestamp();

        const Log = client.channels.cache.get('1083196227270737940').send({ embeds: [embed] })

    });

    // Channel Created
    client.on("channelCreate", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Created')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`Name: <#${channel.id}>` + '```js\n' + `Channel: ${channel.name}\n` + `ID: ${channel.id}` + '```')
            .setTimestamp();

        const Log = client.channels.cache.get('1083196093195628574').send({ embeds: [embed] })

    });

    // Channel Deleted
    client.on("channelDelete", (channel) => {

        const embed = new EmbedBuilder()
            .setTitle('Channel Deleted')
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setColor('Grey')
            .setDescription(`Name: <#${channel.id}>` + '```js\n' + `Channel: ${channel.name}\n` + `ID: ${channel.id}` + '```')
            .setTimestamp();

        const Log = client.channels.cache.get('1083196093195628574').send({ embeds: [embed] })

    });
}

module.exports = { handleLogs };