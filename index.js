'use strict';

var replaceWithCover = require('./lib/replaceWithCover');
var replaceWithoutCover = require('./lib/replaceWithoutCover');

var toString = Object.prototype.toString;

function isSubArray(arr, subArr) {
    return subArr.every(s => arr.includes(s));
}

/**
 * @param {String}           input       A string to be processed.
 * @param {Object}           matcherObj  An object that represents a string replacement mapping.
 * @param {Array|Function}   sequencer   A `function` that takes the keys of `matcherObj`, and return an suquence array.
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
        if (Object.keys(matcherObj).length === 0) {
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

