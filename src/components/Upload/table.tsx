import {
  CompoundButton,
  DatePicker,
  DetailsList,
  DetailsListLayoutMode,
  Dropdown,
  FocusZone,
  FocusZoneDirection,
  ProgressIndicator,
  SelectionMode,
  TextField
} from "office-ui-fabric-react";
import React, { useEffect, useState } from "react";

import {
  LAYER_TYPE_OPTIONS,
  LICENSE_TYPE_OPTIONS,
  UPLOADER_COLUMNS
} from "./table.constants";

export default function UploadTable({
  meta,
  formData,
  setFormData,
  setTitleColumn,
  submitData,
  isLoading,
  uploadPersentage
}) {
  const [items, setItems] = useState([] as any);

  useEffect(() => {
    if (meta.hasOwnProperty("keys")) {
      setItems(
        meta.keys.map((o, id) => ({
          id,
          key: o,
          title: o,
          text: o,
          sample1: meta.rows[o][0],
          sample2: meta.rows[o][1],
          sample3: meta.rows[o][2]
        }))
      );
    }
  }, [meta.keys]);

  const TableRow = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    switch (column.key) {
      case "title":
        return (
          <TextField
            name={item.id}
            onChange={(e, v) => {
              setTitleColumn(item.id, v);
            }}
            defaultValue={fieldContent}
          />
        );

      default:
        return fieldContent;
    }
  };

  return (
    <div className="mt-4">
      {isLoading && (
        <ProgressIndicator
          label={uploadPersentage === 100 ? "Processing..." : "Uploading..."}
          description="Please wait we are uploading your data to server"
          percentComplete={uploadPersentage}
        />
      )}
      {items.length > 0 && !isLoading && (
        <div className="row">
          <div className="col-md-8">
            <div className="upload--table">
              <FocusZone direction={FocusZoneDirection.vertical}>
                <DetailsList
                  items={items}
                  columns={UPLOADER_COLUMNS}
                  selectionMode={SelectionMode.none}
                  onRenderItemColumn={TableRow}
                  setKey="key"
                  layoutMode={DetailsListLayoutMode.fixedColumns}
                />
              </FocusZone>
            </div>
          </div>
          <div className="col-md-4 upload--form">
            <Dropdown
              placeholder="Select an option"
              label="Layer Type"
              disabled={true}
              defaultSelectedKey={formData.layerType}
              options={LAYER_TYPE_OPTIONS}
              onChange={(e, v) => {
                setFormData(null, v, "layerType");
              }}
            />
            <Dropdown
              placeholder="Select an option"
              label="Title Column"
              defaultSelectedKey={formData.titleColumn}
              options={items}
              onChange={(e, v) => {
                setFormData(null, v, "titleColumn");
              }}
            />
            <Dropdown
              placeholder="Select Summary Columns"
              label="Summary Columns"
              multiSelect
              options={items}
              onChange={(e, v: any) => {
                const _v = formData.summeryColumns.filter(k => k !== v.key);
                setFormData(
                  null,
                  v.selected ? [..._v, v.key] : _v,
                  "summeryColumns"
                );
              }}
            />
            <Dropdown
              placeholder="Select an option"
              label="Default Styling Column"
              defaultSelectedKey={formData.defaultStylingColumn}
              options={items}
              onChange={(e, v) => {
                setFormData(null, v, "defaultStylingColumn");
              }}
            />
            <TextField
              label="Layer Name"
              name="layerName"
              onChange={setFormData}
            />
            <TextField
              label="Layer Description"
              multiline
              rows={4}
              name="layerDescription"
              onChange={setFormData}
            />
            <TextField
              label="Contributor"
              name="contributor"
              onChange={setFormData}
            />
            <TextField
              label="Attribution"
              name="attribution"
              onChange={setFormData}
            />
            <TextField label="Tags" name="tags" onChange={setFormData} />
            <Dropdown
              label="License"
              defaultSelectedKey={formData.license}
              options={LICENSE_TYPE_OPTIONS}
              onChange={(e, v) => {
                setFormData(null, v, "license");
              }}
            />
            <DatePicker
              label="Data Curation Date"
              placeholder="Select a date..."
              ariaLabel="Select a date"
              value={formData.dataCurationDate}
              onSelectDate={(v: any) => {
                setFormData(null, v, "dataCurationDate");
              }}
            />
            <CompoundButton
              primary={true}
              className="naksha--upload-next mt-2"
              secondaryText="Upload dataset to server"
              onClick={submitData}
            >
              Submit &rarr;
            </CompoundButton>
          </div>
        </div>
      )}
    </div>
  );
}
