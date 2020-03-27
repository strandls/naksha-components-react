export default () => {
  const ctx: Worker = self as any;
  ctx.addEventListener("message", e => {
    if (!e) return;

    const fetchData = e.data.argu.argu.mapData.map(ele => {
      for (let key in ele.properties) {
        if (key.startsWith("_") && !(key == "__mlocate__id")) {
          delete ele.properties[key];
        }
      }
      ele.properties.itemId = e.data.argu.argu.itemId;
      return ele.properties;
    });
    ctx.postMessage(fetchData);
  });
};
