import { Client, CommandInteraction } from "discord.js";
import { DatabaseHandler } from "./utils/database";

export class SlashCommandInteraction extends CommandInteraction {
	client: Secre;
}

export class Secre extends Client {
	database: DatabaseHandler = new DatabaseHandler();
}
