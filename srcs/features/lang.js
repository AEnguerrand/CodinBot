var config = require('../../config/config.json');
var save = require('../../config/save.json');
var localization = require('../../config/localization.json');

module.exports = (client, message, args) => {
	delete require.cache[require.resolve("../../config/config.json")]
	delete require.cache[require.resolve("../../config/save.json")]
	delete require.cache[require.resolve("../../config/localization.json")]

	var lang;
	for (var i in save.users) {
			if (save.users[i].id == message.author.id) {
					lang = save.users[i].language;
					break;
			}
	}
	if (args.length != 1) {
		message.channel.send(localization["badArguments"][lang] + "\n`" + config.prefix + "lang " + config.langSupported.join("|") + "`");
	} else {
		if (config.langSupported.indexOf(args[0]) != -1) {
			for (var i in save.users) {
					if (save.users[i].id == message.author.id) {
							save.users[i].language = args[0];
							message.reply(localization["lang"][args[0]]["success"] + " **" + args[0] + "**!");
					}
			}
			const UserInfoSaver = require('../utils/UserInfoSaver.js');
			const saver = new UserInfoSaver();
			saver.SaveUsersInfos('./config/save.json', save);
		} else {
				message.channel.send(localization["lang"][lang]["failed1"] + " **" + args[0] + "** " + localization["lang"][lang]["failed2"]);
		}
	}
};
