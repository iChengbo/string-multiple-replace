'use strict';

function replaceAll(replaceThis, withThis, inThis) {
    return inThis.replace(new RegExp(replaceThis, 'gm'), withThis);
}

module.exports = function(input, matcherObj, sequence) {
    var output = input;
    for(var i=0, len = sequence.length; i<len;i++) {
        var withThis = typeof matcherObj[sequence[i]] === 'string' ? matcherObj[sequence[i]] : JSON.stringify(matcherObj[sequence[i]]);
        output = replaceAll(sequence[i], withThis, output);
    }
    return output;
}
