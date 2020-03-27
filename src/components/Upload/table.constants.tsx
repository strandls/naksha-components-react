import React from "react";

import csvIcon from "../../images/icon.csv";
import dbfIcon from "../../images/icon.dbf";
import shpIcon from "../../images/icon.shp";
import shxIcon from "../../images/icon.shx";
import unknownIcon from "../../images/icon.unknown";
import xlsxIcon from "../../images/icon.xls";

export const UPLOADER_COLUMNS = [
  {
    key: "key",
    name: "Key",
    fieldName: "key",
    minWidth: 100,
    isResizable: true
  },
  {
    key: "title",
    name: "Title",
    fieldName: "title",
    minWidth: 150,
    isResizable: true,
    isPadded: false
  },
  {
    key: "sample1",
    name: "Example 1",
    fieldName: "sample1",
    minWidth: 120,
    isResizable: true,
    isPadded: false
  },
  {
    key: "sample2",
    name: "Example 2",
    fieldName: "sample2",
    minWidth: 120,
    isResizable: true,
    isPadded: false
  },
  {
    key: "sample3",
    name: "Example 3",
    fieldName: "sample3",
    minWidth: 120,
    isResizable: true,
    isPadded: false
  }
];
export const LAYER_TYPE_OPTIONS = [
  {
    key: "POINT",
    text: "Point"
  },
  {
    key: "MULTIPOINT",
    text: "Multipoint"
  },
  {
    key: "MULTILINESTRING",
    text: "Multilinestring"
  },
  {
    key: "MULTIPOLYGON",
    text: "Multipolygon"
  }
];

export const LICENSE_TYPE_OPTIONS = [
  {
    key: "CC-BY",
    text: "CC-BY"
  },
  {
    key: "CC-HI",
    text: "CC-HI"
  }
];
export const LATLONG_TYPE_OPTIONS = [
  {
    key: "Mark Column",
    text: "Mark Column"
  },
  {
    key: "latitude",
    text: "latitude"
  },
  {
    key: "longitude",
    text: "longitude"
  }
];

export const UPLOAD_FILES_TABLE_COLUMNS = [
  {
    key: "column1",
    name: "File Type",
    isIconOnly: true,
    fieldName: "name",
    minWidth: 24,
    maxWidth: 24,
    onRender: item => {
      return (
        <img
          src={getFileIcon(item.name)}
          className="naksha--upload-icon"
          alt={item.name}
        />
      );
    }
  },
  {
    key: "column2",
    name: "Name",
    fieldName: "name",
    minWidth: 200,
    isRowHeader: true,
    isResizable: true,
    isSorted: true,
    data: "string",
    isPadded: true
  }
];

const getFileIcon = fileName => {
  if (fileName.endsWith(".dbf")) {
    return dbfIcon;
  } else if (fileName.endsWith(".shp")) {
    return shpIcon;
  } else if (fileName.endsWith(".shx")) {
    return shxIcon;
  } else if (fileName.endsWith(".csv")) {
    return csvIcon;
  } else if (fileName.endsWith(".xlsx")) {
    return xlsxIcon;
  }
  return unknownIcon;
};
