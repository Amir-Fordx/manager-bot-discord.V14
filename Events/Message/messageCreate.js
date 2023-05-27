const { EmbedBuilder, RequestManager } = require("@discordjs/builders");
const Levels = require('discord.js-leveling')

module.exports = {
    name: 'messageCreate',
    async execute(message) {
        if (!message.guild || message.author.bot) return;
        // For Deleted Bead Word's.
        let words = ['pussy', 'Ass', 'Mother Bitch', 'Dick', 'Fuck You']

        let foundInText = false;
        for (let i in words) {
            if (message.content.toLowerCase().includes(words[i].toLowerCase())) foundInText = true;
        }

        if (foundInText) {
            message.delete()
        }

        // Leveling Systeam Add Xp To Member's.
        const randomAmountOfXp = Math.floor(Math.random() * 29) + 1;
        const hasLeveledUp = await Levels.appendXp(message.author.id, message.guild.id, randomAmountOfXp)

        if (hasLeveledUp) {
            const user = await Levels.fetch(message.author.id, message.guild.id)

            const levelEmbed = new EmbedBuilder()
                .setTitle('<:level:1080625005764825089> New Level')
                .setDescription(`<:pin:1080625098186293248> | ${message.author}, you just leveled up to level **${user.level + 1}**`) // Level Up Message.
                .setTimestamp()

            const sendEmbed = await message.channels.send({ embeds: [levelEmbed] });
            setTimeout(() => {
                sendEmbed.delete()
            }, 10000);
            sendEmbed.react('🥳')
        }

        /* 𝗧𝗼 𝗮𝗱𝗱 𝗿𝗲𝗮𝗰𝘁𝗶𝗼𝗻𝘀 𝘁𝗼 𝗺𝗲𝗺𝗯𝗲𝗿𝘀' 𝗺𝗲𝘀𝘀𝗮𝗴𝗲𝘀 */

        // fall channel.
        if (message.channel.id == '1083198071103553606') {
            if (message.attachments.first()) {
                message.react('<a:sparkles:1083342307522252860>')
                message.react('<:sweether:1083342309472600104>')
            } else {
                message.react('<a:sparkles:1083342307522252860>')
                message.react('<:sweether:1083342309472600104>')
            }
        }
        //rank channel
        if (message.channel.id == '1083197255470829739') {
            if (message.attachments.first()) {
                message.react('<a:C_festival:1068679715533107210>')
                message.react('<a:S_star:1083827364426956901>')
            } else {
                message.react('<a:C_festival:1068679715533107210>')
                message.react('<a:S_star:1083827364426956901>')
            }
        }
        // pet-shop channel.
        if (message.channel.id == '1058725996112658442') {
            if (message.attachments.first()) {
                message.react('<:pleadingpuppy:1083343974284132432>')
                message.react('<a:pop1:1083827618522091593>')
                message.react('<a:whitecat:1083343977522151564>')
            } else {
                message.react('<:pleadingpuppy:1083343974284132432>')
                message.react('<a:pop1:1083827618522091593>')
                message.react('<a:whitecat:1083343977522151564>')
            }
        }
        // instagram-id channel.
        if (message.channel.id == '1083574299371253840') {
            if (message.attachments.first()) {
                message.react('<a:White_10:1061517799324930148>')
            } else {
                message.react('<a:White_10:1061517799324930148>')
            }
        }
        // kid channel.
        if (message.channel.id == '1083906449643667557') {
            if (message.attachments.first()) {
                message.react('<a:Cute:1083828046500479087>')
                message.react('<a:S_heartplanet:1083828141325303808>')
                message.react('<a:Kiss:1083828195767357510>')
            } else {
                message.react('<a:Cute:1083828046500479087>')
                message.react('<a:S_heartplanet:1083828141325303808>')
                message.react('<a:Kiss:1083828195767357510>')
            }
        }
        if (message.channel.id == '1083573888455278592') {
            if (message.attachments.first()) {
                message.react('<a::1060949198368952391>')
                message.react('<a:1_Y:1068961777364258816>')
            } else {
                message.react('<a::1060949198368952391>')
                message.react('<a:1_Y:1068961777364258816>')
            }
        }
        // girlish channel.
        if (message.channel.id == '1083574583434694676') {
            if (message.attachments.first()) {
                message.react('<a:S_emote:1083828345961189427>')
                message.react('<a:S_balloon:1083828431675998291>')
                message.react('<a:colorful:1083828493055447080>')
            } else {
                message.react('<a:S_emote:1083828345961189427>')
                message.react('<a:S_balloon:1083828431675998291>')
                message.react('<a:colorful:1083828493055447080>')
            }
        }
        // dubsmash channel.
        if (message.channel.id == '1083198019652042903') {
            if (message.attachments.first()) {
                message.react('<a:S_diamond:1083828688031846431>')
                message.react('<a:S_heartwhite:1083828751684599899>')
                message.react('<a:No_end:1083828749520347307>')
            } else {
                message.react('<a:S_diamond:1083828688031846431>')
                message.react('<a:S_heartwhite:1083828751684599899>')
                message.react('<a:No_end:1083828749520347307>')
            }
        }
        // selfie channel.
        if (message.channel.id == '1083197944880177193') {
            if (message.attachments.first()) {
                message.react('<a:S_heartb:1083828902448869456>')
                message.react('<a:S_heartp:1083828908190879795>')
                message.react('<a:S_heartb2:1083828906269868082>')
                message.react('<a:Love_1:1061514330400628776>')
            } else {
                message.react('<a:S_heartb:1083828902448869456>')
                message.react('<a:S_heartp:1083828908190879795>')
                message.react('<a:S_heartb2:1083828906269868082>')
                message.react('<a:Love_1:1061514330400628776>')
            }
        }
        // birth-date channel.
        if (message.channel.id == '1083197892677877820') {
            if (message.attachments.first()) {
                message.react('<a:Birthday_Cake:1083343496561315900>')
                message.react('<a:tadapurple:1083343503716778014>')
                message.react('<a:Yellow_cervejacriminal:1068670779702644756>')
                message.react('<a:Pixel_Cake:1071833437780050010>')
            } else {
                message.react('<a:Birthday_Cake:1083343496561315900>')
                message.react('<a:tadapurple:1083343503716778014>')
                message.react('<a:Yellow_cervejacriminal:1068670779702644756>')
                message.react('<a:Pixel_Cake:1071833437780050010>')
            }
        }
        // romantic channel.
        if (message.channel.id == '1083197487889780838') {
            if (message.attachments.first()) {
                message.react('<a:1_G:1060963628125261834>')
                message.react('<a:1_A:1061517001312452628>')
                message.react('<a:1_Q:1060961368926334996>')
                message.react('<a:r_pink:1073352563866468402>')
            } else {
                message.react('<a:1_G:1060963628125261834>')
                message.react('<a:1_A:1061517001312452628>')
                message.react('<a:1_Q:1060961368926334996>')
                message.react('<a:r_pink:1073352563866468402>')
            }
        }
        // food channel.
        if (message.channel.id == '1083197767029108826') {
            if (message.attachments.first()) {
                message.react('<a:Coffee:1083829495150166117>')
                message.react('<a:S_pizza:1083829500820865054>')
                message.react('<a:S_noodles:1083829497226346597>')
                message.react('<a:sushiheart:1083829503941410907>')
            } else {
                message.react('<a:Coffee:1083829495150166117>')
                message.react('<a:S_pizza:1083829500820865054>')
                message.react('<a:S_noodles:1083829497226346597>')
                message.react('<a:sushiheart:1083829503941410907>')
            }
        }
        // car-dealership channel.
        if (message.channel.id == '1089323045501542410') {
            if (message.attachments.first()) {
                message.react('<a:Liked:1089365484710940822>')
                message.react('<a:1_D:1060952528742797373>')
                message.react('<:2_B:1067107640922079305>')
                message.react('<a:1_T:1070327517258465300>')
                message.react('<a:1_Y:1068691783250358363>')
            } else {
                message.react('<a:Liked:1089365484710940822>')
                message.react('<a:1_D:1060952528742797373>')
                message.react('<:2_B:1067107640922079305>')
                message.react('<a:1_T:1070327517258465300>')
                message.react('<a:1_Y:1068691783250358363>')
            }
        }
        // deklame-text channel.
        if (message.channel.id == '1086488845006143568') {
            if (message.attachments.first()) {
                message.react('<a:White_9:1061517204199317514>')
                message.react('<a:Party_7:1061525324531236874>')
            } else {
                message.react('<a:White_9:1061517204199317514>')
                message.react('<a:Party_7:1061525324531236874>')
            }
        }
        // meme channel.
        if (message.channel.id == '1083197317106114690') {
            if (message.attachments.first()) {
                message.react('<a:Baby_smile:1060983289478905897>')
                message.react('<a:pepelaugh:1089683990333628507>')
            } else {
                message.react('<a:Baby_smile:1060983289478905897>')
                message.react('<a:pepelaugh:1089683990333628507>')
            }
        }
        // gaf channel.
        if (message.channel.id == '1084797430387712020') {
            if (message.attachments.first()) {
                message.react('<a:Baby_smile:1060983289478905897>')
                message.react('<a:pepelaugh:1089683990333628507>')
            } else {
                message.react('<a:Baby_smile:1060983289478905897>')
                message.react('<a:pepelaugh:1089683990333628507>')
            }
        }
    }
}