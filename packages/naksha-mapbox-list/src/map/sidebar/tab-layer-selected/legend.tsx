import { Box, HStack } from "@chakra-ui/react";
import React, { useMemo } from "react";

import { IconCircle } from "../../icons";

export default function Legend({ layer }) {
  const legendStyles = useMemo(
    () =>
      layer?.data?.styles?.[layer.data.styleIndex]?.colors?.paint?.[
        "fill-color"
      ]?.stops || [],
    [layer]
  );

  return (
    <Box pt={4} fontSize="sm">
      {legendStyles.map(([title, color]) => (
        <HStack key={color}>
          <IconCircle color={color} /> <span>{title}</span>
        </HStack>
      ))}
    </Box>
  );
}
