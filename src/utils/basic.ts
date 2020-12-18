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
  path.split(".").forEach(function(level) {
    if (!obj) {
      return;
    }
    obj = obj[level];
  });

  return obj;
};

export const formatDate = date => {
  const year = date.getFullYear().toString();
  const month = (date.getMonth() + 101).toString().substring(1);
  const day = (date.getDate() + 100).toString().substring(1);
  return `${year}-${month}-${day}`;
};
