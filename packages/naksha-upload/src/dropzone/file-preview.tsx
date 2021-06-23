import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useTranslation } from "@ibp/naksha-commons";
import React from "react";

import useLayerUpload from "../hooks/use-layer-upload";
import DBFIcon from "../icons/dbf";
import SHPIcon from "../icons/shp";
import SHXIcon from "../icons/shx";

const SingleFile = ({ name, icon: Icon }) => (
  <Flex
    bg="gray.50"
    mb={2}
    alignItems="center"
    p={2}
    border="1px solid"
    borderColor="gray.300"
    borderRadius="md"
  >
    <Icon /> <Box ml={3}>{name}</Box>
  </Flex>
);

export default function FilePreview() {
  const { shapeFiles, canContinue, setScreen } = useLayerUpload();
  const { t } = useTranslation();

  return (
    <Flex
      h="100%"
      gridColumn="6/8"
      direction="column"
      justifyContent="space-between"
    >
      <Box>
        <Heading as="h2" size="md" mb={2}>
          📄 {t("your_files")}
        </Heading>
        {shapeFiles.dbf.file && (
          <SingleFile name={shapeFiles.dbf.file.name} icon={DBFIcon} />
        )}
        {shapeFiles.shp.file && (
          <SingleFile name={shapeFiles.shp.file.name} icon={SHPIcon} />
        )}
        {shapeFiles.shx.file && (
          <SingleFile name={shapeFiles.shx.file.name} icon={SHXIcon} />
        )}
      </Box>
      <Button
        w="100%"
        colorScheme="blue"
        size="lg"
        disabled={!canContinue}
        onClick={() => setScreen(1)}
      >
        {t("continue")}
      </Button>
    </Flex>
  );
}
