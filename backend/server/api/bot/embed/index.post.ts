import { client } from "~/plugins/bot"
import { TextChannel, EmbedBuilder } from 'discord.js'

export default defineEventHandler(async (event) => {
    const { channel_id, message } = await readBody(event)

    const embed = new EmbedBuilder().setColor('#0099ff')
        .setTitle('Message from HTTP API')
        .setURL('https://discord.js.org/')
        .addFields(
            { name: 'Message', value: message },
        )
        .setTimestamp()
        .setFooter({text: 'This is using Nitro and Discord.js'})

    const channel = client.channels.cache.get(channel_id) as TextChannel
    await channel.send({ embeds: [embed] })
})