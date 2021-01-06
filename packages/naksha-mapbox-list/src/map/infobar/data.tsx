import {
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  FormControl,
  FormLabel,
  Text,
} from "@chakra-ui/react";
import React from "react";

export default function InfobarData({ properties, layer }) {
  return (
    <AccordionItem>
      <AccordionButton bg="gray.50">
        <Box flex="1" textAlign="left" fontWeight="bold">
          {layer?.title}
        </Box>
        <AccordionIcon />
      </AccordionButton>
      <AccordionPanel p={0}>
        {Object.entries(layer?.data?.propertyMap).map(([k, v]: any) => (
          <FormControl
            key={k}
            px={4}
            py={2}
            borderBottom="1px"
            borderColor="gray.300"
          >
            <FormLabel htmlFor={k} color="gray.500" m={0}>
              {v}
            </FormLabel>
            <Text id={k}>{properties[k]}</Text>
          </FormControl>
        ))}
      </AccordionPanel>
    </AccordionItem>
  );
}
