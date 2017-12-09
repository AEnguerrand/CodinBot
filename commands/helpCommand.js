import CommandHandler from "../src/command/commandHandler";
import {TextChannel} from "discord.js";

export class HelpCommand extends CommandHandler {
    constructor() {
        super("help");
    }

    onCommand(event) {
        if (event.getChannel() instanceof TextChannel) {
            event.getDiscordEvent().delete();
        }
        
        let message = `**${this.tl(event.getUserData(), "commands.help.header")}**`;
        this.client.commandManager.registeredCommands
            .forEach((command) => 
                message += `\n\t- ${this.client.commandManager.prefix + command.name} : ${this.tl(event.getUserData(), `commands.${command.name}.description`)}`);
        event.getUser().sendMessage(message);
    }
}
