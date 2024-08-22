import { Client, GatewayIntentBits } from 'discord.js'
import dotenv from 'dotenv'

let client: Client

export default defineNitroPlugin((nitro) => {
    client = new Client({
        intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
    })
    
    client.once('ready', () => {
        console.log(`Logged in as ${client.user?.tag}!`)
    })

    client.on('messageCreate', (message) => {
        if (message.content === 'ping') {
            message.channel.send('Pong!')
        }
    })
    
    client.login(dotenv.config().parsed?.DISCORD_TOKEN)
})

export { client }