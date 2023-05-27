const { ComponentType, EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder} = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Get help of Commands.')
    .setDMPermission(false),

    async execute(interaction) {
        const { client, channel } = interaction;

        const emojis = {
            general: '<:pin:1080625098186293248>',
            info: '<:info:1080631288886722650>',
            owner: '<:owner:1080625060622123028>',
            levels: '<:levels:1080631317923893258>',
            moderation: '<:moderator:1080631209396281364>',
            roles: '<:welcome:1080625255476908173>',
            mafia: `<:time:1080625210673332294> `
        }

        function getCommand(name) {
            const getCommandID = client.application.commands.cache.filter((cmd) => cmd.name === name)
            .map((cmd) => cmd.id)

            return getCommandID;
        }

        const directories = [
            ...new Set(client.commands.map((cmd) => cmd.folder))
        ]

        const formatString = (str) =>
        `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;

        const categories = directories.map((dir) => {
            const getCommand = client.commands
            .filter((cmd) => cmd.folder === dir)
            .map((cmd) => {
                return {
                    name: cmd.data.name,
                    description: cmd.data.description || 'There is no description for this command.'
                }
            })

            return {
                directory: formatString(dir),
                commands: getCommand
            }
        })

        const embed = new EmbedBuilder()
        .setDescription("<:panel:1080625085922148493> See lists of commands by selecting a category down blow!")
        .setThumbnail(`${client.user.displayAvatarURL()}`)
        .setColor('Grey')
        .setAuthor({ name: `${client.user.username}'s Commands`, iconURL: client.user.avatarURL() })

        const components = (state) => [
            new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                .setCustomId('help-menu')
                .setPlaceholder('Find a category')
                .setDisabled(state)
                .addOptions(
                    categories.map((cmd) => {
                        return {
                            label: cmd.directory,
                            value: cmd.directory.toLowerCase(),
                            description: `Commands from ${cmd.directory} category.`,
                            emoji: emojis[cmd.directory.toLowerCase() || null]
                        }
                    })
                )
            )
        ]
        const initalMessage = await interaction.reply({
            embeds: [embed],
            components: components(false)
        })

        const filter = (interaction) => 
        interaction.user.id === interaction.member.id;

        const collector = channel.createMessageComponentCollector({
            filter,
            componentType: ComponentType.StringSelect,
        })

        collector.on('collect', (interaction) => {
            const [directory] = interaction.values;
            const category = categories.find(
                (x) => x.directory.toLowerCase() === directory
            )

            const categoryEmbed = new EmbedBuilder()
            .setTitle(`${emojis[directory.toLowerCase()] || null} ${formatString(directory)} commands`)
            .setDescription(`<:panel:1080625085922148493> A list of all the commands categorized under ${directory}.`)
            .setColor('Gold')
            .addFields(
                category.commands.map((cmd) => {
                    return {
                        name: `</${cmd.name}:${getCommand(cmd.name)}>`,
                        value: `\`${cmd.description}\``,
                        inline: true
                    }
                })
            )

            interaction.update({ embeds: [categoryEmbed] })
        })

        collector.on('end', () => {
            initalMessage.edit({ components: components(true) })
        })
    }
}