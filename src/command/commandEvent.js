import Storage, {loadUserData} from "../storage";

export default class CommandEvent {
    constructor(discordEvent) {
        this.discordEvent = discordEvent;
    }

    getDiscordEvent() {
        return this.discordEvent;
    }

    getCommand() {
        return this.discordEvent.content;
    }

    getArguments() {
        let args = this.getCommand().split(" ");
        args.shift();
        return args;
    }

    getUser() {
        return this.discordEvent.author;
    }

    getUserData() {
        return loadUserData(this.getUser());
    }

    getChannel() {
        return this.discordEvent.channel;
    }
}
