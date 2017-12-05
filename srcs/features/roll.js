var config = require('../../config/config.json');

module.exports = (client, message, args) => {
	delete require.cache[require.resolve("../../config/config.json")]

	let rollargs = args.slice(0).join(' ');
    var result = Math.floor((Math.random() * 100) + 1);
	if (args.length != 0) {
		message.reply("**" + rollargs + "** vous a fait avoir le nombre: **" + result + "**");
	} else {
		message.reply("vous avez roll le nombre: **" + result + "**");
	}
};
