const mongoose = require('mongoose')
const config = require('../../config.json')
const Levels = require('discord.js-leveling')
const { ActivityType } = require('discord.js')

module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        await mongoose.connect(config.mongodb || '', {
            keepAlive: true,
        })
        if (mongoose.connect) {
            console.log('💀 MongoDB connection succesful.')
        }
        Levels.setURL(config.mongodb)
        console.log(`${client.user.username} is now online.`)

        setInterval(() => {
            client.user.setPresence({ status: 'idle' })

            let nm = [
                ` ${(client.guilds.cache.get('1058712013402017853').memberCount / 1000).toFixed(1) + 'K'}` , // Activity-1
            ]
            let sd = Math.floor(Math.random() * nm.length);
            client.user.setActivity(nm[sd], {type: ActivityType.Watching}); // Activity Type
        }, 15000)
        setInterval(() => {
            // Voice Connection, For Client Connection.
            client.channels.fetch('1083553731167133786').then(channel => {
                require('@discordjs/voice').joinVoiceChannel({
                    channelId: channel.id,
                    guildId: channel.guild.id,
                    adapterCreator: channel.guild.voiceAdapterCreator,
                })
            })
        }, 15000)
    }
}