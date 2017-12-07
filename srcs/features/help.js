const Discord = require('discord.js');
var config = require('../../config/config.json');

module.exports = (client, message, args) => {
	delete require.cache[require.resolve("../../config/config.json")]
    var embed = new Discord.RichEmbed().setDescription('Commands list')
                                       .setAuthor(message.author.tag, message.author.avatarURL)
                                       .setColor(0x732211)
                                       .setFooter('CodinBot - Commands list')
                                       .setTimestamp()
    var infos = {
        "basics": ["**" + config.prefix + "help:** *Display this command*",
                   "**" + config.prefix + "roll [fact]:** *Randomly roll a number between 1 and 100*",
                   "**" + config.prefix + "rewards:** *List all achievements available*"],
        "mod": ["**" + config.prefix + "give @user reward_to_give:** *Give to the @user a reward*",
                "**" + config.prefix + "remove @user reward_to_remove:** *Remove from the @user a reward*"],
        "end": ["*The [] arguments means it's an optional argument, no need to put on brackets*"]
    }
    embed.addField("Basics commands:", infos.basics.join("\n"));
	embed.addField("Moderation commands (mods only):", infos.mod.join("\n") + "\n\n" + infos.end.join("\n"));
    message.channel.send(embed);
};
