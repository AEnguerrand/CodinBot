import CommandHandler from "../src/command/commandHandler";
import {TextChannel} from "discord.js";
import {saveUserData} from "../src/storage";

export class LangCommand extends CommandHandler {
    constructor() {
        super("lang");
    }

    onCommand(event) {
        if (event.getChannel() instanceof TextChannel) {
            event.delete();
        }
        
        if (event.getArguments().length >= 1) {
            const lang = event.getArguments()[0].toLowerCase();
            if (["fr", "en"].indexOf(lang) !== -1) {
                let userData = event.getUserData();
                userData.lang = lang;
                saveUserData(event.getUser(), userData);
                event.getUser().sendMessage(`:smile: ${this.tl(userData, "commands.lang.changed")}`);
                return;
            }
        }
        event.getUser().sendMessage(`:wastebasket: ${this.client.commandManager.prefix}${this.name} fr/en`);
    }
}
