import {
	Colors,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
    SlashCommandUserOption,
} from "discord.js";
import axios from "axios";

export const command = new SlashCommandBuilder()
	.setName("grayscale")
	.setDescription("Add grayscale filter to avatar.")
    .addUserOption(new SlashCommandUserOption().setName("member").setDescription("The member whose avatar to grayscale."));

export async function callback(inter: CommandInteraction) {
    const partialMember = inter.options.getMember("member")
    const member = inter.guild.members.cache.get(
		partialMember.toString().replace("<@", "").replace(">", "")
	);
    const imageBytes = (await axios.get(`0.0.0.0:8000/grayscale?url=${member.displayAvatarURL()}`)).data
	const embed = new EmbedBuilder()
		.setColor(Colors.DarkButNotBlack)
		.setDescription(`laters`);
	await inter.reply({ embeds: [embed] });
}

export const category = "meta";
