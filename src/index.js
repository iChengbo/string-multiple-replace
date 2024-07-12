import replaceWithCover from "./core/replace-with-cover.js";
import replaceWithoutCover from "./core/replace-without-cover.js";

const isSubArray = (arr, subArr) => subArr.every((s) => arr.includes(s));

/**
 * @param {String}           input       A string to be processed.
 * @param {Object}           matcherObj  An object that represents a string replacement mapping.
 * @param {Array|Function}   sequencer   A `function` that takes the keys of `matcherObj`, and return an suquence array.
 */
const multiReplace = (...args) => {
  const [input, matcherObj, sequencer] = args
  if (args.length !== 2 && args.length !== 3) {
    throw new TypeError("The number of parameters is incorrect.");
  }

  if (typeof input !== "string") {
    throw new TypeError(`Expected input to be a string, got ${typeof input}`);
  }

  if (typeof matcherObj !== "object") {
    throw new TypeError(
      `Expected matcherObj to be a object, got ${typeof matcherObj}`
    );
  }

  if (Object.keys(matcherObj).length === 0) {
    return input;
  }

  if (sequencer) {
    if (typeof sequencer !== "function" && !Array.isArray(sequencer)) {
      throw new TypeError(
        `Expected sequencer to be a callback or array, got ${Object.prototype.toString.call(
          sequencer
        )}`
      );
    }

    const keys = Object.keys(matcherObj);
    const sequence = Array.isArray(sequencer) ? sequencer : sequencer(keys);

    if (!isSubArray(Object.keys(matcherObj), sequence)) {
      throw new TypeError(
        `Expected sequence is the subset of Object.keys(matcherObj), got: ${sequence}`
      );
    }

    return replaceWithCover(input, matcherObj, sequence);
  } else {
    return replaceWithoutCover(input, matcherObj);
  }
};

export default multiReplace;
