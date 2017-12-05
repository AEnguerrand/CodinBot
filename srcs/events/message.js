var config = require('../../config/config.json');
var save = require('../../config/save.json');

module.exports = (client, message) => {
    if (message.author.bot)
        return;

    delete require.cache[require.resolve("../../config/config.json")]
    delete require.cache[require.resolve("../../config/save.json")]

    var hasChanged = false;
    for (var i in save.users) {
        if (message.author.id == save.users[i].id) {
            save.users[i].nbPosts += 1;
            hasChanged = true;
            if (save.users[i].nbPosts >= 1 && !save.users[i].rewards["First post"]) {
                save.users[i].rewards["First post"] = true;
                message.channel.send("<@" + message.author.id + "> got the reward **First post**!");
            }
        }
    }
    if (hasChanged) {
        const UserInfoSaver = require('../utils/UserInfoSaver.js');
        const saver = new UserInfoSaver();
        saver.SaveUsersInfos('./config/save.json', save);
    }

    if (message.content.indexOf(config.prefix) !== 0)
        return;

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (client.commands.has(command)) {
        client.commands.get(command)(client, message, args);
    }
}
