'use strict';

var replaceWithCover = require('./lib/replaceWithCover');
var replaceWithoutCover = require('./lib/replaceWithoutCover');

function isSubArray(arr, subArr) {
    arr = arr.slice();
    for(var i=0, len=subArr.length; i<len; i++){
      if(arr.indexOf(subArr[i]) === -1){
         return false;
      }else{
        arr.splice(arr.indexOf(subArr[i]),1);
      }
    }
    return true;
}

function fn(input, matcherObj, needCover, sequence) {
    if (needCover) {
        return replaceWithCover(input, matcherObj, sequence);
    } else {
        return replaceWithoutCover(input, matcherObj, sequence);
    }
}

/**
 * @param {String} input A string to be processed.
 * @param {Object} matcherObj An object that represents a string replacement mapping.
 * @param {Boolean} needCover A boolean determines whether to replace the last replacement data in the execution.
 * @param {array} sequencer A `function` that takes the keys of `mapperObj`, and return an suquence array.
 */
function multiReplace(input, matcherObj, needCover, sequencer) {
    var argsLength = arguments.length;
    if (argsLength !== 3 && argsLength !== 4) {
        throw new TypeError('The number of parameters is incorrect.');
    }

    var input = arguments[0];
    var matcherObj = arguments[1];
    var needCover = argsLength === 4 ? arguments[2] : false;
    var sequencer = argsLength === 4 ? arguments[3] : arguments[2];

    if (typeof input !== 'string') {
        throw new TypeError('Expected input to be a string, got ' + typeof input);
    }

    if (typeof matcherObj !== 'object') {
        throw new TypeError('Expected matcherObj to be a object, got ' + typeof matcherObj);
    } else {
        if (Object.keys(matcherObj).length = 0) {
            return input;
        }
    }
    
    if (typeof needCover !== 'boolean') {
        throw new TypeError('Expected needCover to be a boolean, got ' + typeof needCover);
    }

    var sequence = [];
    if (typeof sequencer === 'function') {
        sequence = sequencer(Object.keys(matcherObj));
    } else if (toString.call(sequencer) === '[object Array]') {
        sequence = sequencer;
    }

    if(!isSubArray(Object.keys(matcherObj), sequence)) {
        throw new TypeError('Expected sequence is the subset of Object.keys(matcherObj), got: ' + sequence);
    }

    return fn(input, matcherObj, needCover, sequence);
}

module.exports = multiReplace;

