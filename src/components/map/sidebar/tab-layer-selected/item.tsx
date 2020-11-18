import {
  Box,
  Button,
  Image,
  Select,
  Stack,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import { GeoserverLayer } from "interfaces/naksha";
import React from "react";
import Highlight from "react-highlighter";

import {
  IconChevronDown,
  IconChevronUp,
  IconRemoveCircle
} from "../../../../components/map/icons";
import useLayerManager from "../../../../hooks/use-layer-manager";
import { useLayers } from "../../../../hooks/use-layers";
import { FALLBACK_THUMB, overflowStyle } from "../../../../static/constants";
import { getLegendUrl } from "../../../../utils/naksha";
import ItemInfo from "../tab-layer-list/item-info";

interface ItemProps {
  layer: GeoserverLayer;
  q?;
}

const Item = ({ layer, q }: ItemProps) => {
  const { geoserver } = useLayers();
  const { toggleLayer, handleOnLayerDownload } = useLayerManager();
  const { isOpen, onToggle } = useDisclosure();
  const showLegend = layer.source.type !== "grid";

  const removeLayer = () => toggleLayer(layer.id, false);

  const updateLayerStyle = e =>
    toggleLayer(layer.id, true, Number(e.target.value), false);

  return (
    <Box p={4} key={layer.id} borderBottom="1px" borderColor="gray.200">
      <Stack isInline={true} spacing={4} mb={4}>
        <Image
          borderRadius="md"
          border="1px"
          borderColor="gray.200"
          objectFit="contain"
          flexShrink={0}
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
        mb={4}
      />

      {showLegend && (
        <Select mb={4} onChange={updateLayerStyle}>
          {layer.data.styles.map((s, index) => (
            <option key={index} value={index}>
              {s.styleTitle}
            </option>
          ))}
        </Select>
      )}

      <Stack
        isInline
        spacing={4}
        justifyContent={showLegend ? "space-between" : "flex-end"}
      >
        <Button
          colorScheme="blue"
          variant="outline"
          hidden={!showLegend}
          onClick={onToggle}
          leftIcon={isOpen ? <IconChevronUp /> : <IconChevronDown />}
        >
          Legend
        </Button>
        <Button
          colorScheme="red"
          variant="outline"
          onClick={removeLayer}
          leftIcon={<IconRemoveCircle />}
        >
          Remove
        </Button>
      </Stack>
      {showLegend && isOpen && (
        <Box pt={4}>
          <Image src={getLegendUrl(layer, geoserver.endpoint)} />
        </Box>
      )}
    </Box>
  );
};

export default Item;
