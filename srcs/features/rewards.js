const Discord = require('discord.js');
var config = require('../../config/config.json');
var save = require('../../config/save.json');

module.exports = (client, message, args) => {
    new Promise((resolve, reject) => {
        delete require.cache[require.resolve("../../config/config.json")]
        delete require.cache[require.resolve("../../config/save.json")]

        var completed = "";
        var inProgress = "";

        for (var i in save.users) {
            if (save.users[i].id == message.author.id) {
                for (var k = 0; k < save.users[i].rewards.length; k++) {
                    if (save.users[i].rewards[k]) {
                        if (completed != "") {
                            completed += '\n';
                        }
                        completed += "**" + config.rewards[k][save.users[i].language]["name"] + ":** *" + config.rewards[k][save.users[i].language]["description"] + "*";
                    } else {
                        if (inProgress != "") {
                            inProgress += '\n';
                        }
                        inProgress += "**" + config.rewards[k][save.users[i].language]["name"] + ":** *" + config.rewards[k][save.users[i].language]["description"] + "*";
                    }
                }
            }
        }
        resolve({
            "completed": completed,
            "inProgress": inProgress
        });
    }).then((values) => {
        var embed = new Discord.RichEmbed().setDescription('Rewards list')
                                           .setAuthor(message.author.tag, message.author.avatarURL)
                                           .setColor(0x732211)
                                           .setFooter('CodinBot - Rewards list')
                                           .setTimestamp();
        embed.addField("Completed:", (values.completed != "") ? (values.completed) : ("*You've no completed rewards :(*"));
        embed.addField("In progress:", (values.inProgress != "") ? (values.inProgress) : ("*All rewards has been awarded! :D*"));
    	message.channel.send(embed);
    }).catch((error) => {
        console.log(error);
    })
};
