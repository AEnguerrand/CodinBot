const config = require('../../config/config.json');
const UserInfoSaver = require('../utils/UserInfoSaver.js');
const saver = new UserInfoSaver();

function CheckIfUserAlreadyExists(users, userToCheck) {
  for (var u in users) {
    if (users[u].id == userToCheck.id) {
      return (true);
    }
  }
  return (false);
}

module.exports = (client, member) => {
  delete require.cache[require.resolve("../../config/save.json")]
  var save = require('../../config/save.json')
  if (!member.user.bot && !CheckIfUserAlreadyExists(save.users, member.user)) {
    save.users.push({
      "id": member.user.id,
      "nbPosts": 0,
      "rewards": {
          "Newcomer": false,
          "Intrigued": false,
          "Concerned": false,
          "Familiar": false,
          "Chatty": false,
          "New challenger": false,
          "Regular": false,
          "I'm always here": false,
          "Puzzled": false,
          "Determined": false,
          "Veteran": false,
          "Four seasons, three camps": false,
      }
    });
    console.log("User " + member.user.username + " added!");
  }
  saver.SaveUsersInfos('./config/save.json', save);
}
