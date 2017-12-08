var config = require('../../config/config.json');
var save = require('../../config/save.json');

module.exports = (client, message, args) => {
	delete require.cache[require.resolve("../../config/config.json")]
	delete require.cache[require.resolve("../../config/save.json")]

	if (args.length != 1) {
		message.channel.send("You've inserted bad arguments, use this instead:\n`" + config.prefix + "lang " + config.langSupported.join("|") + "`");
	} else {
		if (config.langSupported.indexOf(args[0]) != -1) {
			for (var i in save.users) {
					if (save.users[i].id == message.author.id) {
							save.users[i].language = args[0];
							message.reply("your preferred language has been changed into **" + args[0] + "**!");
					}
			}
			const UserInfoSaver = require('../utils/UserInfoSaver.js');
			const saver = new UserInfoSaver();
			saver.SaveUsersInfos('./config/save.json', save);
		} else {
				message.channel.send("The language **" + args[0] + "** is not supported.");
		}
	}
};
