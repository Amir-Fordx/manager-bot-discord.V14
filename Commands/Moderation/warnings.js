const { EmbedBuilder, SlashCommandBuilder, PermissionFlagsBits } = require('discord.js')
const warningSchema = require('../../Models/warning')
// Warning Systeam, Add Our Remove Warn To Member's.
module.exports = {
    data: new SlashCommandBuilder()
        .setName('warnings')
        .setDescription('Fully complate warning systeam.')
        .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers)
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add warning to a user')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
                .addStringOption(option =>
                    option
                        .setName('reason')
                        .setDescription('Provide a reason.')
                        .setRequired(false)
                )
                .addStringOption(option =>
                    option
                        .setName('evidence') //To name the complainant and...
                        .setDescription('Provide a evidence.')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('check')
                .setDescription('Check warning of a user')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove a specific warning from a user.')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option
                        .setName('id')
                        .setDescription('Provide the warnings id.')
                        .setRequired(false)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('clear')
                .setDescription('Clera all warning from a user.')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user')
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const { options, guildId, user, member } = interaction;

        const sub = options.getSubcommand(["add", "check", "remove", "clear"])
        const target = options.getUser('target')
        const reason = options.getString('reason') || 'No reason provided';
        const evidence = options.getString('evidence') || 'None provided';
        const warnId = options.getInteger('id') - 1;
        const warnDate = new Date(interaction.createdTimestamp).toLocaleDateString();

        const userTag = `${target.username}#${target.discriminator}`

        const embed = new EmbedBuilder()

        switch (sub) {
            case 'add':
                warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err;

                    if (!data) {
                        data = new warningSchema({
                            GuildID: guildId,
                            UserID: target.id,
                            UserTag: userTag,
                            Content: [
                                {
                                    ExecuterId: user.id,
                                    ExecuterTag: user.tag,
                                    Reason: reason,
                                    Evidence: evidence,
                                    Data: warnDate
                                }
                            ]
                        })
                    } else {
                        const warnContent = {
                            ExecuterId: user.id,
                            ExecuterTag: user.tag,
                            Reason: reason,
                            Evidence: evidence,
                            Data: warnDate
                        }
                        data.Content.push(warnContent)
                    }
                    data.save();
                })

                embed.setColor('DarkGreen')
                    .setDescription(`
            <:succesfully:1080625167958560829> Warn added: <@${target.id}>
            <:reason:1080625128142028800> **Reason**: ${reason}
            <:reload:1080625137419816980> **Evidence**: ${evidence}
            `)
                    .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamic: true }) })
                    .setTimestamp()

                interaction.reply({ embeds: [embed] })

                break;

            case 'check':
                warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err;

                    if (data) {
                        embed.setColor('DarkGreen')
                            .setDescription(`${data.Content.map(
                                (w, i) =>
                                    `<:info:1080631288886722650> **ID**: -- [ \`${i + 1}\` ]
                            <:moderator:1080631209396281364> **By**: <@${w.ExecuterId}>
                            <:time:1080625210673332294> **Date**: \`${w.Data}\`
                            <:reason:1080625128142028800> **Reason**: \`${w.Reason}\`
                            <:reload:1080625137419816980> **Evidence**: \`${w.Evidence}\`\n\n`
                            ).join(" ")}`)
                            .setFooter({ text: member.user.tag, iconURL: member.displayAvatarURL({ dynamci: true }) })
                            .setTimestamp()

                        interaction.reply({ embeds: [embed] })

                    } else {
                        embed.setColor('DarkOrange')
                            .setDescription(`<:info:1080631288886722650> <@${target.id}> has no warnings.`)
                            .setFooter({ text: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()

                        interaction.reply({ embeds: [embed] })
                    }
                })

                break;

            case 'remove':
                warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err;

                    if (data) {
                        data.Content.splice(warnId, 1)
                        data.save()

                        embed.setColor('DarkGreen')
                            .setDescription(`<:succesfully:1080625167958560829> <@${user.id}>'s warning id: ${warnId + 1} has been removed.`)
                            .setFooter({ text: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()

                        interaction.reply({ embeds: [embed] })
                    } else {
                        embed.setColor('DarkOrange')
                            .setDescription(`<:info:1080631288886722650> <@${target.id}> has no warnings.`)
                            .setFooter({ text: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()

                        interaction.reply({ embeds: [embed] })
                    }
                })

                break;

            case 'clear':
                warningSchema.findOne({ GuildID: guildId, UserID: target.id, UserTag: userTag }, async (err, data) => {
                    if (err) throw err;

                    if (data) {
                        await warningSchema.findOneAndDelete({ GuildID: guildId, UserID: target.id, UserTag: userTag })

                        embed.setColor('DarkGreen')
                            .setDescription(`<:succesfully:1080625167958560829> Warnings were cleared. <@${target.id}>`)
                            .setFooter({ text: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()

                        interaction.reply({ embeds: [embed] })
                    } else {
                        embed.setColor('DarkOrange')
                            .setDescription(`<:info:1080631288886722650> <@${target.id}> has no warnings.`)
                            .setFooter({ text: member.user.tag, iconURL: member.user.displayAvatarURL({ dynamic: true }) })
                            .setTimestamp()

                        interaction.reply({ embeds: [embed] })
                    }
                })

                break;

        }

    }
}