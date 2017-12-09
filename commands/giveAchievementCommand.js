import CommandHandler from "../commandHandler";
import {TextChannel} from "discord.js";

export class GiveAchievementCommand extends CommandHandler {
    constructor() {
        super("give-achievement", "permet de donner un succès à une personne");
    }

    onCommand(event) {
        // todo
    }
}
