import { Collection, Colors, EmbedBuilder, SlashCommandBuilder } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import { SlashCommandInteraction } from "../../overrides";

export const command = new SlashCommandBuilder()
	.setName("help")
	.setDescription("Get help for the bot")
	.setDMPermission(false);
const commandFolders = fs.readdirSync("./src/commands");
const categories: Collection<string, Array<string>> = new Collection();
const categoryNames = ["info", "moderation", "meta"];
function helpMap() {
	for (const folder of commandFolders) {
		const commandFiles = fs.readdirSync(`./src/commands/${folder}`);
		for (const file of commandFiles) {
			if (file == "help.ts") continue;
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const commandData = require("../" + path.join(folder, file));
			if (!categories.get(folder)) {
				categories.set(folder, []);
			}
			categories.set(folder, categories.get(folder).concat(commandData.command.name));
		}
	}
}
helpMap();
console.log(categories);
export async function callback(interaction: SlashCommandInteraction) {
	const embed = new EmbedBuilder()
		.setColor(Colors.NotQuiteBlack)
		.setAuthor({
			name: interaction.client.user.username,
			iconURL: interaction.client.user.displayAvatarURL(),
		})
		.setFooter({
			text: `Requested by: ${interaction.user.tag}`,
			iconURL: interaction.user.displayAvatarURL(),
		});

	for (const name of categoryNames) {
		embed.addFields({
			name: `${name.replace(name[0], name[0].toUpperCase())} Commands`,
			value: `\`\`\`fix\n${categories.get(name).join(", ")}\n\`\`\``,
		});
	}
	await interaction.reply({ embeds: [embed] });
}
