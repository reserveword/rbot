var bot, processMessage;
var chatin, chatout, stdin, log;

function init(_bot, _processMessage, consolecommand, chatcommand, noisy, verbose, remember = 0 /*useless for now*/ ) {
    bot = _bot;
    processMessage = _processMessage;
    if (consolecommand) stdin = command;
    else stdin = function(param) {};
    if (chatcommand) chatin = command;
    else chatin = print;
    if (noisy) chatout = chat;
    else chatout = print;
    if (verbose) log = print;
    else log = function(param1, param2 = bot.username) {};
    return {
        chatin: chatin,
        chatout: chatout,
        stdin: stdin,
        log: log,
    };
}

function command(message, username = undefined) {
    processMessage(message, username, function(err) {
        if (!err) chatout("I " + (!err ? "achieved" : "failed") + " task " + message);
    });
}

function print(sentence, username = undefined) {
    console.log(sentence);
}

function chat(payload, username = undefined) {
    bot.chat(payload);
}

module.exports.init = init;