const { AttachmentBuilder } = require('discord.js')
const Canvas = require('@napi-rs/canvas')

module.exports = {
    // Welcome Message Canvas 
    name: 'guildMemberAdd',
    async execute(member) {
        const canvas = Canvas.createCanvas(717, 409);
        const context = canvas.getContext('2d');
        const background = await Canvas.loadImage('https://cdn.discordapp.com/attachments/1078669957820334091/1085852815383076905/welcome_user.png') // Update Welcome Image.
        context.drawImage(background, 0, 0, canvas.width, canvas.height);

        const avatar = await Canvas.loadImage(member.user.avatarURL({ extension: 'png' }));

        context.beginPath();
        context.arc(421, 160, 70, 210, Math.PI * 2, true);
        context.closePath();
        context.clip();

        context.drawImage(avatar, 352, 92, 140, 135);

        const attachment = new AttachmentBuilder(await canvas.encode('png'), { name: 'welcome.png' });

        member.guild.channels.cache.get('1060572433159037069').send({ content: `\`👋\`**Hey <@${member.user.id}> Welcome To Server**`, files: [attachment] }).then(msg => {
            setTimeout(() => msg.delete(), 15000)
        })
    }
}