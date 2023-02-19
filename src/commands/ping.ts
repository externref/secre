import {
	Colors,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";

export const command = new SlashCommandBuilder()
	.setName("ping")
	.setDescription("get bot latency");

export async function callback(inter: CommandInteraction) {
	const embed = new EmbedBuilder()
		.setColor(Colors.DarkButNotBlack)
		.setDescription(`Pong! \`${inter.client.ws.ping}ms\``);
	await inter.reply({ embeds: [embed] });
}

export const category = "meta";
