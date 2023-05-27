// Port || Localle Host.
const express = require('express')
const app = express()
const port = 3012
app.get('/', (req, res) => {
    res.send('Hello Parzival')
})

app.listen(port, () => {
    console.log(`[/] Port: ${port}`)
})
const { inspect } = require('util');
const { EmbedBuilder, Client, GatewayIntentBits, Partials, Collection, Message, ChannelType } = require('discord.js')
const logs = require('discord-logs')
const memberCount = require('./Events/Guild/memberCount')

// Handlers.
const { handleLogs } = require('./Handlers/handleLogs')
const { loadEvents } = require('./Handlers/eventHandler')
const { loadCommands } = require('./Handlers/commandHandler')

// Client
const client = new Client({
    intents: [Object.keys(GatewayIntentBits)],
    partials: [Object.keys(Partials)]
})

// Debugging Logs.
logs(client, {
    debug: true // true / false
})

// Client Collection.
client.commands = new Collection()
client.config = require('./config.json') // Config

module.exports = client;

// RGB Color Event, Rainbow Role.
const config = require('./config.json');
const size = config.colors;
const rainbow = new Array(size);

for (var i = 0; i < size; i++) {
    var red = sin_to_hex(i, 0 * Math.PI * 2 / 3); // 0   deg
    var blue = sin_to_hex(i, 1 * Math.PI * 2 / 3); // 120 deg
    var green = sin_to_hex(i, 2 * Math.PI * 2 / 3); // 240 deg

    rainbow[i] = '#' + red + green + blue;
}

function sin_to_hex(i, phase) {
    var sin = Math.sin(Math.PI / size * 2 * i + phase);
    var int = Math.floor(sin * 127) + 128;
    var hex = int.toString(16);

    return hex.length === 1 ? '0' + hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
    for (let index = 0; index < servers.length; ++index) {
        let server = client.guilds.cache.get(servers[index]);
        if (!server) {
            if (config.logging) {
            }
            continue;
        }

        let role = server.roles.cache.find(r => r.name === config.roleName);
        if (!role) {
            if (config.logging) {
            }
            continue;
        }

        role.setColor(rainbow[place]).catch(console.error);

        if (config.logging) {
        }
    }

    if (place == (size - 1)) {
        place = 0;
    } else {
        place++;
    }
}

// Ready.
client.on('ready', () => {
    memberCount(client)
    if (config.speed < 60000) {
        console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned");
    }
    setInterval(changeColor, config.speed);
    changeColor();
});

// Login In Client.
client.login(client.config.token).then(() => {
    handleLogs(client)
    loadEvents(client)
    loadCommands(client)
})

// Eval Developer Command.
client.on('messageCreate', async message => {
    const args = message.content.split(' ');
    const command = args.shift().toLowerCase();
    const embed = new EmbedBuilder()
        .setDescription('**Result :**```js\n' + `${args.join(' ')}` + '```')
        .setColor('Gold')
        .setFooter({ text: 'Evaled', iconURL: `${message.author.displayAvatarURL()}` })

    if (command === '!eval') {

        if (message.author.id !== '807033850609795102') return; // Owner ID.

        let evaled;
        try {
            evaled = await eval(args.join(' '));
            message.channel.send({ embeds: [embed] });
        }

        catch (error) {
            const errEmbed = new EmbedBuilder()
                .setDescription('**Erroe :**```js\n' + `${error}` + '```')
                .setColor('Red')
            console.error(error);
            message.reply({
                embeds:
                    [errEmbed],
                ephemeral: true
            });
        }
    }
});

// Return Errors,To prevent the robot from turning off
 client.on('error', (err) => { return })
 client.on('shardError', () => { return })
 process.on('unhandledRejection', () => { return })
