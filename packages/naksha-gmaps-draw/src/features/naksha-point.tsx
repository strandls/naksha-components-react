import { Marker } from "@react-google-maps/api";
import React from "react";

export default function NakshaPoint({ data }) {
  const [lat, lng] = data.geometry.coordinates;

  return <Marker position={{ lat, lng }} />;
}
