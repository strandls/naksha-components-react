import { Polygon } from "@react-google-maps/api";
import React, { useMemo } from "react";

export default function NakshaPolygon({ coordinates }) {
  const paths = useMemo(
    () => coordinates.map((co) => co.map(([lng, lat]) => ({ lat, lng }))),
    [coordinates]
  );

  return <Polygon paths={paths} />;
}
