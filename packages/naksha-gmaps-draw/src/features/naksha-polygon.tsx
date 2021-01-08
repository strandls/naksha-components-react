import { Polygon } from "@react-google-maps/api";
import React, { useMemo } from "react";

export default function NakshaPolygon({ data }) {
  const paths = useMemo(
    () => data.geometry.coordinates[0].map(([lat, lng]) => ({ lat, lng })),
    [data]
  );

  return <Polygon paths={paths} />;
}
