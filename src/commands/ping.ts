import { SlashCommandBuilder } from "discord.js";
import { CommandInteraction } from "discord.js";
export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("get bot latency");

export async function callback(inter: CommandInteraction) {
  await inter.reply({ content: `Pong! \`${inter.client.ws.ping}ms\`` });
}
