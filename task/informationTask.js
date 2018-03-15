var bot, stringTo, io;

function init(_bot, _stringTo, _io) {
    bot = _bot;
    stringTo = _stringTo;
    io = _io;
}

function pos(player, done) {
    if (bot.players[player].entity != undefined) io.chatout(player + " is in " + bot.players[player].entity.position);
    else io.chatout(player + " is too far.");
    done();
}



function lookForEntity(ent, done) {
    if (ent === null) io.chatout("I can't find it");
    else io.chatout("It is in " + ent.position + (ent.type === 'mob' ? ". It's a " + ent.mobType : (ent.type === 'object' ? ". It's a " + ent.objectType : "")));
    done();
}

function lookForBlock(block, done) {
    if (block === null) io.chatout("I can't find it");
    else io.chatout("It is in " + block.position + ". It's a " + block.name);
    done();
}

// function lookFor(s,u,done)
// {
// 	var ent=stringTo.stringToEntity(s,u);
// 	if(ent!==null) {io.chatout(s+" is in "+ent.position+(ent.type === 'mob' ? ". It's a "+ent.mobType : (ent.type === 'object' ? ". It's a "+ent.objectType : "")));done();return;}
// 	var block=stringTo.stringToBlock(s);
// 	if(block!==null) {io.chatout(s+" is in "+block.position+". It's a "+block.name);done();return;}
// 	io.chatout("I can't find "+s);
// 	done();
// }


function say(message, done) {
    io.chatout(message);
    done();
}

module.exports = {
    pos: pos,
    lookForEntity: lookForEntity,
    lookForBlock: lookForBlock,
    say: say,
    init: init
};