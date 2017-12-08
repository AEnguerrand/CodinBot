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

	let rollargs = args.slice(0).join(' ');
    var result = Math.floor((Math.random() * 100) + 1);
	if (args.length >= 1) {
			message.reply("**" + rollargs + "** " + localization["roll"][lang]["successArgs"] + " **" + result + "**");
	} else {
			message.reply(localization["roll"][lang]["successNoArgs"] + " **" + result + "**");
	}
};
