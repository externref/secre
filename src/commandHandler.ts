import { Collection, Interaction, REST, Routes } from "discord.js";
import fs from "node:fs";
import path from "node:path";
import * as Configs from "../config.json";

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".ts"));
let commands: Collection<string, CallableFunction> = new Collection();
const commandsJSON = [];

export function setupCommands() {
  for (const file of commandFiles) {
    const commandData = require("./" + path.join("./commands", file));
    commands.set(commandData.command.name, commandData.callback);
    commandsJSON.push(commandData.command.toJSON());
  }
}

export async function processCommands(inter: Interaction) {
  if (!inter.isChatInputCommand()) return;
  const command = commands.get(inter.commandName);
  try {
    await command(inter);
  } catch (error) {
    console.error(error);
    await inter.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}

export async function syncCommands() {
  console.log("syncing commands.")
  const RESTClient = new REST({ version: "10" }).setToken(Configs.botToken);
  await RESTClient.put(Routes.applicationCommands(Configs.botID), {
    body: commandsJSON,
  });
}
