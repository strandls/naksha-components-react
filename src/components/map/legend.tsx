import { Box, Divider, Stack } from "@chakra-ui/core";
import React from "react";
import { MdFiberManualRecord } from "react-icons/md";

import { useLayers } from "../../hooks/use-layers";

export default function Legend() {
  const {
    legend: { visible, stops, squareSize }
  } = useLayers();

  return visible ? (
    <Box
      m={4}
      mb={8}
      p={1}
      position="absolute"
      right={0}
      bottom={0}
      bg="white"
      borderRadius="md"
      fontSize="xs"
    >
      {stops.map(([stop, color], index, stopsArr) => {
        const prevStop = (stopsArr[index - 1] || [0])[0];
        return (
          <Stack
            isInline={true}
            hidden={prevStop === stop}
            key={index}
            alignItems="center"
          >
            <Box
              display="inline"
              fontSize="lg"
              as={MdFiberManualRecord}
              color={color}
            />
            <span>
              {prevStop} - {stop}
            </span>
          </Stack>
        );
      })}
      <Divider my={1} />
      <div>
        1 Square = {squareSize} x {squareSize} km
      </div>
    </Box>
  ) : null;
}
