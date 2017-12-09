import {EventEmitter} from "events";
import { HelpCommand } from "./default/helpCommand";
import { AchievementCommand } from "./default/achievementCommand";
import { GiveAchievementCommand } from "./default/giveAchievementCommand";

export default class CommandManager extends EventEmitter {
    constructor(client, prefix) {
        super();
        
        this.client = client;
        this.prefix = prefix;
        this.registeredCommands = [];

        this.addCommand(new HelpCommand());
        this.addCommand(new AchievementCommand());
        this.addCommand(new GiveAchievementCommand());
    }

    addCommand(commandHandler) {
        this.registeredCommands.push(commandHandler);
        commandHandler.onInit(this.client);
    }

    onMessage(event) {
        this.registeredCommands
            .filter((command) => event.content.startsWith(this.prefix + command.name))
            .forEach((command) => command.onCommand(event));
    }
}
