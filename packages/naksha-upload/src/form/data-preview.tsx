import { Box, Heading } from "@chakra-ui/react";
import { useT } from "@ibp/naksha-commons";
import React, { useMemo } from "react";

import useLayerUpload from "../hooks/use-layer-upload";
import DataTable from "./data-table";

export default function DataPreview() {
  const { shapeFiles } = useLayerUpload();
  const { t } = useT();

  const columns = useMemo(
    () =>
      shapeFiles.dbf.meta.keys.map((key) => ({
        name: key,
        selector: key,
      })),
    [shapeFiles.dbf]
  );

  return (
    <Box mb={6}>
      <Heading size="md" mb={4}>
        🏁 {t("data_preview")}
      </Heading>
      <DataTable columns={columns} data={shapeFiles.dbf.meta.rows} />
    </Box>
  );
}
