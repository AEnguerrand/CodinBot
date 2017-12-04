const fs = require('fs');

class UserInfoSaver {
  //Saving into a file an JS Object stringified
  SaveUsersInfos(filePath, data) {
    fs.writeFile(filePath, JSON.stringify(data), 'utf8', function(err) {
      if (err) {
        console.log(err);
        return (false);
      }
      console.log("The file was saved!");
    });
  }
};

module.exports = UserInfoSaver;
