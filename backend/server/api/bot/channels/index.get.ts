import { client } from "~/plugins/bot"
import { ChannelTypes } from "~/utils/channelTypes"

export default defineEventHandler(async (event) => {
    const channels = client.channels.cache.map(channel => {
        return {
            id: channel.id,
            name: channel.name,
            type: ChannelTypes[channel.type],
        }
    })

    return channels
})