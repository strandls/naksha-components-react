import { SharedColors } from "@uifabric/fluent-theme/lib/fluent/FluentColors";
import { PrimaryButton } from "office-ui-fabric-react/lib/Button";
import { Dropdown, IDropdownOption } from "office-ui-fabric-react/lib/Dropdown";
import { Image } from "office-ui-fabric-react/lib/Image";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";
import React, { useEffect, useState } from "react";

import { ENDPOINT_GEOSERVER } from "../../../../utils/constants";

export default function LayerItem({
  item,
  layersMeta,
  getSelectedStyleByLayerName,
  setSelectedLayers,
  endpoint
}) {
  const [layerStyles, setlayerStyles] = useState([] as IDropdownOption[]);
  const [showLegend, setShowLegend] = useState(false);
  const [legendStyle, setLegendStyle] = useState();

  useEffect(() => {
    setLegendStyle(getSelectedStyleByLayerName(item.name));
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // All Style names for drtopdown
    setlayerStyles(
      Object.entries(layersMeta.get(item.name)).map(([styleName, style]) => ({
        key: styleName,
        text: style["styleTitle"]
      }))
    );
    // eslint-disable-next-line
  }, [layersMeta.get(item.name)]);

  const removeLayer = () => {
    setSelectedLayers(item, false);
  };

  return (
    <div className="layers--layer py-2" key={item.id}>
      <div className="description">
        <span className="title">{item.title}</span>
        {layerStyles.length > 0 && (
          <Dropdown
            label="Style by"
            className="mt-1"
            options={layerStyles}
            defaultSelectedKey={legendStyle}
            onChange={(e, selected = { key: "default", text: "_" }) => {
              setLegendStyle(selected["key"]);
              setSelectedLayers({ ...item, selected: selected["key"] }, true);
            }}
          />
        )}
        <PrimaryButton
          text="Remove"
          iconProps={{ iconName: "Delete" }}
          className="mt-2 float-right"
          style={{ backgroundColor: SharedColors.red10 }}
          onClick={removeLayer}
        />
        <Toggle
          defaultChecked={showLegend}
          className="mt-2"
          onText="Hide Legend"
          offText="Show Legend"
          onChange={() => {
            setShowLegend(!showLegend);
          }}
        />
        {showLegend && (
          <Image
            className="mt-1"
            src={`${endpoint + ENDPOINT_GEOSERVER}/legend/${
              item.name
            }/${legendStyle}`}
          />
        )}
      </div>
    </div>
  );
}
