const Discord = require('discord.js');
var config = require('../../config/config.json');
var save = require('../../config/save.json');

function ChangeStatusReward(message, rewards, key, status) {
  if (status != rewards[key]) {
    rewards[key] = status;
    message.channel.send("<@" + message.author.id + "> " + ((status) ? ("got") : ("lost")) + " the reward **" + key + "**!");
  }
}

module.exports = (client, message, args) => {
    delete require.cache[require.resolve("../../config/config.json")]
    delete require.cache[require.resolve("../../config/save.json")]

    if (typeof(message.member.roles.get("385092290458288130")) != "undefined" ||
        typeof(message.member.roles.get("376432343616978955")) != "undefined" ||
        typeof(message.member.roles.get("385084045169786880")) != "undefined") {
            if (args.length < 2 || !/<@![0-9]+>$/.test(args[0])) {
                message.channel.send("You inserted bad arguments, use this instead:\n`" + config.prefix + "remove @user reward_to_remove`");
            } else {
                console.log("The user " + message.author.username + " has the right to use the command " + config.prefix + "remove");
                var userId = args.splice(0, 1)[0].replace(/[<@!>]/g, '');
                var reward = args.join(" ");
                for (var i in save.users) {
                    if (save.users[i].id == message.author.id) {
                        if (reward in save.users[i].rewards) {
                            ChangeStatusReward(message, save.users[i].rewards, reward, false);
                        } else {
                            message.channel.send("The reward `" + reward + "` does not exist");
                        }
                        break;
                    }
                }
                const UserInfoSaver = require('../utils/UserInfoSaver.js');
                const saver = new UserInfoSaver();
                saver.SaveUsersInfos('./config/save.json', save);
            }
        } else {
            message.channel.send("You don't have the permission to use that command..");
        }
};
