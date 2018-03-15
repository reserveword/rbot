#!/usr/bin/env node

const usage = "Usage : rbot [options...] <host> [-p <port>] <name> [<password>] [-m <master>]\n\
avalible options:\n\
  -c  --console  control yourself with console\n\
  -d  --dumb     don't read command from chat\n\
  -n  --noisy    be noisy to your friends\n\
  -v  --verbose  output verbose\n\
\n\
  -p <port>      specify port to server\n\
  -m <master>    follow <master> only, overrides -c option";
var args = require('yargs').usage(usage)
    .demandCommand(2)
    .number('p')
    .default('p', 25565)
    .boolean(['c', 'console', 'd', 'dumb', 'n', 'noisy', 'v', 'verbose'])
    .argv;
var vorpal = require('volpal')();

var io = require('./ioRedirect.js');
var mineflayer = require('mineflayer');
var blockFinderPlugin = require('mineflayer-blockfinder')(mineflayer);
var navigatePlugin = require('mineflayer-navigate')(mineflayer);
var navigate2Plugin = require('./avoidBedrock.js')(mineflayer);
var async = require('async');
var vec3 = require('vec3');
var bot = mineflayer.createBot({
    username: args._[1],
    verbose: verbose,
    port: args.p,
    host: args._[0],
    password: args._[2]
});

navigatePlugin(bot);
navigate2Plugin(bot);
blockFinderPlugin(bot);
var task = require('./task');
var achieve = require('./achieve');

io.init(bot, achieve.processMessage, args.c | args.console, !(args.d | args.dumb), args.n | args.noisy, args.v | args.verbose);
task.init(bot, vec3, achieve.achieve, achieve.achieveList, achieve.processMessage, mineflayer, async, io);
achieve.init(task.all_task.tasks, task.all_task.giveUser, task.all_task.parameterized_alias, task.all_task.alias, task.all_task.stringTo, bot, vec3, args.m, io);

bot.on('login', function() {
    io.verbose("I logged in.");
    io.verbose("settings", bot.settings);
});


bot.on('spawn', function() {
    io.verbose("game", bot.game);
});
bot.on('death', function() {
    io.chatout("I died x.x");
});

bot.on('chat', function(username, message) { io.chatin(message, username) });

bot.navigate.on('pathFound', function(path) {
    io.verbose("found path. I can get there in " + path.length + " moves.");
});
bot.navigate.on('cannotFind', function() {
    io.verbose("unable to find path");
});

bot.on('health', function() {
    io.verbose("I have " + bot.health + " health and " + bot.food + " food");
});

bot.on('playerJoined', function(player) {
    io.verbose("hello, " + player.username + "! welmove to the server.");
});
bot.on('playerLeft', function(player) {
    io.verbose("bye " + player.username);
});
bot.on('kicked', function(reason) {
    io.verbose("I got kicked for", reason, "lol");
});


bot.on('nonSpokenChat', function(message) {
    io.verbose("non spoken chat", message);
});