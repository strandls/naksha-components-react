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
  UPLOADER_COLUMNS,
  LATLONG_TYPE_OPTIONS
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
  csvData,
  setLatColumn,
  setLongColumn,
  setDescriptionRow,
  setAllFilesUploaded,
  setCsvFormData,
  csvFormData,
  submitCsvData,
  getMeta
}) {
  const [items, setItems] = useState([] as any);
  const [data, setData] = useState([] as any);
  const [Header, setCsvHeader] = useState([] as any);
  const [dropdown, setdropdown] = useState([] as any);
  const [arrOptions, setArrOptions] = useState(LATLONG_TYPE_OPTIONS as any);

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
    if (getMeta.hasOwnProperty("headings")) {
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
    }
    setData(csvData);
  }, [meta.keys][getMeta.headings]);
  const _getErrorMessageLat = value => {
    //let regex = /^[0-9]+$/;
    let regex = /^[0-9]*\.[0-9]/;
    if (!value.match(regex)) {
      setAllFilesUploaded(false);
      return "Numbers is allowed with decimal point";
    } else {
      setAllFilesUploaded(true);
    }
  };

  const _getErrorMessageLong = value => {
    let regex = /^[0-9]*\.[0-9]/;
    if (!value.match(regex)) {
      setAllFilesUploaded(false);
      return "Numbers is allowed";
    } else {
      setAllFilesUploaded(true);
    }
  };

  const displayTable = (item, row, column) => {
    const fieldContent = item[column.fieldName];
    if (column.key === "latitude" && row !== 0 && row !== 1) {
      return (
        <TextField
          name={column.id}
          onChange={(e, v) => {
            setLatColumn(row, v);
          }}
          onGetErrorMessage={_getErrorMessageLat}
          defaultValue={row == 1 ? "latitude" : fieldContent}
          validateOnLoad={false}
        />
      );
    } else if (column.key === "longitude" && row !== 0 && row !== 1) {
      return (
        <TextField
          name={column.id}
          onChange={(e, v) => {
            setLongColumn(row, v);
          }}
          onGetErrorMessage={_getErrorMessageLong}
          defaultValue={row == 1 ? "longitude" : fieldContent}
          validateOnLoad={false}
        />
      );
    }
    const handleChange = (e, item, col) => {
      if (!dropdown.includes(item)) {
        dropdown.push(item);
        setdropdown(dropdown);
      } else {
        setArrOptions(arrOptions);
      }
    };

    switch (row) {
      case 0:
        return (
          <Dropdown
            options={arrOptions}
            //selectedKey={selectedItem ? selectedItem.key : ""}
            //placeHolder={"Mark Column"}
            defaultSelectedKey={
              column.key === "latitude"
                ? "latitude"
                : column.key === "longitude"
                ? "longitude"
                : LATLONG_TYPE_OPTIONS[0].key
            }
            styles={{ dropdown: { width: 160 } }}
            onChange={(e, item) => handleChange(e, item, column)}
          />
        );
      case 1:
        return (
          <TextField
            name={column.id}
            onChange={(e, v) => {
              setDescriptionRow(column.id, v);
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
      {(items.length > 0 || data.length > 0) && !isLoading && (
        <div className="row">
          <div className="col-md-8">
            <div className="upload--table">
              <FocusZone direction={FocusZoneDirection.vertical}>
                {renderTable === "shapeTable" ? (
                  <DetailsList
                    items={items}
                    columns={UPLOADER_COLUMNS}
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={TableRow}
                    setKey="key"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                  />
                ) : (
                  <DetailsList
                    items={data}
                    columns={Header}
                    selectionMode={SelectionMode.none}
                    onRenderItemColumn={displayTable}
                    setKey="key"
                    layoutMode={DetailsListLayoutMode.fixedColumns}
                  />
                )}
              </FocusZone>
            </div>
          </div>
          {renderTable === "shapeTable" ? (
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
                  console.log(_v);

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
                //disabled={!allFilesUploaded}
              >
                Submit &rarr;
              </CompoundButton>
            </div>
          ) : (
            <div className="col-md-4 upload--form">
              <Dropdown
                placeholder="Select an option"
                label="Layer Type"
                disabled={true}
                defaultSelectedKey={csvFormData.layerType}
                options={LAYER_TYPE_OPTIONS}
                onChange={(e, v) => {
                  setFormData(null, v, "layerType");
                }}
              />
              <Dropdown
                placeholder="Select an option"
                label="Title Column"
                defaultSelectedKey={csvFormData.titleColumn}
                options={Header}
                onChange={(e, v) => {
                  setCsvFormData(null, v, "titleColumn");
                }}
              />
              <Dropdown
                placeholder="Select Summary Columns"
                label="Summary Columns"
                multiSelect
                options={Header}
                onChange={(e, v: any) => {
                  const _v = csvFormData.summeryColumns.filter(
                    k => k !== v.key
                  );
                  setCsvFormData(
                    null,
                    v.selected ? [..._v, v.key] : _v,
                    "summeryColumns"
                  );
                }}
              />
              <Dropdown
                placeholder="Select an option"
                label="Default Styling Column"
                defaultSelectedKey={csvFormData.defaultStylingColumn}
                options={Header}
                onChange={(e, v) => {
                  setCsvFormData(null, v, "defaultStylingColumn");
                }}
              />
              <TextField
                label="Layer Name"
                name="layerName"
                onChange={setCsvFormData}
              />
              <TextField
                label="Layer Description"
                multiline
                rows={4}
                name="layerDescription"
                onChange={setCsvFormData}
              />
              <TextField
                label="Contributor"
                name="contributor"
                onChange={setCsvFormData}
              />
              <TextField
                label="Attribution"
                name="attribution"
                onChange={setCsvFormData}
              />
              <TextField label="Tags" name="tags" onChange={setCsvFormData} />
              <Dropdown
                label="License"
                defaultSelectedKey={setCsvFormData.license}
                options={LICENSE_TYPE_OPTIONS}
                onChange={(e, v) => {
                  setCsvFormData(null, v, "license");
                }}
              />
              <DatePicker
                label="Data Curation Date"
                placeholder="Select a date..."
                ariaLabel="Select a date"
                value={csvFormData.dataCurationDate}
                onSelectDate={(v: any) => {
                  setCsvFormData(null, v, "dataCurationDate");
                }}
              />
              <CompoundButton
                primary={true}
                className="naksha--upload-next mt-2"
                secondaryText="Upload dataset to server"
                onClick={submitCsvData}
                disabled={!allFilesUploaded}
              >
                Submit &rarr;
              </CompoundButton>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
