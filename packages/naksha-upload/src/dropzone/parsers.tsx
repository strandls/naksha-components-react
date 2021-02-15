import { openDbf, openShp } from "shapefile";

export const parseSHP = (file, update) => {
  const readerShp = new FileReader();
  readerShp.onload = async () => {
    const sourceShp = await openShp(readerShp.result);
    const meta = (await sourceShp.read()).value;
    update("shp", file, meta);
  };
  readerShp.readAsArrayBuffer(file);
};

export const parseDBF = (file, update) => {
  const readerDbf = new FileReader();
  readerDbf.onload = async () => {
    const sourceDbf = await openDbf(readerDbf.result, { encoding: "UTF-8" });

    const rows: any[] = [];
    try {
      for (let i = 0; i < 5; i++) {
        rows.push((await sourceDbf.read()).value);
      }
    } catch (e) {
      console.error(e);
    }

    const keys = Object.keys(rows[0]);
    const headings = Object.keys(rows[0]);

    update("dbf", file, {
      keys,
      headings,
      rows,
    });
  };
  readerDbf.readAsArrayBuffer(file);
};

export const parseSHX = (file, update) => {
  update("shx", file, {});
};
