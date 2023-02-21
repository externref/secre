import {
	Colors,
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandStringOption,
	SlashCommandUserOption,
} from "discord.js";
import { SlashCommandInteraction } from "../overrides";
import { isBannable } from "../utils/moderation";

export const command = new SlashCommandBuilder()
	.setName("ban")
	.setDescription("Ban a member.")
	.setDMPermission(false)
	.addUserOption(
		new SlashCommandUserOption().setName("member").setDescription("The member to ban.")
	)
	.addStringOption(
		new SlashCommandStringOption().setName("reason").setDescription("Reason to ban the member.")
	);

export async function callback(interaction: SlashCommandInteraction) {
	const partialMember = interaction.options.getMember("member");
	const target = interaction.guild.members.cache.get(
		partialMember.toString().replace("<@", "").replace(">", "")
	);
	const author = interaction.guild.members.cache.get(interaction.user.id);
	if (!isBannable(author, target)[0]) {
		let desc = "";
		if (isBannable(author, target)[1] == "bot") {
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
	await target.ban({ reason: reasonStr });
	const embed = new EmbedBuilder({
		description: `\`${target.user.tag}\` was banned | ${reasonStr}`,
	}).setColor(Colors.Blue);
	await interaction.reply({
		embeds: [embed],
	});
}

export const category = "moderation";
