import { If } from "control-statements";
import {
  DetailsList,
  DetailsListLayoutMode,
  Link,
  SelectionMode
} from "office-ui-fabric-react";
import React, { useState } from "react";

export default function InfoItem({ f, index }) {
  const [isCollapsed, setisCollapsed] = useState(false);

  const _columns = [
    {
      key: "column1",
      name: "Name",
      fieldName: "name",
      minWidth: 160,
      isResizable: true
    },
    {
      key: "column2",
      name: "Value",
      fieldName: "value",
      minWidth: 180,
      isResizable: true,
      isPadded: false
    }
  ];

  return (
    <div className="mb-3">
      <div className="info--layer-name mb-1">
        {index + 1}. {f.title}
        <Link
          className="ml-2"
          checked={isCollapsed}
          onClick={() => setisCollapsed(!isCollapsed)}
        >
          {isCollapsed ? "Show" : "Hide"}
        </Link>
      </div>
      <If condition={!isCollapsed}>
        <DetailsList
          compact={true}
          items={f.properties}
          columns={_columns}
          selectionMode={SelectionMode.none}
          isHeaderVisible={false}
          setKey="key"
          layoutMode={DetailsListLayoutMode.fixedColumns}
        />
      </If>
    </div>
  );
}
