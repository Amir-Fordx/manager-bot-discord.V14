function loadCommands(client) {
    const ascii = require('ascii-table')
    const fs = require('fs')
    const table = new ascii().setHeading('Commands', 'Status')

    let commandsArry = [];

    const commandsFolder = fs.readdirSync("./Commands")
    for (const folder of commandsFolder) {
        const commandFiles = fs.readdirSync(`./Commands/${folder}`).filter((file) => file.endsWith('.js'));
        for (const file of commandFiles) {
            const commandFile = require(`../Commands/${folder}/${file}`)
            const properties = {folder, ...commandFile}
            client.commands.set(commandFile.data.name, properties)
            commandsArry.push(commandFile.data.toJSON())
            table.addRow(file, 'loaded')
            continue;
        }
    }
    client.application.commands.set(commandsArry)
    return console.log(table.toString(), '\n loaded commands')
}
module.exports = {loadCommands}

// Don't Toch Command Handler.