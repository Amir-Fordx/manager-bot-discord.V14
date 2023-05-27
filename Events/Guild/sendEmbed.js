const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder, ButtonBuilder, ButtonStyle } = require('discord.js')
// For Added & Removed Artist Role || &: Ticket Embed.
module.exports = {
	name: 'ready',
	async execute(client) {
		let server = client.guilds.cache.get('1058712013402017853') // Server ID.
		let openSectionEmbed = new EmbedBuilder() // Add Role Embed In Open Section Channel.
			.setColor('Grey')
			.setTitle('Open Section')
			.setThumbnail(server.iconURL())
			.setDescription(`Click the button below to Add <@&1083926867943370812>`)
			.setFooter({ text: ' • Art', iconURL: server.iconURL() })

		let closeSectionEmbed = new EmbedBuilder() // Remove Role Embed Close Section Channel.
			.setColor('Grey')
			.setTitle('Close Section')
			.setThumbnail(server.iconURL())
			.setDescription(`Click the button below to Remove <@&1083926867943370812>`)
			.setFooter({ text: ' • Art', iconURL: server.iconURL() })

		const TicketEmbed = new EmbedBuilder()
			.setTitle('To open the ticket')
			.setColor('Grey')
			.setDescription('click on the menu and enter the section related to your ticket\nIt should be noted that all your messages inside the ticket are recorded in the log, and after the ticket is closed, you cannot open the ticket for 5 minutes.')

		// Add Art Role Button.
		let ADDBUTTON = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('add-role')
					.setLabel('Open')
					.setStyle(ButtonStyle.Secondary)
			)

		// Remove Art Role Button.
		let REMOVEBUTTON = new ActionRowBuilder()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('remove-role')
					.setLabel('Close')
					.setStyle(ButtonStyle.Secondary)
			)

		// Ticket Systeam.
		const TicketSelect = new ActionRowBuilder()
			.addComponents(
				new SelectMenuBuilder()
					.setCustomId('TicketSelectMenu')
					.setPlaceholder('For open ticket')
					.addOptions(
						{
							label: 'Contact',
							value: 'TicketDeveloper',
							emoji: '1080625137419816980'
						}, {
						label: 'Request To Admin',
						value: 'TicketRequest',
						emoji: '1080625005764825089'
					}, {
						label: 'Support And Complaint',
						value: 'TicketSupport',
						emoji: '1080625128142028800'
					}, {
						label: 'Other',
						value: 'TicketOther',
						emoji: '1080633976198287451'
					}
					)
			)


		/* 𝗨𝘀𝗲 𝗶𝘁 𝗼𝗻𝗹𝘆 𝗼𝗻𝗰𝗲, 𝗧𝗼 𝘀𝗲𝗻𝗱 𝗘𝗺𝗯𝗲𝗱'𝘀 𝗶𝗻 𝘁𝗵𝗲 𝗰𝗵𝗮𝗻𝗻𝗲𝗹'𝘀 */ 

		// ticket
		// client.channels.cache.get('1083923517218758707').send({ embeds: [TicketEmbed], components: [TicketSelect] });

		// open section
		// client.channels.cache.get('1083202363218735214').send({ embeds: [openSectionEmbed], components: [ADDBUTTON] })

		// close section
		// client.channels.cache.get('1083927027444359288').send({ embeds: [closeSectionEmbed], components: [REMOVEBUTTON] })
	}
}