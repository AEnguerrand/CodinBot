const Discord = require('discord.js');
var config = require('../../config/config.json');
var save = require('../../config/save.json');
var localization = require('../../config/localization.json');

module.exports = (client, message, args) => {
	delete require.cache[require.resolve("../../config/config.json")]
	delete require.cache[require.resolve("../../config/save.json")]
	delete require.cache[require.resolve("../../config/localization.json")]
	for (var i in save.users) {
			if (save.users[i].id == message.author.id) {
				var lang = save.users[i].language;
		    var embed = new Discord.RichEmbed().setDescription(localization.help[lang]["descriptionEmbed"])
		                                       .setAuthor(message.author.tag, message.author.avatarURL)
		                                       .setColor(0x732211)
		                                       .setFooter(localization.help[lang]["footerEmbed"])
		                                       .setTimestamp()
				var infos = {
						"basics": ["**" + config.prefix + localization.help[lang]["help"].command + ":** *" + localization.help[lang]["help"].description + "*",
											 "**" + config.prefix + localization.help[lang]["roll"].command + ":** *" + localization.help[lang]["roll"].description + "*",
				 							 "**" + config.prefix + localization.help[lang]["rewards"].command + ":** *" + localization.help[lang]["rewards"].description + "*",
											 "**" + config.prefix + localization.help[lang]["lang"].command + config.langSupported.join("|") + " :** *" + localization.help[lang]["lang"].description + "*"],
						"mod": ["**" + config.prefix + localization.help[lang]["give"].command + ":** *" + localization.help[lang]["give"].description + "*",
										"**" + config.prefix + localization.help[lang]["remove"].command + ":** *" + localization.help[lang]["remove"].description + "*"],
						"end": ["*" + localization.help[lang]["end"] + "*"]
				}
				embed.addField(localization.help[lang]["basics"], infos.basics.join("\n"));
				embed.addField(localization.help[lang]["mods"], infos.mod.join("\n") + "\n\n" + infos.end.join("\n"));
				message.channel.send(embed);
			}
	}
};
