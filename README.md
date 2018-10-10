

# string-multiple-replace
> Replace multiple substrings in a string in turn.


Replace all substring matches in a string with an mapping object that is table of `replaceThis: withThis`, and you can provide a `sequencer` to decide the order of replacement.

## Install
```
$ npm install --save string-multiple-replace
```

## Usage
- Example-1
```js
const multiReplace = require('string-multiple-replace');

const input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";

const matcherObj = {
    "brave": "cowardly",
    "trouble": "escape"
}

const sequencer = ["brave", "trouble"];

multiReplace(input, matcherObj, true, sequencer);
//I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.

```

- Example-2
```js
const multiReplace = require('string-multiple-replace');

const input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";

const matcherObj = {
    "brave": "cowardly",
    "trouble": "escape"
}

multiReplace(input, matcherObj, true, function(keys) {
    return keys; //or keys.sort(callback)
});
//I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.

```

- Example-3
```js
const multiReplace = require('string-multiple-replace');

const input = "abcd, abcd";

const matcherObj = {
    "a": "b",
    "b": "a"
}

multiReplace(input, matcherObj, false, Object.keys(matcherObj));
//bacd, bacd

```

## API

### multiReplace(input, matcherObj, [needCover,] sequencer)

The original string is replaced in turn according to the `matcherObj`, where `sequencer` determines the replacement order, and `needCover` determines whether to replace the last replacement data in the execution.

#### input

Type: `string`   
*Required*

A string to be processed.

#### matcherObj
Type: `object`  
*Required*

An object that represents a string replacement mapping.

#### needCover
Type: `boolean`  
*Default: false*

A boolean determines whether to overwritten the replacement data in the execution.

#### sequencer

Type: `function`, `array`  
*Required*

A `function` that takes the keys of `matcherObj`, and return an suquence array.

