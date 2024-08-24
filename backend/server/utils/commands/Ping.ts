import { SlashCommandBuilder, CommandInteraction } from "discord.js"

export const Ping = {
    data: new SlashCommandBuilder()
      .setName('ping')
      .setDescription('Replies with Pong!'),
    async execute(interaction: CommandInteraction) {
      await interaction.reply("Test")
    },
  }