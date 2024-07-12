const replaceRange = (input, items) => {
  items.sort((a, b) => a[0] - b[0]);

  let result = "";
  let index = 0;
  items.forEach((item) => {
    const [start, end, callback] = item;
    result += input.substring(index, start);
    result += callback(input.substring(start, end));
    index = end;
  });

  result += input.substring(index);

  return result;
};

const generateItemByTarget = (input, target, replaced) => {
  const items = [];
  let index = 0;
  while (true) {
    const idx = input.indexOf(target, index);
    if (idx === -1) {
      break;
    }
    items.push([idx, idx + target.length, () => replaced]);
    index = idx + 1;
  }
  return items;
};

const generateItems = (input, matcherObj) => {
  return Object.keys(matcherObj).reduce((items, key) => {
    const generatedItems = generateItemByTarget(input, key, matcherObj[key]);
    return items.concat(generatedItems);
  }, []);
};

// this replacement operation will not be affected next time.
const replaceWithoutCover = (input, matcherObj) => {
  const items = generateItems(input, matcherObj);
  return replaceRange(input, items);
};

export default replaceWithoutCover;
