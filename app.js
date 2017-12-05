const Discord = require('discord.js');

//Use a config file to get prefix, token, etc
var config = require('./config/config.json');

//Define *client* is a ClientUser
const client = new Discord.Client();

//Define *client.commands* is a Collection
client.commands = new Discord.Collection();

//Basics commands
client.commands.set('help', require('./srcs/features/help.js'));
client.commands.set('roll', require('./srcs/features/roll.js'));
client.commands.set('rewards', require('./srcs/features/rewards.js'));

//All event when the bot start
client.on('ready', () => require('./srcs/events/ready.js')(client));
//All event when we use message event.
client.on('message', message => require('./srcs/events/message.js')(client, message));

//Client token
client.login(config.token);
