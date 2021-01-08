import React, { Fragment } from "react";

import NakshaPoint from "./naksha-point";
import NakshaPolygon from "./naksha-polygon";

/**
 * Render feature(s) from GeoJSON
 * by transforming them into what google maps components understand
 *
 * @export
 * @param {*} { data }
 * @return {*}
 */
export default function NakshaFeatures({ data }) {
  return (
    <>
      {data.map((feature) => {
        switch (feature?.geometry?.type) {
          case "Point":
            return <NakshaPoint key={feature.properties.id} data={feature} />;

          case "Polygon":
            return <NakshaPolygon key={feature.properties.id} data={feature} />;

          default:
            console.warn("Unknown data type was supplied to <NakshaFeatures/>");
            return <Fragment key={-1} />;
        }
      })}
    </>
  );
}
