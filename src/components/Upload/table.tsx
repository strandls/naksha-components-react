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
  LATLONG_TYPE_OPTIONS,
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
  uploadPersentage,
  renderTable,
  allFilesUploaded,
  csvExcelData,
  setLatLongColumn,
  setAllFilesUploaded,
  getMeta
}) {
  const [items, setItems] = useState([] as any);
  const [Header, setCsvHeader] = useState([] as any);

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
    } else if (getMeta.hasOwnProperty("headings")) {
      setCsvHeader(
        getMeta.headings.map((o, id) => ({
          id,
          text: o,
          key: o,
          fieldName: o,
          name: o,
          minWidth: 160,
          isResizable: true,
          isPadded: false
        }))
      );
      setItems(csvExcelData);
    }
  }, [meta.keys, getMeta.headings]);

  const _getErrorMessage = value => {
    const regex = /^[0-9]*\.[0-9]/;
    if (!value.match(regex)) {
      setAllFilesUploaded(false);
      return "Numbers is allowed with decimal point";
    } else {
      setAllFilesUploaded(true);
    }
  };

  const setDefaultKey = column => {
    if (column.key === "latitude" || column.key === "longitude") {
      return column.key;
    } else {
      return LATLONG_TYPE_OPTIONS[0].key;
    }
  };

  const displayTable = (item, index, column) => {
    const fieldContent = item[column.fieldName];
    if (
      (column.key === "latitude" || column.key === "longitude") &&
      index > 1
    ) {
      return (
        <TextField
          name={column.id}
          onChange={(e, v) => {
            setLatLongColumn(index, v, column);
          }}
          onGetErrorMessage={_getErrorMessage}
          defaultValue={fieldContent}
          validateOnLoad={false}
        />
      );
    }
    switch (index) {
      case 0:
        return (
          <Dropdown
            options={LATLONG_TYPE_OPTIONS}
            defaultSelectedKey={setDefaultKey(column)}
            styles={{ dropdown: { width: 160 } }}
          />
        );
      case 1:
        return (
          <TextField
            name={column.id}
            onChange={(e, v) => {
              setTitleColumn(column.id, v);
            }}
            defaultValue={column.key}
            disabled={false}
          />
        );
      default:
        return fieldContent;
    }
  };

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
                  columns={
                    renderTable === "shapeTable" ? UPLOADER_COLUMNS : Header
                  }
                  selectionMode={SelectionMode.none}
                  onRenderItemColumn={
                    renderTable === "shapeTable" ? TableRow : displayTable
                  }
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
              options={renderTable === "shapeTable" ? items : Header}
              onChange={(e, v) => {
                setFormData(null, v, "titleColumn");
              }}
            />
            <Dropdown
              placeholder="Select Summary Columns"
              label="Summary Columns"
              multiSelect
              options={renderTable === "shapeTable" ? items : Header}
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
              options={renderTable === "shapeTable" ? items : Header}
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
              disabled={!allFilesUploaded}
            >
              Submit &rarr;
            </CompoundButton>
          </div>
        </div>
      )}
    </div>
  );
}
