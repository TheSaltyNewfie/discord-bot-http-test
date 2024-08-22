import { client } from "~/plugins/bot"
import { TextChannel } from 'discord.js'

export default defineEventHandler(async (event) => {
    const { channel_id, message } = await readBody(event)

    const channel = client.channels.cache.get(channel_id) as TextChannel
    await channel.send(message)

    return { success: true }
})