var config = require('../../config/config.json');
var save = require('../../config/save.json');

function ChangeStatusReward(message, rewards, idx, status, lang, name) {
  if (status != rewards[idx]) {
    rewards[idx] = status;
    message.channel.send("<@" + message.author.id + "> " + ((status) ? ("got") : ("lost")) + " the reward **" + name + "**!");
  }
}

function PostNumberRewardsHandler(message, rewards, nbPosts, lang) {
  ChangeStatusReward(message, rewards, 0, nbPosts >= 1, lang, config.rewards[0][lang]["name"]);
  ChangeStatusReward(message, rewards, 1, nbPosts >= 10, lang, config.rewards[1][lang]["name"]);
  ChangeStatusReward(message, rewards, 2, nbPosts >= 50, lang, config.rewards[2][lang]["name"]);
  ChangeStatusReward(message, rewards, 3, nbPosts >= 100, lang, config.rewards[3][lang]["name"]);
  ChangeStatusReward(message, rewards, 4, nbPosts >= 250, lang, config.rewards[4][lang]["name"]);
}

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
            PostNumberRewardsHandler(message, save.users[i].rewards, save.users[i].nbPosts, save.users[i].language)
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
