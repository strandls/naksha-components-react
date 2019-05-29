export const toKey = text => text.toLowerCase().replace(/\s+/g, "-");
export const toCleanArray = array => Array.from(new Set(array));
