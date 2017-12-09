const fs = require('fs');

class UserInfoSaver {
  //Saving into a file an JS Object stringified
  SaveUsersInfos(filePath, data) {
    fs.writeFileSync(filePath, JSON.stringify(data), 'utf8');
    console.log("The file was saved!");
    return (true);
  }
};

module.exports = UserInfoSaver;
