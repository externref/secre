import {
	Colors,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandUserOption,
	AttachmentBuilder,
} from "discord.js";
import { endpoints } from "../apiWrapper";

export const command = new SlashCommandBuilder()
	.setName("grayscale")
	.setDescription("Add grayscale filter to avatar.")
	.addUserOption(
		new SlashCommandUserOption()
			.setName("member")
			.setDescription("The member whose avatar to grayscale.")
	);

export async function callback(inter: CommandInteraction) {
	const partialMember = inter.options.getMember("member");
	const member = inter.guild.members.cache.get(
		partialMember.toString().replace("<@", "").replace(">", "")
	);
	await inter.deferReply();

	const embed = new EmbedBuilder()
		.setColor(Colors.DarkButNotBlack)
		.setImage("attachment://grayscale.png");
	const attachment = new AttachmentBuilder(
		endpoints.grayscaleFilter(
			encodeURIComponent(member.displayAvatarURL({ size: 1024, extension: "png" }))
		),
		{ name: "grayscale.png" }
	);
	await inter.editReply({
		embeds: [embed],
		files: [attachment],
	});
}

export const category = "image";
