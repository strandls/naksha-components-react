import { DatePicker } from "office-ui-fabric-react/lib/DatePicker";
import { DetailsList, DetailsListLayoutMode, SelectionMode } from "office-ui-fabric-react/lib/DetailsList";
import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import { FocusZone, FocusZoneDirection } from "office-ui-fabric-react/lib/FocusZone";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import React, { useEffect, useState } from "react";

import { LAYER_TYPE_OPTIONS, LICENSE_TYPE_OPTIONS, UPLOADER_COLUMNS } from "./table.constants";
import TableRow from "./table.row";

export default function UploadTable({ meta }) {
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

  const onKeySelected = (e, isChecked) => {
    console.log(e, isChecked);
  };

  return (
    <div className="mt-4">
      {items.length > 0 && (
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
              defaultSelectedKey={LAYER_TYPE_OPTIONS[0].key}
              options={LAYER_TYPE_OPTIONS}
            />
            <Dropdown
              placeholder="Select an option"
              label="Title Column"
              defaultSelectedKey={items[0].key}
              options={items}
            />
            <Dropdown
              placeholder="Select Summary Columns"
              label="Summary Columns"
              multiSelect
              options={items}
            />
            <Dropdown
              placeholder="Select an option"
              label="Default Styling Column"
              defaultSelectedKey={items[0].key}
              options={items}
            />
            <TextField label="Layer Name" />
            <TextField label="Layer Description" multiline rows={4} />
            <TextField label="Contributor" />
            <TextField label="Attribution" />
            <TextField label="Tags" />
            <Dropdown
              label="License"
              defaultSelectedKey={LICENSE_TYPE_OPTIONS[0].key}
              options={LICENSE_TYPE_OPTIONS}
            />
            <DatePicker
              label="Data "
              placeholder="Select a date..."
              ariaLabel="Select a date"
            />
          </div>
        </div>
      )}
    </div>
  );
}
