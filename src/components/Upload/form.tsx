import "../../styles/spacing.scss";
import "../../styles/upload.scss";

import { Pivot, PivotItem, PivotLinkSize } from "office-ui-fabric-react";
import { useStore } from "outstated";
import React, { useEffect } from "react";
import ReactDropzone from "react-dropzone";

import UploadStore from "../../stores/upload.store";
import { FILE_TYPES } from "../../utils/constants";
import Dropzone from "./dropzone";
import UploadTable from "./table";

export default function Form({ endpoint }) {
  const uploadStore = useStore(UploadStore);

  useEffect(() => {
    uploadStore.setEndpoint(endpoint);
  }, [endpoint]);

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
                  setAllFilesUploaded={uploadStore.setAllFilesUploaded}
                  dbfFile={uploadStore.dbfFile}
                  shpFile={uploadStore.shpFile}
                  shxFile={uploadStore.shxFile}
                  csvFile={uploadStore.csvFile}
                  excelFile={uploadStore.excelFile}
                />
              )}
            </ReactDropzone>
          </PivotItem>
          <PivotItem
            itemIcon="Table"
            headerText="Data"
            headerButtonProps={{ disabled: !uploadStore.allFilesUploaded }}
            itemKey="1"
          >
            <UploadTable
              meta={uploadStore.dbfFile.meta}
              formData={uploadStore.formData}
              setFormData={uploadStore.setFormData}
              submitData={uploadStore.submitData}
              setTitleColumn={uploadStore.setTitleColumn}
              isLoading={uploadStore.isLoading}
              uploadPersentage={uploadStore.uploadPersentage}
              csvExcelData={uploadStore.csvExcelData}
              renderTable={uploadStore.renderTable}
              allFilesUploaded={uploadStore.allFilesUploaded}
              getMeta={uploadStore.meta}
            />
          </PivotItem>
        </Pivot>
      </div>
    </div>
  );
}
