import CommandHandler from "../commandHandler";
import {TextChannel} from "discord.js";
import Storage from "../../storage";

export const ACHIEVEMENTS = [
    {
        name: "Nouvel arrivant",
        description: "Postez votre premier message sur le Discord!",
        condition: (user) => user.messages >= 1
    },
    {
        name: "Intrigué",
        description: "Postez un total de 10 messages",
        condition: (user) => user.messages >= 10
    },
    {
        name: "Concerné",
        description: "Postez un total de 50 messages",
        condition: (user) => user.messages >= 50
    },
    {
        name: "Familier",
        description: "Postez un total de 100 messages",
        condition: (user) => user.messages >= 100
    },
    {
        name: "Bavard",
        description: "Postez un total de 250 messages",
        condition: (user) => user.messages >= 100
    }
];

export class AchievementCommand extends CommandHandler {
    constructor() {
        super("achievement", "permet de voir nos succès");
    }

    onInit(client) {
        super.onInit(client);
        this.client.on("message", this.onMessage.bind(this));
    }

    onMessage(event) {
        let userData = Storage.loadUserData(event.author);
        userData.username = event.author.username;
        
        if (!event.author.bot) {
            if (event.channel instanceof TextChannel) {
                userData.messages++;
                
                ACHIEVEMENTS
                    .filter((achievement) => achievement.condition(userData) && userData.achievements.indexOf(achievement) === -1)
                    .forEach((achievement) => {
                        userData.achievements.push(achievement);
                        event.author.sendMessage(`:tada: Félicitations vous venez de débloquer le succès : "${achievement.name}"`);
                    });
            }
            Storage.saveUserData(event.author, userData);
        }
    }

    onCommand(event) {
        if (event.channel instanceof TextChannel) {
            event.delete();
        }

        const userData = Storage.get("users."+ event.author.id).value() || {id: event.author.id, messages: 0, achievements: []};
        let message = `:golf: Vous avez débloqué ${userData.achievements.length} succès :`;
        userData.achievements.forEach((achievement) => 
            message += `\n\t- ${achievement.name} : ${achievement.description}`);
        event.author.sendMessage(message);
    }
}
