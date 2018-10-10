'use strict';
/**
 * V1.0.0 Version upgrade instructions:
 * Discarded: 
 *  1. @param needCover is no longer necessary.
 *      The existence state of the sequencer determines whether to replace the previous replacement operation in execution.
 */

var replaceWithCover = require('./lib/replaceWithCover');
var replaceWithoutCover = require('./lib/replaceWithoutCover');

var toString = Object.prototype.toString;

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

/**
 * @param {String} input A string to be processed.
 * @param {Object} matcherObj An object that represents a string replacement mapping.
 * @param {array} sequencer A `function` that takes the keys of `mapperObj`, and return an suquence array.
 */
function multiReplace(input, matcherObj, sequencer) {
    var argsLength = arguments.length;
    if (argsLength !== 2 && argsLength !== 3) {
        throw new TypeError('The number of parameters is incorrect.');
    }

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

    if(sequencer) {
        var sequence = [];
        if (typeof sequencer === 'function') {
            sequence = sequence.concat(sequencer(Object.keys(matcherObj)));
        } else if (toString.call(sequencer) === '[object Array]') {
            sequence = sequence.concat(sequencer);
        } else {
            throw new TypeError('Expected sequencer to be a callback or array, got ' + toString.call(sequencer));
        }
    
        if(!isSubArray(Object.keys(matcherObj), sequence)) {
            throw new TypeError('Expected sequence is the subset of Object.keys(matcherObj), got: ' + sequence);
        }
        return replaceWithCover(input, matcherObj, sequence);
    } else {
        return replaceWithoutCover(input, matcherObj);
    }
}

module.exports = multiReplace;

