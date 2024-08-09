const replaceAll = (replaceThis, withThis, inThis) => inThis.split(replaceThis).join(withThis);

const isObject = (value) => value !== null && typeof value === "object" && !Array.isArray(value);

const stringifyValue = (value) => isObject(value) ? JSON.stringify(value) : String(value);

const getSequence = (keys, matcherObj) => typeof keys === "function" ? keys(Object.keys(matcherObj)) : keys;

const replaceWithCover = (input, matcherObj, sequence) => {
  let output = input;
  const sequencer = getSequence(sequence, matcherObj);
  for (let i = 0; i < sequencer.length; i++) {
    const key = sequencer[i];
    const withThis = matcherObj[key] !== undefined ? stringifyValue(matcherObj[key]) : key;
    output = replaceAll(key, withThis, output);
  }
  return output;
};

export default replaceWithCover;
