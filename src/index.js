import Commander from "commander";
import i18n from "i18n";
import path from "path";
import {Client} from "discord.js";
import {CommandManager, CommandHandler} from "./command";
import {HelpCommand} from "../commands/helpCommand";
import { AchievementCommand } from "../commands/achievementCommand";
import { LangCommand } from "../commands/langCommand";

Commander
    .name("pico-bot")
    .description("a basic Discord bot with cool features!")
    .version("0.1.0")
    .option("-t, --token [token]", "the discord token")
    .option("-g --current-game [game]", "define the current game")
    .option("--prefix [prefix]", "set a command prefix")
    .parse(process.argv);

i18n.configure({
    locales:["fr", "en"],
    objectNotation: true,
    directory: path.join(__dirname, "locale")
});

const {token, prefix, currentGame} = Commander; // magie noire ^.^

if (token) { // on nous passe un token donc on peut se connecter
    const client = new Client();
    const commandManager = client.commandManager = new CommandManager(client, prefix || "");
    commandManager.addCommand(new HelpCommand());
    commandManager.addCommand(new AchievementCommand());
    commandManager.addCommand(new LangCommand());

    client.on("ready", () => {
        console.log("Your bot is online!");
        client.user.setGame(currentGame);
    });

    client.on("message", commandManager.onMessage.bind(commandManager));

    client.on("disconnect", (event) => {
        console.error("Oopss, you are disconnected.");
        console.error(`Reason: (${event.code}) ${event.reason}`);
        process.exit(1);
    });

    client.login(token);
} else { // rt comme on est pas content
    console.error("The token option is required!");
    process.exit(1);
}
