const { CommandInteraction } = require('discord.js')
const Sleep = (ms = 3000) => new Promise((r) => setTimeout(r, ms));
// Select Menu Pannels Event. Files inside the roles folder.
module.exports = {
    name: 'interactionCreate',
    execute(interaction, client) {
        const { customId, values, guild, member } = interaction;
        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName)
            if (!command) {
                interaction.reply({ content: 'outdated command' })
            }
            command.execute(interaction, client)
        } else if (interaction.isSelectMenu()) {
            if (customId == 'reaction-roles') {
                // Add & Remove Roles.
                async function main() {
                    interaction.message.components.forEach((row) => {
                        row.components.forEach((menu) => {
                            menu.options.forEach(async (opt) => {
                                if (
                                    interaction.member.roles.cache.has(opt.value) &&
                                    !interaction.values.includes(opt.value)
                                )
                                    await interaction.member.roles.remove(opt.value);
                            });
                        });
                    });

                    await Sleep(650);
                    if (interaction.values[0])
                        await interaction.member.roles.add(interaction.values);

                    try {
                        let roles = interaction.values.map(
                            (v) => interaction.guild.roles.cache.get(v).name
                        );
                        await interaction.reply({
                            embeds: [
                                {
                                    color: 0x00ff00,
                                    description: `Roles has been updated: "${roles.join('" &"')}"`,
                                },
                            ],
                            ephemeral: true,
                        });
                    } catch (_err) { }
                }
                main()

            }
        } else {
            return;
        }

    }
}