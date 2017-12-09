const Discord = require('discord.js');

//Use a config file to get prefix, token, etc
const config = require('./config/config.json');

//Define *client* is a ClientUser
const client = new Discord.Client();

//Define *client.commands* is a Collection
client.commands = new Discord.Collection();

//Basics commands
client.commands.set('help', require('./src/features/help.js'));
client.commands.set('roll', require('./src/features/roll.js'));
client.commands.set('rewards', require('./src/features/rewards.js'));
client.commands.set('give', require('./src/features/give.js'));
client.commands.set('remove', require('./src/features/remove.js'));
client.commands.set('lang', require('./src/features/lang.js'));

//All event when we use message event.
client.on('guildMemberAdd', member => require('./src/events/guildMemberAdd.js')(client, member));
//All event when the bot start
client.on('ready', () => require('./src/events/ready.js')(client));
//All event when we use message event.
client.on('message', message => require('./src/events/message.js')(client, message));

//Client token
client.login(process.env.TOKEN || config.token);
