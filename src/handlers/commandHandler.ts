import { Collection, Interaction, REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import * as Configs from "../../config.json";
import { getLogger, configure, levels } from "log4js";
configure({
  appenders: {
    console: { type: "console" },
    file: {
      type: "file",
      filename: "logs/app.log",
      maxLogSize: 10485760,
      backups: 3,
      compress: true,
    },
  },
  categories: {
    default: { appenders: ["console", "file"], level: "info" },
 },});

const logger = getLogger("commandHandler")
logger.level = levels.INFO
const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".ts"));
const commands: Collection<string, CallableFunction> = new Collection();

const commandsJSON = [];

export function setupCommands() {
  for (const file of commandFiles) {
    const commandData = require("../" + path.join("commands", file));
    commands.set(commandData.command.name, commandData.callback);
    commandsJSON.push(commandData.command.toJSON());
    
  }
  logger.info(`loaded ${commandsJSON.length} commands`)
}

export async function processInteractionCommands(inter: Interaction) {
  if (!inter.isChatInputCommand()) return;
  const command = commands.get(inter.commandName);
  logger.info(`command ${inter.commandName} was executed by ${inter.user.tag} (${inter.user.id})`)
  try {
    await command(inter);
  } catch (error) {
    await inter.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
    await logger.error(error)
  }
}

export async function syncCommands() {
  logger.info(`syncing ${commandsJSON.length} commands`)
  const RESTClient = new REST({ version: "10" }).setToken(Configs.botToken);
  await RESTClient.put(Routes.applicationCommands(Configs.botID), {
    body: commandsJSON,
  });
}
