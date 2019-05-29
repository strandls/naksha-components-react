import { TextField } from "office-ui-fabric-react/lib/TextField";
import React from "react";

export default function TableRow(item, index, column) {
  const fieldContent = item[column.fieldName];
  switch (column.key) {
    case "title":
      return <TextField value={fieldContent} />;

    default:
      return fieldContent;
  }
}
