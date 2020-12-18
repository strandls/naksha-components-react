import { Box, Flex, SimpleGrid, Text } from "@chakra-ui/react";
import React from "react";
import { useDropzone } from "react-dropzone";

import { FILE_TYPES } from "../../../static/layer-upload";
import { parseDBF, parseSHP, parseSHX } from "../../../utils/shapefile";
import useLayerUpload from "../use-layer-upload";
import FilePreview from "./file-preview";

export default function LayerUploadDropzone() {
  const { updateShapeFile } = useLayerUpload();

  const onDrop = files => {
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
    accept: Object.values(FILE_TYPES)
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
          <Box>Drop the files here...</Box>
        ) : (
          <Box textAlign="center">
            Drag 'n' drop some files here, or click to select files
            <br />
            <Text color="gray.500">
              Only {Object.values(FILE_TYPES).toString()} are allowed
            </Text>
          </Box>
        )}
      </Flex>
      <FilePreview />
    </SimpleGrid>
  );
}
