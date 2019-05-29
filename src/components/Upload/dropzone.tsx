import { CompoundButton } from "office-ui-fabric-react";
import {
  DetailsList,
  DetailsListLayoutMode,
  SelectionMode
} from "office-ui-fabric-react/lib/DetailsList";
import React, { useEffect, useState } from "react";

import { FILE_TYPES } from "../../utils/constants";
import { UPLOAD_FILES_TABLE_COLUMNS } from "./table.constants";

export default function Dropzone({
  getRootProps,
  getInputProps,
  allFilesUploaded,
  setSelectedKey,
  dbfFile,
  shpFile,
  shxFile
}) {
  const [rows, setRows] = useState([]);

  const goToData = () => {
    setSelectedKey("1");
  };

  useEffect(() => {
    const _rows: any = [];
    if (dbfFile.file) {
      _rows.push({ name: dbfFile.file.name });
    }
    if (shpFile.file) {
      _rows.push({ name: shpFile.file.name });
    }
    if (shxFile.file) {
      _rows.push({ name: shxFile.file.name });
    }
    setRows(_rows);
  }, [dbfFile.file, shpFile.file, shxFile.file]);

  return (
    <div className="row mt-4">
      <div className="col-md-8 col-sm-6">
        <div className="naksha--dropzone" {...getRootProps()}>
          <input {...getInputProps()} />
          <p className="mb-2">
            Drag 'n' drop some files here, or click to select files
          </p>
          <em>
            (Only {Object.values(FILE_TYPES).toString()} files will be accepted)
          </em>
        </div>
      </div>
      <div className="col-md-4 col-sm-6">
        {rows.length > 0 && (
          <DetailsList
            className="mb-4"
            items={rows}
            columns={UPLOAD_FILES_TABLE_COLUMNS}
            setKey="set"
            selectionMode={SelectionMode.none}
            layoutMode={DetailsListLayoutMode.justified}
            isHeaderVisible={true}
          />
        )}
        <CompoundButton
          primary={true}
          disabled={!allFilesUploaded}
          className="naksha--upload-next"
          secondaryText="Tell us more about your uploaded files"
          onClick={goToData}
        >
          Continue to Data &rarr;
        </CompoundButton>
      </div>
    </div>
  );
}
