import { EmbedBuilder, SlashCommandBuilder, SlashCommandUserOption } from "discord.js";
import { SlashCommandInteraction } from "../overrides";
import { toUNIXTimestamp /*, TimestampStyle*/ } from "../utils/stringOps";

export const command = new SlashCommandBuilder()
	.setName("userinfo")
	.setDescription("Get information about the provided user or yourself.")
	.setDMPermission(false)
	.addUserOption(
		new SlashCommandUserOption()
			.setName("user")
			.setDescription("The user to get info about.")
			.setRequired(false)
	)
	.setDMPermission(false);
export async function callback(interaction: SlashCommandInteraction) {
	let user = interaction.options.getMember("user");
	if (user == null) user = interaction.member;
	const member = interaction.guild.members.cache.get(
		user.toString().replace("<@", "").replace(">", "")
	);
	const embed = new EmbedBuilder()
		.setAuthor({ name: member.user.tag })
		.setColor(member.displayColor)
		.setDescription(`Information about ${member}`)
		.setThumbnail(member.displayAvatarURL())
		.setFooter({
			text: `Requested by: ${interaction.user.tag}`,
			iconURL: interaction.user.displayAvatarURL(),
		});

	embed.addFields(
		{
			name: "Created on",
			value: toUNIXTimestamp(member.user.createdTimestamp),
		},
		{ name: "Joined on", value: toUNIXTimestamp(member.joinedTimestamp) },
		{ name: "Top role", value: member.roles.highest.name, inline: true },
		{ name: "Color", value: member.displayHexColor, inline: true }
	);
	await interaction.reply({ embeds: [embed] });
}

export const category = "info";
