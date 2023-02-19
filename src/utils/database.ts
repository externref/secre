import { Pool } from "pg";
import * as Configs from "../../config.json";
import { Client } from "discord.js";

class DatabaseHandler {
	pool: Pool;
	client: Client;
	constructor() {
		this.pool = new Pool(Configs.postgresConfigs);
	}
	async setupDatabase(client: Client) {
		this.client = client;
		await this.pool.connect();
		await this.pool.query(
			"CREATE TABLE IF NOT EXISTS secre_moderation_configs (guild_id INTEGER, moderator_roles VARCHAR ARRAY);"
		);
	}
}

export const database = new DatabaseHandler();
