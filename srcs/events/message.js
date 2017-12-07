var config = require('../../config/config.json');
var save = require('../../config/save.json');

function ChangeStatusReward(message, rewards, key, status) {
  if (status != rewards[key]) {
    rewards[key] = status;
    message.channel.send("<@" + message.author.id + "> " + ((status) ? ("got") : ("lost")) + " the reward **" + key + "**!");
  }
}

function PostNumberRewardsHandler(message, rewards, nbPosts) {
  ChangeStatusReward(message, rewards, "Newcomer", nbPosts >= 1);
  ChangeStatusReward(message, rewards, "Intrigued", nbPosts >= 10);
  ChangeStatusReward(message, rewards, "Concerned", nbPosts >= 50);
  ChangeStatusReward(message, rewards, "Familiar", nbPosts >= 100);
  ChangeStatusReward(message, rewards, "Chatty", nbPosts >= 250);
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
            PostNumberRewardsHandler(message, save.users[i].rewards, save.users[i].nbPosts)
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
