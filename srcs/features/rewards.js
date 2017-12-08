const Discord = require('discord.js');
var config = require('../../config/config.json');
var save = require('../../config/save.json');
var localization = require('../../config/localization.json');

module.exports = (client, message, args) => {
    var lang;
    for (var i in save.users) {
        if (save.users[i].id == message.author.id) {
            lang = save.users[i].language;
            break;
        }
    }
    new Promise((resolve, reject) => {
        delete require.cache[require.resolve("../../config/config.json")]
        delete require.cache[require.resolve("../../config/save.json")]
        delete require.cache[require.resolve("../../config/localization.json")]

        if (args.length != 0) {
            message.channel.send(localization["badArguments"][lang] + "\n`" + config.prefix + "rewards`");
        } else {
          var completed = "";
          var inProgress = "";

          for (var i in save.users) {
              if (save.users[i].id == message.author.id) {
                  for (var k = 0; k < save.users[i].rewards.length; k++) {
                      if (save.users[i].rewards[k]) {
                          if (completed != "") {
                              completed += '\n';
                          }
                          completed += "**" + localization.rewards.listRewards[k][save.users[i].language]["name"] + ":** *" + localization.rewards.listRewards[k][save.users[i].language]["description"] + "*";
                      } else {
                          if (inProgress != "") {
                              inProgress += '\n';
                          }
                          inProgress += "**" + localization.rewards.listRewards[k][save.users[i].language]["name"] + ":** *" + localization.rewards.listRewards[k][save.users[i].language]["description"] + "*";
                      }
                  }
              }
          }
          resolve({
              "completed": completed,
              "inProgress": inProgress
          });
        }
    }).then((values) => {
        var embed = new Discord.RichEmbed().setDescription(localization.rewards.descriptionEmbed[lang])
                                           .setAuthor(message.author.tag, message.author.avatarURL)
                                           .setColor(0x732211)
                                           .setFooter(localization.rewards.footerEmbed[lang])
                                           .setTimestamp();
        embed.addField(localization.rewards.completed[lang], (values.completed != "") ? (values.completed) : ("*" + localization.rewards.completedEmpty[lang] + "*"));
        embed.addField(localization.rewards.inProgress[lang], (values.inProgress != "") ? (values.inProgress) : ("*" + localization.rewards.inProgressEmpty[lang] + "*"));
    	message.channel.send(embed);
    }).catch((error) => {
        console.log(error);
    })
};
