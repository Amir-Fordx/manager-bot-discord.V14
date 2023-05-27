const { SlashCommandBuilder, CommandInteraction, PermissionFlagsBits, EmbedBuilder } = require('discord.js')

module.exports = {
    data: new SlashCommandBuilder()
        .setName('clear')
        .setDescription('clear a specific amount of message from a target or channel.')
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
        .addIntegerOption(option =>
            option
                .setName('amount')
                .setDescription('amount of message to clear.')
                .setRequired(true)
        )
        .addUserOption(option =>
            option
                .setName('target')
                .setDescription('select a target to clear their message.')
                .setRequired(false)
        ),
    async execute(interaction) {
        const { channel, options } = interaction;
        const amount = options.getInteger('amount')
        const target = options.getUser('target')

        const messages = await channel.messages.fetch({
            limit: amount + 1,
        })
        const res = new EmbedBuilder()
            .setColor(0x5fb041)

        if (target) {
            let i = 0;
            const filtered = [];

            (await messages).filter((msg) => {
                if (msg.author.id === target.id && amount > i) {
                    filtered.push(msg)
                    i++;
                }
            })
            await channel.bulkDelete(filtered).then(messages => {
                res.setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
                res.setTitle('Clear')
                res.setDescription(`<:clear:1080640325825089566> **Message:** \`${messages.size}\` \n<:info:1080631288886722650> **Target:** ${target}\n<:moderator:1080631209396281364> **Moderator:** <@${interaction.user.id}>\n<:succesfully:1080625167958560829> **Result:** __succesfully__`)
                interaction.reply({
                    embeds: [res]
                })
            })
        } else {
            await channel.bulkDelete(amount, true).then(messages => {
                res.setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true })}`)
                res.setTitle('Clear')
                res.setDescription(`<:clear:1080640325825089566> **Message:** \`${messages.size}\` \n<:info:1080631288886722650> **Target:** \`Channel\`\n<:moderator:1080631209396281364> **Moderator:** <@${interaction.user.id}> \n<:succesfully:1080625167958560829> **Result:** __succesfully__`)
                interaction.reply({
                    embeds: [res]
                })
            })
        }
    }
}