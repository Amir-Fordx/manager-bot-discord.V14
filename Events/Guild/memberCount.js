const { ChannelType } = require('discord.js')
module.exports = client => {

    // MemberCount, Update Channel Name: ⌾ ᴍᴇᴍʙᴇʀꜱ [number].
    const updateMembers = (guild) => {
        const channelId = '1083553453441290271';
        const channel = guild.channels.cache.get(channelId)
        channel.setName(`⌾ ᴍᴇᴍʙᴇʀꜱ : ${guild.memberCount.toLocaleString()}`)
    }
    client.on('guildMemberAdd', (member) => updateMembers(member.guild))
    client.on('guildMemberRemove', (member) => updateMembers(member.guild))

    const guild = client.guilds.cache.get('1058712013402017853')
    updateMembers(guild)

    // Alive Mic, Update Channel Name:⌾ ᴀʟɪᴠᴇ ᴍɪᴄ [number].
    const updateMic = (guild) => {
        const voiceChannel = guild.channels.cache.filter((c) => c.type === ChannelType.GuildVoice);
        let alivecount = 0;
        voiceChannel.forEach((v) => (alivecount += v.members.size));
        const VoiceId = '1102518311377453108'
        const channel = guild.channels.cache.get(VoiceId)
        channel.setName('⌾ ᴀʟɪᴠᴇ ᴍɪᴄ : ' + alivecount)
    }
    client.on('voiceChannelJoin', (member) => updateMic(member.guild))
    client.on('voiceChannelLeave', (member) => updateMic(member.guild))
    updateMic(guild)
}