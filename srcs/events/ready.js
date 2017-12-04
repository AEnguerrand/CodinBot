const config = require('../../config/config.json');

module.exports = (client) => {
  console.log("I'm ready!")
  client.user.setGame(config.games);
};
