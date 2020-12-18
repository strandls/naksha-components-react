import { Box, Heading } from "@chakra-ui/react";
import React, { useMemo } from "react";
import DataTable from "react-data-table-component";

import useLayerUpload from "../use-layer-upload";

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
      <Box border="1px solid" borderColor="gray.200" borderRadius="md">
        <DataTable
          columns={columns}
          data={shapeFiles.dbf.meta.rows}
          noHeader={true}
        />
      </Box>
    </Box>
  );
}
