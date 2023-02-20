import { Collection, Colors, CommandInteraction, EmbedBuilder } from "discord.js";
import moment from "moment";

export class CooldownHandler {
	/**
	 * The amount of cooldown seconds to apply.
	 */
	duration: number;
	/**
	 * Collection with user id and Moment object mapping.
	 */
	cooldownCollection: Collection<string, moment.Moment> = new Collection();
	/**
	 * Shared user cooldown implementation for a command.
	 *
	 * @param {number} duration The amount of cooldown seconds to apply.
	 */
	constructor(duration: number) {
		this.duration = duration;
	}

	push(userId: string) {
		this.cooldownCollection.set(userId, moment());
	}
	async isCooldownActive(inter: CommandInteraction) {
		const cd = this.cooldownCollection.get(inter.user.id);

		if (cd == undefined) return false;
		else if ((moment() as any) - (cd as any) < this.duration * 1000) {
			const embed = new EmbedBuilder()
				.setDescription(
					`You need to wait for \`${(10 - ((moment() as any) - (cd as any)) / 1000).toFixed(
						2
					)}\` seconds before using this command.`
				)
				.setColor(Colors.Red);
			await inter.reply({
				ephemeral: true,
				embeds: [embed],
			});
			return true;
		}
	}
}
