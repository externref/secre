import { Message } from "discord.js";
import * as Configs from "../../config.json";
import { syncCommands } from "./commandHandler";

export async function processPrefixCommands(message: Message) {
	if (message.author.id != Configs.ownerId) return;

	if (message.content.startsWith(`${message.client.user} sync`)) {
		await syncCommands();
		await message.reply("Synced all application commands!");
	} else if (message.content.startsWith(`${message.client.user} eval`)) {
		const bot = message.client;
		const code = message.content
			.replace(`${message.client.user} eval \`\`\`ts\n`, "")
			.replace("```", "");
		eval(
			`
        (async function runEval(){
          try{
            ${code}
          } catch (error) {
            await  message.reply(error.toString())
          }
          
        })()
        `
		);
	}
}
