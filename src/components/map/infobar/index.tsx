import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  CloseButton,
  FormControl,
  FormLabel,
  IconButton,
  Text,
  useDisclosure
} from "@chakra-ui/core";
import styled from "@emotion/styled";
import React from "react";

import { useLayers } from "../../../hooks/use-layers";
import { IconInfo } from "../icons";

const TabContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  max-width: 24rem;
  background: white;
  height: 100%;
  overflow: auto;
  z-index: 4;
  s > .sidebar-tabs,
  [role="tabpanel"] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default function InfobarPanel() {
  const { infobarData = [] } = useLayers();
  const { isOpen, onToggle, onClose } = useDisclosure(true);

  return isOpen ? (
    <TabContainer>
      <CloseButton m={1} onClick={onClose} position="absolute" right="0" />
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        {infobarData.map(({ properties = {}, layer }) => (
          <AccordionItem>
            <AccordionButton>
              <Box flex="1" textAlign="left">
                {layer?.source}
              </Box>
              <AccordionIcon />
            </AccordionButton>
            <AccordionPanel pb={4}>
              {Object.entries(properties).map(([k, v]) => (
                <FormControl key={k} mb={4}>
                  <FormLabel fontSize="sm" htmlFor={k} color="gray.500">
                    {k}
                  </FormLabel>
                  <Text id={k}>{v}</Text>
                </FormControl>
              ))}
            </AccordionPanel>
          </AccordionItem>
        ))}
      </Accordion>
    </TabContainer>
  ) : (
    <IconButton
      position="absolute"
      top={136}
      right={0}
      m={2}
      bg="white"
      size="sm"
      variant="outline"
      onClick={onToggle}
      aria-label="List Layers"
      icon={<IconInfo />}
    />
  );
}
