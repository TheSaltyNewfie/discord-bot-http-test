import { client } from "~/plugins/bot"

export default defineEventHandler(async (event) => {
    const channel_id = getRouterParam(event, 'channel_id')
   
    const channel = client.channels.cache.get(channel_id)

    const messages = channel.messages.fetch({ limit: 100 })

    return messages
})