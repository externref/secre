import { Colors, CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";

export const command = new SlashCommandBuilder()
	.setName("invite")
	.setDescription("Add the bot to your own servers.");

export async function callback(interaction: CommandInteraction) {
	const inviteURL = `https://discord.com/oauth2/authorize?client_id=${interaction.client.user.id}&permissions=277025778752&scope=applications.commands%20bot`;
	await interaction.reply({ content: inviteURL });
}

export const category = "meta";
