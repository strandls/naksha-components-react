import { Depths } from "@uifabric/fluent-theme";
import { If } from "control-statements";
import React, { useEffect, useState } from "react";

import { InfobarClosed, InfobarOpened } from "./extras/infobar-buttons";
import InfoItem from "./info-item";

export default function InfoPanel({
  highlightLayers,
  isInfobar,
  setIsInfobar
}) {
  const [filteredLayers, setFilteredLayers] = useState([] as any);

  useEffect(() => {
    const layers: string[] = [];
    setFilteredLayers(
      highlightLayers.filter(f => {
        if (!layers.includes(f.title)) {
          layers.push(f.title);
          return true;
        }
        return false;
      })
    );
  }, [highlightLayers]);

  const toggleInfobar = () => {
    setIsInfobar(!isInfobar);
  };

  return (
    <>
      <If condition={filteredLayers.length > 0}>
        <InfobarClosed isInfobar={isInfobar} toggleInfobar={toggleInfobar} />
        <If condition={isInfobar}>
          <div className="info-panel" style={{ boxShadow: Depths.depth64 }}>
            <div className="content">
              <InfobarOpened toggleInfobar={toggleInfobar} />
              <h2 className="title">Information</h2>
              {filteredLayers.map((f, index) => (
                <InfoItem key={f.name + f.featureId} f={f} index={index} />
              ))}
            </div>
          </div>
        </If>
      </If>
    </>
  );
}
