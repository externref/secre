import { GuildMember } from "discord.js";

export function isKickable(author: GuildMember, target: GuildMember) {
	if (author.id == author.guild.ownerId) return [true];
	if (!(author.roles.highest.position >= target.roles.highest.position)) {
		console.log(1);
		return [false, "user"];
	}
	if (target.id == target.guild.ownerId) {
		console.log(2);
		return [false, "user"];
	}
	if (!target.kickable) return [false, "bot"];
	return [true];
}

export function isBannable(author: GuildMember, target: GuildMember) {
	if (author.id == author.guild.ownerId) return [true];
	if (!(author.roles.highest.position >= target.roles.highest.position)) {
		console.log(1);
		return [false, "user"];
	}
	if (target.id == target.guild.ownerId) {
		console.log(2);
		return [false, "user"];
	}
	if (!target.bannable) return [false, "bot"];
	return [true];
}
