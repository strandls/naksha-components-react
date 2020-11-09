import { Box, Checkbox, Image, Spinner, Stack, Text } from "@chakra-ui/core";
import { GeoserverLayer } from "interfaces/naksha";
import React, { memo } from "react";
import { useState } from "react";
import Highlight from "react-highlighter";
import { areEqual } from "react-window";

import useLayerManager from "../../../../hooks/use-layer-manager";
import { FALLBACK_THUMB, overflowStyle } from "../../../../static/constants";
import ItemInfo from "./item-info";

interface ItemProps {
  data: { q?; data: GeoserverLayer[] };
  index;
  style;
}

const Item = memo<ItemProps>(({ data: { q = "", data }, index, style }) => {
  const { toggleLayer, handleOnLayerDownload } = useLayerManager();
  const [isLoading, setIsLoading] = useState(false);
  const layer = data[index];

  const handleOnChange = async e => {
    setIsLoading(true);
    await toggleLayer(layer.id, e?.target?.checked);
    setIsLoading(false);
  };

  return (
    <Stack
      spacing={1}
      key={layer.id}
      style={style}
      p={4}
      borderBottom="1px"
      borderColor="gray.200"
    >
      <Stack isInline={true} spacing={3} mb={1}>
        <Box minW="1.3rem">
          {isLoading ? (
            <Spinner emptyColor="gray.200" color="blue.500" size="md" />
          ) : (
            <Checkbox
              size="lg"
              isChecked={layer.isAdded}
              onChange={handleOnChange}
            />
          )}
        </Box>
        <Image
          borderRadius="md"
          border="1px"
          borderColor="gray.200"
          objectFit="contain"
          flexShrink={0}
          p={1}
          boxSize="4.5rem"
          src={layer.thumbnail}
          fallbackSrc={FALLBACK_THUMB}
        />
        <div>
          <Text mb={1}>
            <Highlight search={q}>{layer.title}</Highlight>
          </Text>
          <Box
            fontSize="sm"
            color="gray.600"
            style={overflowStyle}
            title={layer.description}
          >
            {layer.description}
          </Box>
        </div>
      </Stack>
      <ItemInfo
        layer={layer}
        onDownload={() => handleOnLayerDownload(layer.id)}
      />
    </Stack>
  );
}, areEqual);

export default Item;
