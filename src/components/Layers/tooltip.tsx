import React from "react";

export default function Tooltip({ hoveredFeature, x, y }) {
  return hoveredFeature ? (
    <div className="tooltip" style={{ left: x, top: y }}>
      <pre>{JSON.stringify(hoveredFeature.properties, null, 2)}</pre>
    </div>
  ) : null;
}
