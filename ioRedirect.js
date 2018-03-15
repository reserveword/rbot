var bot, processMessage;
var chatin, chatout, stdin, taskspec;

function init(_bot, _processMessage, consolecommand, chatcommand, noisy, verbose, remember = 0 /*useless for now*/ ) {
    bot = _bot;
    processMessage = _processMessage;
    if (consolecommand) stdin = command;
    else stdin = function(param) {};
    if (chatcommand) chatin = command;
    else chatin = print;
    if (noisy) chatout = chat;
    else chatout = print;
    if (verbose) taskspec = print;
    else taskspec = function(param1, param2 = bot.username) {};
}

function command(message, username = bot.username) {
    processMessage(message, username, function(err) {
        if (!err) chatout("I " + (!err ? "achieved" : "failed") + " task " + message);
    });
}

function print(sentence, username = bot.username) {
    console.log(sentence);
}

function chat(payload, username = bot.username) {
    bot.chat(payload);
}

module.exports = {
    init: init,
    chatin: chatin,
    chatout: chatout,
    stdin: stdin,
    taskspec: taskspec,
}