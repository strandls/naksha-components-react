import { Box, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/core";
import React from "react";
import { MdLayers, MdTune } from "react-icons/md";

import LayerList from "./tab-layer-list";
import LayerSelected from "./tab-layer-selected";
import LayerSettings from "./tab-layer-settings";

const LayerTitle = ({ icon }) => <Box mr={1} as={icon} />;

export default function SidebarTabs() {
  return (
    <Tabs className="sidebar-tabs">
      <TabList>
        <Tab>
          <LayerTitle icon={MdLayers} /> Layers
        </Tab>
        <Tab>
          <LayerTitle icon={MdLayers} /> Selected
        </Tab>
        <Tab>
          <LayerTitle icon={MdTune} /> Settings
        </Tab>
      </TabList>
      <TabPanels flexGrow={1}>
        <TabPanel>
          <LayerList />
        </TabPanel>
        <TabPanel>
          <LayerSelected />
        </TabPanel>
        <TabPanel>
          <LayerSettings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
