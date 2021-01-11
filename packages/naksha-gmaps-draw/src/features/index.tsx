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
      {data &&
        data.map((feature) => {
          switch (feature?.type) {
            case "Point":
              return (
                <NakshaPoint
                  key={feature.coordinates.toString()}
                  coordinates={feature.coordinates}
                />
              );

            case "Polygon":
              return (
                <NakshaPolygon
                  key={feature.coordinates.toString()}
                  coordinates={feature.coordinates}
                />
              );

            default:
              console.warn(
                "Unknown data type was supplied to <NakshaFeatures/>"
              );
              return <Fragment key={-1} />;
          }
        })}
    </>
  );
}
