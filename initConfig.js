const Discord = require('discord.js');
const client = new Discord.Client();
const config = require('./config/config.json');

client.on('ready', () => {
    new Promise((resolve, reject) => {
        var save = require('./config/save.json');

        if (Object.keys(save).length === 0)
        {
          console.log("No data saved, intializing a new one..");

          const UserInfoSaver = require('./srcs/utils/UserInfoSaver.js');
          const saver = new UserInfoSaver();

          var data = {"users": []}
          const users = client.users.array();

          for (var u in users) {
            if (!users[u].bot) {
              data.users.push({
                "id": users[u].id,
                "nbPosts": 0,
                "language": "fr",
                "rewards": [false, false, false, false, false, false, false, false, false, false, false, false]
              });
              console.log("User " + data.users.length + ":");
              console.log(client.users.get(data.users[data.users.length - 1].id).username)
              console.log(data.users[data.users.length - 1]);
            }
          }
          saver.SaveUsersInfos('./config/save.json', data)
        }
        resolve();
    }).then(() => {
        process.exit(0);
    }).catch((error) => {
        console.log(error);
    });
});

client.login(config.token);
