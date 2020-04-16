import { CloseButton, IconButton } from "@chakra-ui/core";
import styled from "@emotion/styled";
import React, { useEffect } from "react";
import { MdLayers } from "react-icons/md";

import useLayerManager from "../../../hooks/use-layer-manager";
import { useLayers } from "../../../hooks/use-layers";
import SidebarTabs from "./tabs";

const TabContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 24rem;
  background: white;
  height: 100%;
  > .sidebar-tabs,
  [role="tabpanel"] {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export default function Sidebar() {
  const { ToC, geoserver } = useLayers();
  const { getGeoserverLayers } = useLayerManager();

  useEffect(() => {
    getGeoserverLayers();
  }, [geoserver]);

  return ToC.isOpen ? (
    <TabContainer>
      <CloseButton m={1} onClick={ToC.onClose} position="absolute" right="0" />
      <SidebarTabs />
    </TabContainer>
  ) : (
    <IconButton
      position="absolute"
      top={0}
      left={0}
      m={4}
      bg="white"
      size="sm"
      variant="outline"
      onClick={ToC.onOpen}
      aria-label="List Layers"
      icon={MdLayers}
    />
  );
}
