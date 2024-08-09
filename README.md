# string-multiple-replace

> Replace multiple substrings in a string sequentially.

[![LICENSE](https://img.shields.io/badge/license-MIT-blue)](./LICENSE)
[![npm-version](https://img.shields.io/npm/v/string-multiple-replace)](https://www.npmjs.com/package/string-multiple-replace)
[![npm](https://img.shields.io/npm/dm/string-multiple-replace.svg)](https://www.npmjs.com/package/string-multiple-replace)

Replace all substring matches in a string with an mapping object that is table of `replaceThis: withThis`, and you can provide a `sequencer` to decide the order of replacement.

## Install

```sh
npm install --save string-multiple-replace
```

or

```sh
yarn add string-multiple-replace
```


## Usage

```js
const multiReplace = require('string-multiple-replace');

const input = "abcde";
const matcherObj = {
    "a": "b",
    "b": "c",
    "c": "d",
    "d": "e"
}
multiReplace(input, matcherObj, ["a", "b", "c", "d"]); // eeeee
multiReplace(input, matcherObj);                       // bcdee
```

- Example-1

```js
const multiReplace = require('string-multiple-replace');

const input = "I'm only brave when I have to be. Being brave doesn't mean you go looking for trouble.";
const matcherObj = {
    "brave": "cowardly",
    "trouble": "escape"
}
const sequencer = ["brave", "trouble"];
multiReplace(input, matcherObj, sequencer);
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

multiReplace(input, matcherObj, keys => keys);
//I'm only cowardly when I have to be. Being cowardly doesn't mean you go looking for escape.

```

## API

> multiReplace(input, matcherObj [,sequencer])

The original string is replaced in turn according to the `matcherObj`, where `sequencer` determines the replacement order, and the existence state of `sequencer` determines whether the last operation overwrites the previous operation.

#### input

Type: `string`

*Required*

> A string to be processed.

#### matcherObj

Type: `object`

*Required*

> An object that represents a string replacement mapping.

#### sequencer

Type: `function`, `array`

*Required：false*

A `function` that takes the keys of `matcherObj`, and return an suquence array.

> Upgrade Instruction: the existence state of `sequencer` determines whether the last operation overwrites the previous operation.
