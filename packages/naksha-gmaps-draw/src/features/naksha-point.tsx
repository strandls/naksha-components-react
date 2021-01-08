import { Marker } from "@react-google-maps/api";
import React from "react";

export default function NakshaPoint({ coordinates }) {
  const [lng, lat] = coordinates;

  return <Marker position={{ lat, lng }} />;
}
