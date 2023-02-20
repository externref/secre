import {
	Colors,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandStringOption,
	SlashCommandUserOption,
} from "discord.js";
//import { DatabaseHandler } from "./utils/database";
import { isKickable } from "../utils/moderation";
export const command = new SlashCommandBuilder()
	.setName("kick")
	.setDescription("Kick a member")
	.setDMPermission(false)
	.addUserOption(
		new SlashCommandUserOption()
			.setName("member")
			.setDescription("The member to kick from server.")
			.setRequired(true)
	)
	.addStringOption(
		new SlashCommandStringOption()
			.setName("reason")
			.setDescription("Reason to kick the user.")
			.setRequired(false)
	);

export async function callback(interaction: CommandInteraction) {
	const author = interaction.guild.members.cache.get(interaction.user.id);

	const target = interaction.guild.members.cache.get(
		interaction.options.getMember("member").toString().replace("<@", "").replace(">", "")
	);
	if (!isKickable(author, target)[0]) {
		let desc = "";
		if (isKickable(author, target)[1] == "bot") {
			desc = "Bot doesn't have enough permissions to kick that user.";
		} else {
			desc = `You don't have enough permissions to kick \`${target.user.tag}\``;
		}
		await interaction.reply({
			embeds: [new EmbedBuilder().setDescription(desc).setColor(Colors.DarkButNotBlack)],
		});
		return;
	}
	const reason = interaction.options.get("reason");
	let reasonStr = "";
	if (reason == null) reasonStr = "No reason provided.";
	else reasonStr = reason.value.toString();
	await target.kick();
	await interaction.reply({
		embeds: [
			new EmbedBuilder().setDescription(`\`${target.user.tag}\` was kicked | ${reasonStr}`),
		],
	});
}

export const category = "moderation";
