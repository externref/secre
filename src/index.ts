import { Client, GatewayIntentBits, Partials } from "discord.js";
import { getLogger, levels } from "log4js";
import moment from "moment";
import * as Configs from "../config.json";
import {
	processInteractionCommands,
	setupCommands,
} from "./handlers/commandHandler";
import { processPrefixCommands } from "./handlers/messageCommands";
import { database } from "./utils/database";
const logger = getLogger("index");
logger.level = levels.INFO;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.DirectMessages,
	],
	partials: [Partials.Channel],
});

setupCommands();
(client as any). startTime = moment.utc();

async function onReady() {
	logger.info(`logged in as ${client.user?.tag}!`);
	await database.setupDatabase(client);
}

client.on("ready", onReady);
client.on("messageCreate", processPrefixCommands);
client.on("interactionCreate", processInteractionCommands);

logger.info("running client ...");
client.login(Configs.botToken);