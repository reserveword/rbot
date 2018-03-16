#!/usr/bin/env node

var args = require('yargs')
    .usage("Usage : rbot [options...] <host> [-p <port>] <name> [<password>] [-m <master>]")
    .options({
        'h': {
            alias: 'help',
        },
        'c': {
            alias: 'console',
            describe: 'control yourself with console',
            type: 'boolean',
        },
        'd': {
            alias: 'dumb',
            describe: "don't read command from chat",
            type: 'boolean'
        },
        'n': {
            alias: 'noisy',
            describe: 'be noisy to your friends',
            type: 'boolean',
        },
        'v': {
            alias: 'verbose',
            describe: 'output verbose in console',
            type: 'boolean',
        },
        'p': {
            alias: 'port',
            describe: 'specify <port> to server',
            default: 25565,
            type: 'number',
        },
        'm': {
            alias: 'master',
            describe: 'follow <master> only, overrides -c option',
            type: 'string',
        }
    })
    .demandCommand(2)
    .argv;

var mineflayer = require('mineflayer');
var blockFinderPlugin = require('mineflayer-blockfinder')(mineflayer);
var navigatePlugin = require('mineflayer-navigate')(mineflayer);
var navigate2Plugin = require('./avoidBedrock.js')(mineflayer);
var async = require('async');
var vec3 = require('vec3');
var bot = mineflayer.createBot({
    username: args._[1],
    verbose: true, //args.v,
    port: args.p,
    host: args._[0],
    password: args._[2]
});

navigatePlugin(bot);
navigate2Plugin(bot);
blockFinderPlugin(bot);
var task = require('./task');
var achieve = require('./achieve');

var io = require('./ioRedirect.js').init(bot, achieve.processMessage, args.c, !args.d, args.n, args.v);
task.init(bot, vec3, achieve.achieve, achieve.achieveList, achieve.processMessage, mineflayer, async, io);
achieve.init(task.all_task.tasks, task.all_task.giveUser, task.all_task.parameterized_alias, task.all_task.alias, task.all_task.stringTo, bot, vec3, args.m, io);

bot.on('login', function() {
    io.log("I logged in.");
    io.log("settings", bot.settings);
});


bot.on('spawn', function() {
    io.log("game", bot.game);
});
bot.on('death', function() {
    io.chatout("I died x.x");
});

bot.on('chat', function(username, message) { io.chatin(message, username) });

bot.navigate.on('pathFound', function(path) {
    io.log("found path. I can get there in " + path.length + " moves.");
});
bot.navigate.on('cannotFind', function() {
    io.log("unable to find path");
});

bot.on('health', function() {
    io.log("I have " + bot.health + " health and " + bot.food + " food");
});

bot.on('playerJoined', function(player) {
    io.log("hello, " + player.username + "! welmove to the server.");
});
bot.on('playerLeft', function(player) {
    io.log("bye " + player.username);
});
bot.on('kicked', function(reason) {
    io.log("I got kicked for", reason, "lol");
});

bot.on('nonSpokenChat', function(message) {
    io.log("non spoken chat", message);
});

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: bot.username + '>'
});

rl.prompt();
rl.on('line', function(input) {
    io.stdin(input);
    rl.prompt();
});