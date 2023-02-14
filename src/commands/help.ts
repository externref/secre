import {
	SlashCommandBuilder,
	EmbedBuilder,
	Colors,
	CommandInteraction,
	Collection,
} from "discord.js";
import fs from "node:fs";
import path from "node:path";

export const command = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Get help for the bot");
const commandFiles = fs
	.readdirSync("./src/commands")
	.filter((file) => file.endsWith(".ts"));
const categories: Collection<string, Array<string>> = new Collection();

function helpMap() {
	for (const file of commandFiles) {
		if (file == "help.ts") continue;
		const commandData = require("./" + path.join(file));
		if (!categories.get(commandData.category)) {
			categories.set(commandData.category, []);
		}
		categories.set(
			commandData.category,
			categories.get(commandData.category).concat(commandData.command.name)
		);
	}
}
helpMap();
export async function callback(interaction: CommandInteraction) {
	const embed = new EmbedBuilder()
		.setColor(Colors.Blurple)
		.setAuthor({
			name: interaction.client.user.username,
			iconURL: interaction.client.user.displayAvatarURL(),
		})
		.setFooter({
			text: `Requested by: ${interaction.user.tag}`,
			iconURL: interaction.user.displayAvatarURL(),
		});

	for (const name of categories.keys()) {
		embed.addFields({
			name: `${name.replace(name[0], name[0].toUpperCase())} Commands`,
			value: `\`\`\`fix\n${categories.get(name).join(", ")}\n\`\`\``,
		});
	}
	await interaction.reply({embeds: [embed]});
}

export const category = null;
