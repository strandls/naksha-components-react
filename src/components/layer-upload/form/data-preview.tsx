import { Box, Heading } from "@chakra-ui/react";
import React, { useMemo } from "react";

import useLayerUpload from "../use-layer-upload";
import DataTable from "./data-table";

export default function DataPreview() {
  const { shapeFiles } = useLayerUpload();

  const columns = useMemo(
    () =>
      shapeFiles.dbf.meta.keys.map(key => ({
        name: key,
        selector: key
      })),
    [shapeFiles.dbf]
  );

  return (
    <Box mb={6}>
      <Heading size="md" mb={4}>
        🏁 Data Preview
      </Heading>
      <DataTable columns={columns} data={shapeFiles.dbf.meta.rows} />
    </Box>
  );
}
