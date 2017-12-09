import CommandHandler from "../src/command/commandHandler";
import {TextChannel} from "discord.js";
import {loadUserData, saveUserData} from "../src/storage";

export const ACHIEVEMENTS = [
    {
        key: "newcomer",
        condition: (user) => user.messages >= 1
    },
    {
        key: "intrigued",
        condition: (user) => user.messages >= 10
    },
    {
        key: "concerned",
        condition: (user) => user.messages >= 50
    },
    {
        key: "familiar",
        condition: (user) => user.messages >= 100
    },
    {
        key: "chatty",
        condition: (user) => user.messages >= 250
    }
];

export class AchievementCommand extends CommandHandler {
    constructor() {
        super("achievement");
    }

    onInit(client) {
        super.onInit(client);
        this.client.on("message", this.onMessage.bind(this));
    }

    onMessage(event) {
        let userData = loadUserData(event.author);
        userData.username = event.author.username;
        
        if (!event.author.bot) {
            if (event.channel instanceof TextChannel) {
                userData.messages++;
                
                ACHIEVEMENTS
                    .filter((achievement) => achievement.condition(userData) && userData.achievements.indexOf(achievement.key) === -1)
                    .forEach((achievement) => {
                        userData.achievements.push(achievement.key);
                        event.author.sendMessage(`:tada: ${this.tl(userData, "commands.achievement.unlock")} "${this.tl(userData, `achievements.${achievement.key}.name`)}"`);
                    });
            }
            saveUserData(event.author, userData);
        }
    }

    onCommand(event) {
        if (event.channel instanceof TextChannel) {
            event.delete();
        }

        const userData = event.getUserData();
        let message = `:military_medal: ${this.tl(userData, "commands.achievement.header.0")} ${userData.achievements.length} ${this.tl(userData, "commands.achievement.header.1")}`;
        ACHIEVEMENTS
            .filter((achievement) => userData.achievements.indexOf(achievement.key) !== -1)
            .forEach((achievement) =>  message += `\n\t- ${this.tl(userData, `achievements.${achievement.key}.name`)} : ${this.tl(userData, `achievements.${achievement.key}.description`)}`);
        event.getUser().sendMessage(message);
    }
}
