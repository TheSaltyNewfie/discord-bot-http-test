import { Client, GatewayIntentBits, Collection, Events, REST, Routes } from 'discord.js'
import dotenv from 'dotenv'
import path from 'path'

import { Ping } from '~/utils/commands/Ping' 

let client: Client
let commands = []

const clientId = "1275607223308910614"
const guildId = "1274035902091493437"

export default defineNitroPlugin((nitro) => {
    const rest = new REST().setToken(dotenv.config().parsed?.DISCORD_TOKEN)

    client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    })

    client.commands = new Collection()

    if('data' in Ping && 'execute' in Ping) {
        commands.push(Ping.data.toJSON())
        client.commands.set(Ping.data.name, Ping)
    }

    client.once('ready', () => {
        console.log(`Logged in as ${client.user?.tag}!`)
    })

    client.on(Events.InteractionCreate, async interaction => {
        if (!interaction.isChatInputCommand()) return;
    
        const command = interaction.client.commands.get(interaction.commandName);
    
        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
    
        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            if (interaction.replied || interaction.deferred) {
                await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true });
            } else {
                await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
            }
        }
    })

    const test = async() => {
        try {
            console.log(`Started refreshing ${commands.length} application (/) commands.`);
    
            // The put method is used to fully refresh all commands in the guild with the current set
            const data = await rest.put(
                Routes.applicationGuildCommands(clientId, guildId),
                { body: commands },
            );
    
            console.log(`Successfully reloaded ${data.length} application (/) commands.`);
        } catch (error) {
            console.error(error);
        } 
    }

    test()
    
    client.login(dotenv.config().parsed?.DISCORD_TOKEN)
})

export { client }