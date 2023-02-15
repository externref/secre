import { Client, GatewayIntentBits, Partials} from "discord.js";
import {
  processInteractionCommands,
  setupCommands,
} from "./handlers/commandHandler";
import * as Configs from "../config.json";
import { processPrefixCommands } from "./handlers/messageCommands";
import { getLogger, levels} from "log4js";
import { database } from "./utils/database";

const logger = getLogger("index")
logger.level = levels.INFO


const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.DirectMessages,
  ],
  partials: [Partials.Channel],
});


setupCommands();

async function onReady() {
  logger.info(`logged in as ${client.user?.tag}!`);
  await database.setupDatabase(client)
}


client.on("ready", onReady);
client.on("messageCreate", processPrefixCommands);
client.on("interactionCreate", processInteractionCommands);

logger.info("running client ...")
client.login(Configs.botToken);
