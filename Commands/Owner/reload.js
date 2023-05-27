const { client, SlashCommandBuilder, EmbedBuilder } = require('discord.js')
const { loadCommands } = require('../../Handlers/commandHandler')
const { loadEvents } = require('../../Handlers/eventHandler')
const Owner = require('../../config.json')
// Reload Events & Reload Commands. | Only For Bot Developer's.
module.exports = {
    data: new SlashCommandBuilder()
    .setName('reload')
    .setDescription('Reload your Commands or your Events.')
    .addSubcommand(subcommand =>
        subcommand
        .setName('commands')
        .setDescription('Reload your Commands.')
    )
    .addSubcommand(subcommand =>
        subcommand
        .setName('events')
        .setDescription('Realos your Commands.')
        ),

        async execute(interaction, client) {
            const { user } = interaction;

            // Developer's ID.
            if(user.id !== '807033850609795102') return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor('Red')
                    .setDescription("<:err:1080624265428226248> This Command is only for the bot Developers!")
                ], ephemeral: true
            })

            const sub = interaction.options.getSubcommand()
            const embed = new EmbedBuilder()
            .setColor('Gold')
            .setTitle('<:reload:1080625137419816980> Reloaded')

            switch (sub) {
                case 'commands': {
                    loadCommands(client)
                    interaction.reply({
                        embeds: [
                            embed.setDescription('```js\n' + `${loadCommands}` + '```')
                        ]
                    })
                    console.log(`${user.tag} has Reloaded The Commands.`)
                }

                break;

                case 'events': {
                    loadEvents(client)
                    interaction.reply({
                        embeds: [
                            embed.setDescription('```js\n' + `${loadEvents}` + '```')
                        ]
                    })
                    console.log(`${user.tag} has Reloaded The Events.`)
                }
            }
            
        }
}