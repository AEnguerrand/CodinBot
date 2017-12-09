import CommandHandler from "../commandHandler";
import {TextChannel} from "discord.js";

export class HelpCommand extends CommandHandler {
    constructor() {
        super("help", "aide aux commandes");
    }

    onCommand(event) {
        if (event.channel instanceof TextChannel) {
            event.delete();
        }

        let message = "**Aide aux commandes :**\n";
        this.client.commandManager.registeredCommands
            .forEach((command) => message += "\t- "+ this.client.commandManager.prefix + command.name +" : "+ command.description +"\n");
        event.author.sendMessage(message);
    }
}
