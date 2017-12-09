import Commander from "commander";
import {Client} from "discord.js";
import {CommandManager, CommandHandler} from "./command";

Commander
    .name("pico-bot")
    .description("a basic Discord bot with cool features!")
    .version("0.1.0")
    .option("-t, --token [token]", "the discord token")
    .option("-g --current-game [game]", "define the current game")
    .option("--prefix [prefix]", "set a command prefix")
    .parse(process.argv);

const {token, prefix, currentGame} = Commander; // magie noire ^.^

if (token) { // on nous passe un token donc on peut se connecter
    const client = new Client();
    const commandManager = client.commandManager = new CommandManager(client, prefix || "");

    client.on("ready", () => {
        console.log("Your bot is online!");
        client.user.setGame(currentGame);
    });

    client.on("message", commandManager.onMessage.bind(commandManager));

    client.on("disconnect", (event) => {
        console.error("Oopss, you are disconnected.");
        console.error("Reason: (%d) %s", event.code, event.reason);
        process.exit(1);
    });

    client.login(token);
} else { // rt comme on est pas content
    console.error("The token option is required!");
    process.exit(1);
}
