export const toKey = text => text.toLowerCase().replace(/\s+/g, "-");
export const toCleanArray = array => Array.from(new Set(array));
export const toTxtDate = (d: Date) => {
  const yy = d.getFullYear();
  let mm: any = d.getMonth() + 1;
  let dd: any = d.getDay();
  if (mm < 10) mm = "0" + mm;
  if (dd < 10) dd = "0" + dd;
  return [yy, mm, dd].join("-");
};
