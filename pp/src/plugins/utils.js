const groupBy = (array, keys) => array.reduce(function (rv, i) {
    (rv[keys(i)] = rv[keys(i)] || []).push(i);
    return rv;
}, {});

const filter = (array, lambda) => {
    let result = [];
    for (let i = 0; i < array.length; i++) {
      let item = array[i];
      if (lambda(item)) {
        result.push(item);
      }
    }
    return result;
}

export default {
    groupBy,
    filter
};