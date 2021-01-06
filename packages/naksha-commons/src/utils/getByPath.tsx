/**
 * Works similar to loadash's `_.get` to retrive value from nested objects
 * getByPath(input,path)
 * path input.0.name
 * input [{name:"text"}]
 * output "text"
 * @param {*} obj
 * @param {*} path
 * @returns
 */
export const getByPath = (obj, path) => {
  path.split(".").forEach(function (level) {
    if (!obj) {
      return;
    }
    obj = obj[level];
  });

  return obj;
};
