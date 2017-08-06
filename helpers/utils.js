exports.randomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min)) + min;
};

exports.randomEntry = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

exports.uuidv4 = () => {
  // return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
  //   (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
  // );
  return 1;
};

exports.maxPropOfArray = (array, prop) => {
    var max = array && array.length && array[0][prop];
    array.forEach(item => {
        if (item[prop] > max) {
            max = item[prop];
        }
    });
    return max;
};

exports.minPropOfArray = (array, prop) => {
    var min = array && array.length && array[0][prop];
    array.forEach(item => {
        if (item[prop] < min) {
            min = item[prop];
        }
    });
    return min;
};

