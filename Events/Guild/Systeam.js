const { EmbedBuilder, ButtonStyle, ActionRowBuilder, ButtonBuilder, Collection } = require('discord.js')
// Ticket Systeam, DONT TUCH EVENT, Just change the emojis & Roles ID.
const cooldown = new Collection();
module.exports = {
	name: 'interactionCreate',
	async execute(interaction) {
        if (interaction.isButton){
            if (interaction.customId == 'add-role') {
                const addEmbed = new EmbedBuilder()
                interaction.guild.members.cache.get(interaction.user.id).roles.add('1083926867943370812')
                interaction.reply({ embeds: [
                    addEmbed.setColor('Green')
                    .setDescription(`**Role** Has Benn Updated: <@&1083926867943370812>`)
                ], ephemeral: true })
            }
    
            if (interaction.customId == 'remove-role') {
                const ermoveEmbed = new EmbedBuilder()
                interaction.guild.members.cache.get(interaction.user.id).roles.remove('1083926867943370812')
                interaction.reply({ embeds: [
                    ermoveEmbed.setColor('Red')
                    .setDescription(`**Role** Has Benn Updated: <@&1083926867943370812>`)
                ], ephemeral: true })
            }
    
            if (interaction.customId == 'mafia-role') {
                if(interaction.member.roles.cache.some(role => role.id === '1083210751415693312')){
                    interaction.member.roles.remove('1083210751415693312')
                    interaction.reply({content: `role updated <@&1083210751415693312>`, ephemeral: true})
                } else {
                    interaction.member.roles.add('1083210751415693312')
                    interaction.reply({content: `role updated <@&1083210751415693312>`, ephemeral: true})
                }
            }
            if(interaction.customId == 'CloseTicketButton') {
            let LogMsgs = [];
            interaction.channel.send('Fetching Messages. . .')
            interaction.message.delete().then(async() => {
                const FMessges = await interaction.channel.messages.fetch();
                FMessges.forEach(msg => {
                    LogMsgs.push(`${msg.author.username}: ${msg.content}`)
                });
                interaction.channel.send('Deleteing. . .')
                setTimeout(() => {
                    const TicketLog = new EmbedBuilder()
                    .setColor('Grey')
                    .setTitle('Delete Ticket')
                    .setDescription(`**${interaction.channel.name}** is delete by <@${interaction.user.id}>\nTicket Created By <@${interaction.channel.topic}>\n\n${LogMsgs.join('\n')}`)
                    interaction.guild.channels.cache.get('1085889188978774058').send({ embeds: [TicketLog] })
                    interaction.channel.delete()
                    cooldown.set(`ticketcooldown-${interaction.user.id}`, Date.now())
                    setTimeout(() => {
                        cooldown.delete(`ticketcooldown-${interaction.user.id}`)
                    }, 300000)
                }, 8000)
            })
            }
        }  if(interaction.isStringSelectMenu()){
            if(interaction.customId != 'TicketSelectMenu')return ;
            // ----------------
            if (interaction.guild.channels.cache.find(channel => channel.topic == interaction.user.id)) {
                let OpenedTicket = new EmbedBuilder()
                .setColor('Grey')
                .setDescription('**You have already opened a ticket**')
                
                return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [OpenedTicket], ephemeral: true });
            };
            if(cooldown.has(`ticketcooldown-${interaction.user.id}`)){
                let OpenedTicket = new EmbedBuilder()
                .setColor('Grey')
                .setDescription('**You have just booked your ticket**')
                
                return interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [OpenedTicket], ephemeral: true });
            }
            // ----------------
            if(interaction.values[0] == 'TicketDeveloper'){
                interaction.guild.channels.create({
                    name: '🛠︱' + interaction.user.username,
                    topic: interaction.user.id,
                    parent: '1083923408246546542',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ 'ViewChannel' ]
                        }, {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                            deny: [ 'MentionEveryone' ]
                        }, {
                            id: '1079863186821500968',
                            allow: ['ViewChannel', 'SendMessages'],
                        }, {
                            id: '1083947099139362907',
                            allow: ['ViewChannel', 'SendMessages'],
                        }
                    ]
                }).then(ticketchannel => {
                    const CreateMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription(`**${ticketchannel} was created for you**`)
                    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [CreateMessage], ephemeral: true })
                    const TicketCloseMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription('The ticket is made for you\nYou should know that all your messages are saved in the log\nYou can click on the \`close\` button to close the ticket')
                    .setTimestamp()
                    .setThumbnail(interaction.user.avatarURL())
                    const TicketCloseButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('CloseTicketButton')
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel('CLOSE')
                    )
                    ticketchannel.send({ content: `<@${interaction.user.id}>/<@&1079863186821500968>/<@&1083947099139362907>` , embeds: [TicketCloseMessage], components: [TicketCloseButton] })
                })
            } if(interaction.values[0] == 'TicketRequest'){
                interaction.guild.channels.create({
                    name: '🚨︱' + interaction.user.username,
                    topic: interaction.user.id,
                    parent: '1083923408246546542',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ 'ViewChannel' ]
                        }, {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                            deny: [ 'MentionEveryone' ]
                        }, {
                            id: '1083543399338098820',
                            allow: ['ViewChannel', 'SendMessages'],
                        }, {
                            id: '1083210534058459167',
                            allow: ['ViewChannel', 'SendMessages'],
                        }
                    ]
                }).then(ticketchannel => {
                    const CreateMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription(`**${ticketchannel} was created for you**`)
                    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [CreateMessage], ephemeral: true })
                    const TicketCloseMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription('The ticket is made for you\nYou should know that all your messages are saved in the log\nYou can click on the \`close\` button to close the ticket')
                    .setTimestamp()
                    .setThumbnail(interaction.user.avatarURL())
                    const TicketCloseButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('CloseTicketButton')
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel('CLOSE')
                    )
                    ticketchannel.send({ content: `<@${interaction.user.id}>/<@&1083543399338098820>/<@&1083210534058459167>` , embeds: [TicketCloseMessage], components: [TicketCloseButton] })
                })
            } if(interaction.values[0] == 'TicketSupport'){
                interaction.guild.channels.create({
                    name: '⚖︱' + interaction.user.username,
                    topic: interaction.user.id,
                    parent: '1083923408246546542',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ 'ViewChannel' ]
                        }, {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                            deny: [ 'MentionEveryone' ]
                        }, {
                            id: '1083210535320948767',
                            allow: ['ViewChannel', 'SendMessages'],
                        }, {
                            id: '1084135266870099988',
                            allow: ['ViewChannel', 'SendMessages'],
                        }
                    ]
                }).then(ticketchannel => {
                    const CreateMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription(`**${ticketchannel} was created for you**`)
                    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [CreateMessage], ephemeral: true })
                    const TicketCloseMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription('The ticket is made for you\nYou should know that all your messages are saved in the log\nYou can click on the \`close\` button to close the ticket')
                    .setTimestamp()
                    .setThumbnail(interaction.user.avatarURL())
                    const TicketCloseButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('CloseTicketButton')
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel('CLOSE')
                    )
                    ticketchannel.send({ content: `<@${interaction.user.id}>/<@&1083210535320948767>/<@&1084135266870099988>` , embeds: [TicketCloseMessage], components: [TicketCloseButton] })
                })
            } if(interaction.values[0] == 'TicketOther'){
                interaction.guild.channels.create({
                    name: '🌐︱' + interaction.user.username,
                    topic: interaction.user.id,
                    parent: '1083923408246546542',
                    permissionOverwrites: [
                        {
                            id: interaction.guild.roles.everyone,
                            deny: [ 'ViewChannel' ]
                        }, {
                            id: interaction.user.id,
                            allow: ['ViewChannel', 'SendMessages'],
                            deny: [ 'MentionEveryone' ]
                        }, {
                            id: '311194511931998209',
                            allow: ['ViewChannel', 'SendMessages'],
                        }, {
                            id: '1008795060629934211',
                            allow: ['ViewChannel', 'SendMessages'],
                        }, {
                            id: '915182850075140127',
                            allow: ['ViewChannel', 'SendMessages'],
                        }
                    ]
                }).then(ticketchannel => {
                    const CreateMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription(`**${ticketchannel} was created for you**`)
                    interaction.reply({ content: `<@${interaction.user.id}>`, embeds: [CreateMessage], ephemeral: true })
                    const TicketCloseMessage = new EmbedBuilder()
                    .setColor('Grey')
                    .setDescription('The ticket is made for you\nYou should know that all your messages are saved in the log\nYou can click on the \`close\` button to close the ticket')
                    .setTimestamp()
                    .setThumbnail(interaction.user.avatarURL())
                    const TicketCloseButton = new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                        .setCustomId('CloseTicketButton')
                        .setStyle(ButtonStyle.Secondary)
                        .setLabel('CLOSE')
                    )
                    ticketchannel.send({ content: `<@${interaction.user.id}>/<@311194511931998209>/<@1008795060629934211>/<@915182850075140127>` , embeds: [TicketCloseMessage], components: [TicketCloseButton] })
                })
            }
        }
	}
}