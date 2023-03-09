import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	Colors,
	EmbedBuilder,
	SlashCommandBuilder,
} from "discord.js";
import { SlashCommandInteraction } from "../../overrides";

export const command = new SlashCommandBuilder()
	.setName("invite")
	.setDescription("Add the bot to your own servers.")
	.setDMPermission(false)
	.setDMPermission(false);

export async function callback(interaction: SlashCommandInteraction) {
	const inviteURL = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=277025778752&scope=applications.commands%20bot`;
	const embed = new EmbedBuilder()
		.setDescription(`[Click here](${inviteURL}) to invite the bot.`)
		.setColor(Colors.DarkBlue);
	const actionRow = new ActionRowBuilder<ButtonBuilder>().addComponents(
		new ButtonBuilder().setLabel("Invite me!").setURL(inviteURL).setStyle(ButtonStyle.Link)
	);
	await interaction.reply({ embeds: [embed], components: [actionRow] });
}
