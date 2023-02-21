import { Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { SlashCommandInteraction } from "../overrides";
import { CooldownHandler } from "../utils/cooldown";

const cooldown = new CooldownHandler(10);
export const command = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("get bot latency")
	.setDMPermission(false);

export async function callback(inter: SlashCommandInteraction) {
	if (await cooldown.isCooldownActive(inter)) return;
	const embed = new EmbedBuilder()
		.setColor(Colors.DarkBlue)
		.setDescription(`Pong! \`${inter.client.ws.ping} ms\``);
	await inter.reply({ embeds: [embed] });
	cooldown.push(inter.user.id);
}

export const category = "meta";
