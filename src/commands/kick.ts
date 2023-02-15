import { CommandInteraction, EmbedBuilder, SlashCommandBuilder } from "discord.js";
//import { DatabaseHandler } from "./utils/database";
import { isBannable } from "../utils/moderation";
export const command = new SlashCommandBuilder().setName("kick").setDescription("Kick a member").setDMPermission(false)

export async function callback(interaction:CommandInteraction) {
    // TODO
}