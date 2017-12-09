import {EventEmitter} from "events";
import CommandEvent from "./commandEvent";

export default class CommandManager extends EventEmitter {
    constructor(client, prefix) {
        super();
        
        this.client = client;
        this.prefix = prefix;
        this.registeredCommands = [];
    }

    addCommand(commandHandler) {
        this.registeredCommands.push(commandHandler);
        commandHandler.onInit(this.client);
    }

    onMessage(event) {
        if (!event.author.bot) {
            let cmdEvent = new CommandEvent(event);
            this.registeredCommands
                .filter((command) => event.content.startsWith(this.prefix + command.name))
                .forEach((command) => command.onCommand(cmdEvent));
        }
    }
}
