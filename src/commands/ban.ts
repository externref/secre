import {
	Colors,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandStringOption,
	SlashCommandUserOption,
} from "discord.js";

export const command = new SlashCommandBuilder()
	.setName("ban")
	.setDescription("Ban a member.")
	.addUserOption(
		new SlashCommandUserOption()
			.setName("member")
			.setDescription("The member to ban.")
	)
	.addStringOption(
		new SlashCommandStringOption()
			.setName("reason")
			.setDescription("Reason to ban the member.")
	);

export async function callback(interaction: CommandInteraction) {
	const partialMember = interaction.options.getMember("member");
	const member = interaction.guild.members.cache.get(
		partialMember.toString().replace("<@", "").replace(">", "")
	);
}
