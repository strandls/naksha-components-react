export const parseBbox = f => {
  const [l1, l2] = f["ows:WGS84BoundingBox"]["ows:LowerCorner"]["_text"].split(
    " "
  );
  const [u1, u2] = f["ows:WGS84BoundingBox"]["ows:UpperCorner"]["_text"].split(
    " "
  );
  return [[parseFloat(l1), parseFloat(l2)], [parseFloat(u1), parseFloat(u2)]];
};

export async function asyncForEach(array, callback) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
}
