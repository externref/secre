import {
  SlashCommandBuilder,
  CommandInteraction,
  EmbedBuilder,
  Colors,
} from "discord.js";

export const command = new SlashCommandBuilder()
  .setName("ping")
  .setDescription("get bot latency");

export async function callback(inter: CommandInteraction) {
  const embed = new EmbedBuilder()
    .setColor(Colors.Blurple)
    .setDescription(`Pong! \`${inter.client.ws.ping}ms\``);
  await inter.reply({ embeds: [embed] });
}

export const category = "meta";
