'use strict';

function replaceRange(input, items) {
    var sortedItems = items.sort((a, b) => a[0] - b[0]);

    var result = '';
    var index = 0;
    sortedItems.forEach(item => {
        var relativeIndex = item[0] - index;
        var targetRangeLength = item[1] - item[0];
        result += input.substr(index, relativeIndex);
        index += relativeIndex + targetRangeLength;

        var target = input.slice(item[0], item[1]);
        var replacedText = item[2](target);
        
        result += replacedText;
    });

    result += input.substr(index);

    return result;
}

function generateItemByTarget(input, target, replaced) {
    var allIndex = [];
    var preIndex = 0;
    while(true) {
        var idx = input.indexOf(target, preIndex);
        if  (idx === -1) {
            break;
        }
        allIndex.push([idx, idx + target.length, input => replaced]);
        preIndex = idx + 1;
    }
    return allIndex;
}

function flatten(input) {
    var output = [];
    var idx = output.length;
    for (var i = 0, len = input.length; i < len; i++) {
        var value = input[i];
        // Flatten current level of array or arguments object.
        var j = 0, jlen = value.length;
        while (j < jlen) output[idx++] = value[j++];
    }
    return output;
}

function generateItems(input, matcherObj, sequence) {
    var items = [];
    for(var i=0, len = sequence.length; i<len;i++) {
        var item = generateItemByTarget(input, sequence[i], matcherObj[sequence[i]]);
        items.push(item);
    }
    return flatten(items);
}

// this replacement operation will not be affected next time.
module.exports = function(input, matcherObj, sequence) {
    var items = generateItems(input, matcherObj, sequence);
    return replaceRange(input, items);
}
