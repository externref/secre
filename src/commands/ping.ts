import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import { CooldownHandler } from "../utils/cooldown";

const cooldown = new CooldownHandler(10);
export const command = new SlashCommandBuilder().setName("ping").setDescription("get bot latency");

export async function callback(inter: CommandInteraction) {
	if (await cooldown.isCooldownActive(inter)) return;
	const embed = new EmbedBuilder()
		.setColor(Colors.DarkButNotBlack)
		.setDescription(`Pong! \`${inter.client.ws.ping}ms\``);
	await inter.reply({ embeds: [embed] });
	cooldown.push(inter.user.id);
}

export const category = "meta";
