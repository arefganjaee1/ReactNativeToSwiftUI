function checkDiff(baseArray, array) {
  return baseArray.map(errorVal => {
    return array.includes(errorVal)
  }).includes(true)
}

function objectToQueryString(obj) {
  let str = [];
  for (let p in obj)
    if (obj.hasOwnProperty(p)) {
      if (p === "page") {
        str.push(encodeURIComponent(p) + "[number]=" + encodeURIComponent(obj[p]));
      } else if (p === "per_page") {
        str.push("page[size]=" + encodeURIComponent(obj[p]));
      } else {
        str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
      }
    }
  return str.join("&");
}

const parseParams = (querystring) => {

  // parse query string
  const params = new URLSearchParams(querystring);

  const obj = {};

  // iterate over all keys
  for (const key of params.keys()) {
    if (params.getAll(key).length > 1) {
      obj[key] = params.getAll(key);
    } else {
      obj[key] = params.get(key);
    }
  }

  return obj;
};
const arrayToQueryString = (array, name) => {
  return array
    .map(id => name + '=' + id)
    .join('&');
};
const arrayListToQueryString = (array, name) => {
  return `${name}[${array}]`
};

export {
  checkDiff,
  parseParams,
  objectToQueryString,
  arrayToQueryString,
  arrayListToQueryString
}
