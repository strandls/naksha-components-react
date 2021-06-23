import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import { useT } from "@ibp/naksha-commons";
import React from "react";

import { IconLayers, IconSettings } from "../icons";
import LayerList from "./tab-layer-list";
import LayerSelected from "./tab-layer-selected";
import LayerSettings from "./tab-layer-settings";

export default function SidebarTabs() {
  const { t } = useT();

  return (
    <Tabs className="sidebar-tabs">
      <TabList>
        <Tab>
          <IconLayers /> {t("layers")}
        </Tab>
        <Tab>
          <IconLayers /> {t("selected")}
        </Tab>
        <Tab>
          <IconSettings /> {t("settings")}
        </Tab>
      </TabList>
      <TabPanels flexGrow={1}>
        <TabPanel p={0}>
          <LayerList />
        </TabPanel>
        <TabPanel p={0}>
          <LayerSelected />
        </TabPanel>
        <TabPanel>
          <LayerSettings />
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
