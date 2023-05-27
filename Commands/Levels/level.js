const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js')
const Levels = require('discord.js-leveling')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('level')
        .setDescription("Adjust a user's levels.")
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator)
        .addSubcommand(subcommand =>
            subcommand
                .setName('add')
                .setDescription('Add levels to a user.')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user.')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option
                        .setName('amount')
                        .setDescription('Amount of levels.')
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('remove')
                .setDescription('Remove xp to a user.')
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user.')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option
                        .setName('amount')
                        .setDescription('Amount of levels.')
                        .setMinValue(0)
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('set')
                .setDescription("Set a User's levels")
                .addUserOption(option =>
                    option
                        .setName('target')
                        .setDescription('Select a user.')
                        .setRequired(true)
                )
                .addIntegerOption(option =>
                    option
                        .setName('amount')
                        .setDescription('Amount of levels.')
                        .setMinValue(0)
                        .setRequired(true)
                )
        ),
    async execute(interaction) {
        const { options, guildId } = interaction;

        const sub = options.getSubcommand()
        const target = options.getUser('target')
        const amount = options.getInteger('amount')
        const embed = new EmbedBuilder()

        try {
            switch (sub) {
                case "add":
                    await Levels.appendLevel(target.id, guildId, amount)
                    embed.setDescription(`<:succesfully:1080625167958560829> Succesfully added ${amount} levels to ${target}.`)
                        .setColor('DarkGold')
                        .setTimestamp()
                    break;

                case "remove":
                    await Levels.subtractLevel(target.id, guildId, amount)
                    embed.setDescription(`<:succesfully:1080625167958560829> Succesfully removed ${amount} levels from ${target}.`)
                        .setColor('DarkGold')
                        .setTimestamp()
                    break;

                case "set":
                    await Levels.setLevel(target.id, guildId, amount)
                    embed.setDescription(`<:rank:1080625116997759047> Set ${target}'s levels to ${amount}.`)
                        .setColor('DarkGold')
                        .setTimestamp()
                    break;
            }
        } catch (err) {
            console.log(err)
        }

        interaction.reply({ embeds: [embed], ehemeral: true })
    }
}