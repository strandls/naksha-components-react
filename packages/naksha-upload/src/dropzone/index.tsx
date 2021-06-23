import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import { useT } from "@ibp/naksha-commons";
import React from "react";
import { useDropzone } from "react-dropzone";

import useLayerUpload from "../hooks/use-layer-upload";
import { FILE_TYPES } from "../icons/constants";
import FilePreview from "./file-preview";
import { parseDBF, parseSHP, parseSHX } from "./parsers";

export default function LayerUploadDropzone() {
  const { updateShapeFile } = useLayerUpload();
  const { t } = useT();

  const onDrop = (files) => {
    for (const file of files) {
      if (file.name.endsWith(FILE_TYPES.DBF)) {
        parseDBF(file, updateShapeFile);
      } else if (file.name.endsWith(FILE_TYPES.SHP)) {
        parseSHP(file, updateShapeFile);
      } else if (file.name.endsWith(FILE_TYPES.SHX)) {
        parseSHX(file, updateShapeFile);
      }
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: Object.values(FILE_TYPES),
  });

  return (
    <SimpleGrid columns={{ base: 1, md: 7 }} spacing={4} h="100%">
      <Flex
        {...getRootProps()}
        gridColumn="1/6"
        h="100%"
        bg="gray.50"
        border="1px dashed"
        borderColor="gray.300"
        borderRadius="md"
        alignItems="center"
        justifyContent="center"
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <Box>{t("drag_active")}</Box>
        ) : (
          <Box textAlign="center">
            {t("drop_message")}
            <br />
            <Text color="gray.500">
              {Object.values(FILE_TYPES).toString()} {t("only")}
            </Text>
          </Box>
        )}
      </Flex>
      <FilePreview />
    </SimpleGrid>
  );
}
