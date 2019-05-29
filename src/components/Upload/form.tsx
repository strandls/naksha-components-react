import "../../styles/spacing.scss";
import "../../styles/upload.scss";

import {
  Pivot,
  PivotItem,
  PivotLinkSize
} from "office-ui-fabric-react/lib/Pivot";
import { useStore } from "outstated";
import React, { useEffect, useState } from "react";
import ReactDropzone from "react-dropzone";

import UploadStore from "../../stores/upload.store";
import { FILE_TYPES } from "../../utils/constants";
import Dropzone from "./dropzone";
import UploadTable from "./table";

export default function Form({ endpoint }) {
  const uploadStore = useStore(UploadStore);

  return (
    <div className="ncr naksha--dropzone-root">
      <div className="container">
        <Pivot
          linkSize={PivotLinkSize.large}
          selectedKey={uploadStore.selectedKey}
          onLinkClick={(e: any) => {
            uploadStore.setSelectedKey(e.props.itemKey);
          }}
        >
          <PivotItem
            itemIcon="BulkUpload"
            headerText="Upload Files"
            itemKey="0"
          >
            <ReactDropzone
              onDrop={uploadStore.preProcessFiles}
              accept={Object.values(FILE_TYPES)}
            >
              {props => (
                <Dropzone
                  {...props}
                  setSelectedKey={uploadStore.setSelectedKey}
                  allFilesUploaded={uploadStore.allFilesUploaded}
                  dbfFile={uploadStore.dbfFile}
                  shpFile={uploadStore.shpFile}
                  shxFile={uploadStore.shxFile}
                />
              )}
            </ReactDropzone>
          </PivotItem>
          <PivotItem
            itemIcon="Table"
            headerText="Data"
            headerButtonProps={{ disabled: false }}
            itemKey="1"
          >
            <UploadTable meta={uploadStore.dbfFile.meta} />
          </PivotItem>
        </Pivot>
      </div>
    </div>
  );
}
