import { Client, GatewayIntentBits, Partials, Message } from "discord.js";
import {
  processInteractionCommands,
  setupCommands,
} from "./handlers/commandHandler";
import * as Configs from "../config.json";
import { processPrefixCommands } from "./handlers/messageCommands";
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
  console.log(`${client.user?.tag} is online!`);
}


client.on("ready", onReady);
client.on("messageCreate", processPrefixCommands);
client.on("interactionCreate", processInteractionCommands);

client.login(Configs.botToken);
