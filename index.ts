import { Client, GatewayIntentBits, Partials, Message } from "discord.js";
import {
  processCommands,
  setupCommands,
  syncCommands,
} from "./src/commandHandler";
import * as Configs from "./config.json";

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

async function onMessage(message: Message) {
  if (message.guildId != null) return;
  if (message.author.id != Configs.ownerId) return;
  if (message.content.startsWith("!sync")) {
    await syncCommands();
    await message.reply("Synced all application commands!");
  }
}

client.on("ready", onReady);
client.on("messageCreate", onMessage);
client.on("interactionCreate", processCommands);

client.login(Configs.botToken);
