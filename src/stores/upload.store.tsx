import neatCsv from "neat-csv";
import { useEffect, useState } from "react";
import { openDbf, openShp } from "shapefile";
import request from "superagent";
import XLSX from "xlsx";
import {
  LAYER_TYPE_OPTIONS,
  LICENSE_TYPE_OPTIONS
} from "../components/Upload/table.constants";
import { toTxtDate } from "../utils/basic";
import { FILE_TYPES } from "../utils/constants";

export default function UploadStore() {
  const [dbfFile, setDbfFile] = useState({ file: null, meta: {} } as any);
  const [shpFile, setShpFile] = useState({ file: null, meta: {} } as any);
  const [shxFile, setShxFile] = useState({ file: null } as any);
  const [csvFile, setCsvFile] = useState({ file: null } as any);
  const [meta, setMeta] = useState({} as any);
  const [modifyFile, setModifyFile] = useState({ file: null } as any);
  const [csvExcelData, setCsvExcelData] = useState([] as string[]);
  const [excelFile, setExcelFile] = useState({ file: null } as any);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadPersentage, setUploadPersentage] = useState(0);
  const [selectedKey, setSelectedKey] = useState("0");
  const [renderTable, setRenderTable] = useState("");
  const [endpoint, setEndpoint] = useState(null);
  const [titleColumn, _setTitleColumn] = useState([] as string[]);
  const [descriptionRow, _setDescriptionRow] = useState([] as string[]);
  const [updateDataLatLong, setUpdateDataLatLong] = useState([] as string[]);
  const [summeryColumn, setSummeryColumn] = useState();
  const [allFilesUploaded, setAllFilesUploaded] = useState(false);
  const [formData, _setFormData] = useState({
    layerType: LAYER_TYPE_OPTIONS[0].key,
    titleColumn: null,
    summeryColumns: [],
    defaultStylingColumn: null,
    layerName: "",
    layerDescription: "",
    contributor: "",
    attribution: "",
    tags: "",
    license: LICENSE_TYPE_OPTIONS[0].key,
    dataCurationDate: new Date()
  });

  const [csvFormData, _setCsvFormData] = useState({
    layerType: LAYER_TYPE_OPTIONS[0].key,
    titleColumn: null,
    summeryColumns: [],
    defaultStylingColumn: null,
    layerName: "",
    layerDescription: "",
    contributor: "",
    attribution: "",
    tags: "",
    license: LICENSE_TYPE_OPTIONS[0].key,
    dataCurationDate: new Date()
  });

  const setTitleColumn = (id, v) => {
    _setTitleColumn(o => {
      o[id] = v;
      return o;
    });
  };
  const setDescriptionRow = (id, v) => {
    _setDescriptionRow(o => {
      o[id] = v;
      return o;
    });
  };
  const setLatColumn = (id, v) => {
    setUpdateDataLatLong(obj => {
      (obj[id] as any).latitude = Number(v);
      return obj;
    });
  };
  const setLongColumn = (id, v) => {
    setUpdateDataLatLong(obj => {
      (obj[id] as any).longitude = Number(v);
      return obj;
    });
  };
  const setFormData = (e, v, key?) => {
    const _k = e ? e.target.name : key;
    _setFormData({ ...formData, [_k]: v.key || v });
  };

  const setCsvFormData = (e, v, key) => {
    const _k = e ? e.target.name : key;
    _setCsvFormData({ ...csvFormData, [_k]: v.key || v });
  };

  useEffect(() => {
    if (
      (dbfFile.file &&
        shpFile.file &&
        shxFile.file &&
        (csvFile.file || excelFile.file)) ||
      (dbfFile.file && (csvFile.file || excelFile.file)) ||
      (shpFile.file && (csvFile.file || excelFile.file)) ||
      (shxFile.file && (csvFile.file || excelFile.file))
    ) {
      setAllFilesUploaded(false);
    } else if (
      (dbfFile.file && shpFile.file && shxFile.file && excelFile.file) ||
      (dbfFile.file && excelFile.file) ||
      (shpFile.file && excelFile.file) ||
      (shxFile.file && excelFile.file)
    ) {
      setAllFilesUploaded(false);
    } else if (csvFile.file && excelFile.file) {
      setAllFilesUploaded(false);
    } else if (csvFile.file) {
      setAllFilesUploaded(true);
    } else if (excelFile.file) {
      setAllFilesUploaded(true);
    } else if (dbfFile.file && shpFile.file && shxFile.file) {
      setAllFilesUploaded(true);
    }
  }, [dbfFile.file, shpFile.file, shxFile.file, csvFile.file, excelFile.file]);

  const _parseShp = file => {
    const readerShp = new FileReader();
    readerShp.onload = async () => {
      const sourceShp = await openShp(readerShp.result);
      setShpFile({ file, meta: (await sourceShp.read()).value });
    };
    readerShp.readAsArrayBuffer(file);
    setRenderTable("shapeTable");
  };

  const _parseDbf = file => {
    const readerDbf = new FileReader();
    readerDbf.onload = async () => {
      const sourceDbf = await openDbf(readerDbf.result);
      const meta: any = { keys: [], headings: [], rows: [] };
      for (let i = 0; i < 5; i++) {
        const _r = (await sourceDbf.read()).value;
        if (i === 0) {
          meta.keys = Object.keys(_r);
          meta.headings = Object.keys(_r);
          meta.rows = meta.keys.reduce((o, k) => ({ ...o, [k]: [] }), {});
          _setTitleColumn(meta.headings);
          _setFormData({
            ...formData,
            defaultStylingColumn: meta.keys[0],
            titleColumn: meta.keys[0]
          });
        }
        meta.keys.forEach(k => {
          meta.rows[k].push(_r[k]);
        });
      }
      setDbfFile({ file, meta });
    };
    readerDbf.readAsArrayBuffer(file);
    setRenderTable("shapeTable");
  };

  const _parseShx = file => {
    setShxFile({ file, meta: {} });
    setRenderTable("shapeTable");
  };

  const csvExcel = (prepareData, meta, file) => {
    let obj1;
    for (let key in prepareData) {
      obj1 = prepareData[0];
    }
    const getKeys = Object.keys(obj1);
    for (let i = 0; i < 11; i++) {
      if (i == 0) {
        meta.headings = Object.keys(obj1);
        meta.file = file;
        _setDescriptionRow(getKeys);
        _setCsvFormData({
          ...csvFormData,
          defaultStylingColumn: meta.headings[0],
          titleColumn: meta.headings[0]
        });
      }
    }
    for (let j = 0; j < prepareData.length; j++) {
      meta.headings.forEach((k, o) => {
        meta.keys.push(prepareData[j][k]);
      });
    }
  };
  let fileReader;
  const storeMeta: any = { keys: [], headings: [], file: null };
  // const pushData: any = {
  //   createdon: "kiran1",
  //   habitatname: "kiran2",
  //   latitude: "kiran3",
  //   location: "kiran4",
  //   locationaccuracy: "kiran5",
  //   longitude: "kiran6",
  //   placename: "kiran7",
  //   reversegeocodedname: "kiran8",
  //   speciesgroupname: "kiran9",
  //   topology: "kiran10",
  //   usergroupname: "kiran11"
  // };
  const _parseCsv = file => {
    fileReader = new FileReader();
    fileReader.onload = async () => {
      const sourceCsv = await neatCsv(fileReader.result);
      const sourceCsvs = sourceCsv;
      const stringifyData = JSON.stringify(sourceCsvs);
      const objData = JSON.parse(stringifyData);
      //const objData = modifyData.concat(pushData);
      setUpdateDataLatLong(objData);
      setCsvFile({ file });
      setCsvExcelData(objData);
      setMeta(storeMeta);
      csvExcel(objData, storeMeta, file);
    };
    fileReader.readAsText(file);
    setRenderTable("csvTable");
  };
  let reader;
  const _parseExcel = file => {
    reader = new FileReader();
    reader.onload = async evt => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      let first_sheet_name = workbook.SheetNames[0];
      let worksheet = workbook.Sheets[first_sheet_name];
      let excelData;
      excelData = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      setUpdateDataLatLong(excelData);
      setExcelFile({ file });
      csvExcel(excelData, storeMeta, file);
      setMeta(storeMeta);
      setCsvExcelData(excelData);
    };
    reader.readAsBinaryString(file);
    setRenderTable("csvTable");
  };

  const Excelexport = updateDataLatLong => {
    const ws = XLSX.utils.json_to_sheet(updateDataLatLong);
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };

    if (meta.file.name.endsWith(FILE_TYPES.XLSX)) {
      //const arrayOfObj = Object.entries(meta).map((e) => ( { [e[0]]: e[1] } ));
      const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
      //console.log(FileSaver.saveAs(data, 'excel' + fileExtension));
      let blob = new Blob([excelBuffer]);
      return new File([blob], meta.file.name, {
        type: meta.file.type,
        lastModified: new Date().getTime()
      });
      //return form.append("upload", fileOfBlob);
    } else if (meta.file.name.endsWith(FILE_TYPES.CSV)) {
      const excelBuffer = XLSX.write(wb, { bookType: "csv", type: "array" });
      let blob = new Blob([excelBuffer]);
      return new File([blob], meta.file.name, {
        type: meta.file.type,
        lastModified: new Date().getTime()
      });
    }
  };

  const submitData = () => {
    setIsLoading(true);
    const req = request.post(endpoint);
    const txtFile = generateTxt();
    req.attach("dbf", dbfFile.file);
    req.attach("shp", shpFile.file);
    req.attach("shx", shxFile.file);
    req.attach("metadata", txtFile);
    req.on("progress", p => {
      setUploadPersentage(p.percent);
    });
    req.then(response => {
      if (response.body.responseCode === 0) {
        alert("Layer Uploaded");
      } else {
        alert("Failed to upload layer");
      }
      setIsLoading(false);
    });
  };

  const submitCsvData = () => {
    setIsLoading(true);
    const saveExportedData = Excelexport(updateDataLatLong);
    const req = request.post(endpoint);
    const txtFile = generateCsvTxt();
    if (meta.file.name.endsWith(FILE_TYPES.XLSX)) {
      req.attach("xlsx", saveExportedData);
    } else if (meta.file.name.endsWith(FILE_TYPES.CSV)) {
      req.attach("csv", saveExportedData);
    }
    req.attach("metadata", txtFile);
    req.on("progress", p => {
      setUploadPersentage(p.percent);
    });
    req.then(response => {
      if (response.body.responseCode === 0) {
        alert("Layer Uploaded");
      } else {
        alert("Failed to upload layer");
      }
      setIsLoading(false);
    });
  };

  const preProcessFiles = files => {
    files.forEach(file => {
      if (file.name.endsWith(FILE_TYPES.DBF)) {
        _parseDbf(file);
      } else if (file.name.endsWith(FILE_TYPES.SHP)) {
        _parseShp(file);
      } else if (file.name.endsWith(FILE_TYPES.SHX)) {
        _parseShx(file);
      } else if (file.name.endsWith(FILE_TYPES.CSV)) {
        _parseCsv(file);
      } else if (file.name.endsWith(FILE_TYPES.XLSX)) {
        _parseExcel(file);
      }
    });
  };

  const generateTxt = () => {
    const txt = `*Meta_Layer
title_column : ${formData.titleColumn}
summary_columns : '${formData.summeryColumns.join("', '")}'
color_by : ${formData.defaultStylingColumn}
layer_name : ${formData.layerName}
layer_description : ${formData.layerDescription}
layer_type : ${formData.layerType}
created_by : ${formData.contributor}
attribution : ${formData.attribution}
tags : ${formData.tags}
license : ${formData.license}
created_date : ${toTxtDate(formData.dataCurationDate)}
layer_tablename : ${dbfFile.file.name}
status : 1
$Layer_Column_Description
${dbfFile.meta.keys.map((k, i) => `${k} : ${titleColumn[i]}`).join("\n")}`;
    return new File([txt.replace(/\'\'/g, "")], "blob", {
      type: "text/plain",
      lastModified: new Date().getTime()
    });
  };

  const generateCsvTxt = () => {
    const txt = `*Meta_Layer
    title_column : ${csvFormData.titleColumn}
    summary_columns : '${csvFormData.summeryColumns.join("', '")}'
    color_by : ${csvFormData.defaultStylingColumn}
    layer_name : ${csvFormData.layerName}
    layer_description : ${csvFormData.layerDescription}
    layer_type : ${csvFormData.layerType}
    created_by : ${csvFormData.contributor}
    attribution : ${csvFormData.attribution}
    tags : ${csvFormData.tags}
    license : ${csvFormData.license}
    created_date : ${toTxtDate(csvFormData.dataCurationDate)}
    layer_tablename : ${meta.file.name}
    status : 1

$Layer_Column_Description
${meta.headings.map((k, i) => `${k} : ${descriptionRow[i]}`).join("\n")}`;
    return new File([txt.replace(/\'\'/g, "")], "blob", {
      type: "text/plain",
      lastModified: new Date().getTime()
    });
  };
  return {
    dbfFile,
    shpFile,
    shxFile,
    csvFile,
    excelFile,
    selectedKey,
    setSelectedKey,
    preProcessFiles,
    allFilesUploaded,
    titleColumn,
    setTitleColumn,
    summeryColumn,
    setSummeryColumn,
    setEndpoint,
    formData,
    setFormData,
    submitData,
    isLoading,
    uploadPersentage,
    setAllFilesUploaded,
    renderTable,
    setRenderTable,
    setLatColumn,
    setLongColumn,
    setDescriptionRow,
    setCsvFormData,
    csvFormData,
    submitCsvData,
    meta,
    csvExcelData
  };
}
