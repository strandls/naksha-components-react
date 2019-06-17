import { Dropdown } from "office-ui-fabric-react/lib/Dropdown";
import {
  FocusZone,
  FocusZoneDirection
} from "office-ui-fabric-react/lib/FocusZone";
import { List } from "office-ui-fabric-react/lib/List";
import { Pivot, PivotItem } from "office-ui-fabric-react/lib/Pivot";
import { SearchBox } from "office-ui-fabric-react/lib/SearchBox";
import React, { useEffect, useState } from "react";

import { STYLES } from "../../../../map-styles";
import LayerItem from "./layer-item";
import LayerItemSelected from "./layer-item-selected";

export default function PivotComponent({
  layers,
  layersMeta,
  onMapStyleChange,
  mapStyleIndex,
  getSelectedStyleByLayerName,
  selectedLayersNames,
  setSelectedLayers,
  endpoint
}) {
  const [LItems, setLItems] = useState([]);

  useEffect(() => {
    onFilter();
    // eslint-disable-next-line
  }, [layers]);

  const onFilter = (event?, text = "") => {
    setLItems(
      text
        ? layers.filter(
            i => i.title.toLowerCase().indexOf(text.toLowerCase()) > -1
          )
        : layers
    );
  };

  const onTabChanged = item => {
    if (item) {
      if (item.props.headerText === "Layers") {
        onFilter();
      }
    }
  };

  return (
    <Pivot onLinkClick={onTabChanged}>
      <PivotItem
        className="p-2"
        headerText="Layers"
        itemCount={layers.length}
        itemKey={"layers"}
        itemIcon="Boards"
      >
        <FocusZone direction={FocusZoneDirection.vertical}>
          <SearchBox
            placeholder="Filter by Layer Name"
            iconProps={{ iconName: "Filter" }}
            onChange={onFilter}
          />
          <List
            items={LItems}
            onRenderCell={item => (
              <LayerItem
                item={item}
                endpoint={endpoint}
                selectedLayersNames={selectedLayersNames}
                setSelectedLayers={setSelectedLayers}
              />
            )}
          />
        </FocusZone>
      </PivotItem>

      <PivotItem
        className="p-2"
        headerText="Selected"
        itemCount={selectedLayersNames.length}
        itemIcon="Boards"
      >
        <List
          items={layers.filter(i => selectedLayersNames.includes(i["name"]))}
          onRenderCell={item => (
            <LayerItemSelected
              item={item}
              endpoint={endpoint}
              layersMeta={layersMeta}
              getSelectedStyleByLayerName={getSelectedStyleByLayerName}
              setSelectedLayers={setSelectedLayers}
            />
          )}
        />
      </PivotItem>

      <PivotItem className="p-2" headerText="Settings" itemIcon="Settings">
        <Dropdown
          label="Map Layer"
          options={STYLES}
          defaultSelectedKey={STYLES[mapStyleIndex].key}
          onChange={onMapStyleChange}
        />
      </PivotItem>
    </Pivot>
  );
}
