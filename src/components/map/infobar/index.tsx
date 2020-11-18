import {
  Accordion,
  CloseButton,
  HStack,
  IconButton,
  Text,
  useDisclosure
} from "@chakra-ui/react";
import styled from "@emotion/styled";
import React from "react";

import { useLayers } from "../../../hooks/use-layers";
import { IconInfo } from "../icons";
import InfobarData from "./data";

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
  const { infobarData = [], layers } = useLayers();
  const { isOpen, onToggle, onClose } = useDisclosure({ defaultIsOpen: true });

  return isOpen ? (
    <TabContainer>
      <CloseButton m={1} onClick={onClose} position="absolute" right="0" />
      <HStack alignItems="center" px={4} py={2} spacing={2}>
        <IconInfo /> <Text>Information</Text>
      </HStack>
      <Accordion defaultIndex={[0]} allowMultiple={true}>
        {infobarData.map(({ properties = {}, layer }) => (
          <InfobarData
            properties={properties}
            layer={layers.find(({ id }) => id === layer.source)}
            key={layer.source}
          />
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
