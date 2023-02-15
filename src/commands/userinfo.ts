import {
	Colors,
	CommandInteraction,
	EmbedBuilder,
	SlashCommandBuilder,
	SlashCommandUserOption,
} from "discord.js";
import "moment" ;
import moment from "moment";

export const command = new SlashCommandBuilder()
	.setName("userinfo")
	.setDescription("Get information about the provided user or yourself.")
	.addUserOption(
		new SlashCommandUserOption()
			.setName("user")
			.setDescription("The user to get info about.")
			.setRequired(false)
	)
	.setDMPermission(false);
export async function callback(interaction: CommandInteraction) {
	let user = interaction.options.getMember("user");
	if (user == null) user = interaction.member;
	const member = interaction.guild.members.cache.get(
		user.toString().replace("<@", "").replace(">", "")
	);
	const embed = new EmbedBuilder()
		.setAuthor({name: member.user.tag})
		.setColor(Colors.Blurple)
		.setDescription(`Information about ${member}`)
		.setThumbnail(member.displayAvatarURL())
		.setFooter({
			text: `Requested by: ${interaction.user.tag}`,
			iconURL: interaction.user.displayAvatarURL(),
		});
		
	embed.addFields(
		{name: "Created on", value: moment(member.user.createdAt).format("dddd, MMMM Do YYYY, h:mm a")},
		{name: "Joined on", value: moment(member.joinedAt).format("dddd, MMMM Do YYYY, h:mm a")},
		{name: "Top role", value: member.roles.highest.name, inline:true},
		{name:"Color", value: member.displayColor.toString(), inline:true}
	);
	await interaction.reply({embeds: [embed]});
}

export const category = "info"