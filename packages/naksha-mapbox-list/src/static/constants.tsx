import { BaseLayer, defaultViewPort } from "@ibp/naksha-commons";
import { CSSProperties } from "react";

import { NakshaMapboxListProps } from "../interfaces";

export const defaultNakshaProps: NakshaMapboxListProps = {
  viewPort: defaultViewPort,

  loadToC: false,
  showToC: false,

  mapboxApiAccessToken: "pk.xxx",
  nakshaApiEndpoint: "/naksha-api/api",
  geoserver: { endpoint: "/geoserver", workspace: "biodiv", store: "ibp" },

  baseLayer: BaseLayer.MAP_STREETS,
  layers: [],
  selectedLayers: [],
  markers: [],
};

export const overflowStyle: CSSProperties = {
  display: "-webkit-box",
  WebkitLineClamp: 2,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const overflowStyle1: CSSProperties = {
  ...overflowStyle,
  WebkitLineClamp: 1,
};

export const HL = {
  PAINT: {
    Polygon: {
      "fill-outline-color": "red",
      "fill-color": "transparent",
      "fill-opacity": 0.8,
    },
    Point: {
      "circle-stroke-color": "red",
      "circle-stroke-width": 1,
      "circle-opacity": 0,
    },
  },
  PREFIX: "highlight-",
};

export const LAYER_PREFIX = "lyr_";
export const LAYER_PREFIX_GRID = "grid_lyr_";
export const FEATURE_PROP = "ogc_fid";
export const FALLBACK_THUMB =
  "data:image/svg+xml,%3Csvg fill='none' xmlns='http://www.w3.org/2000/svg' viewBox='0 0 72 72'%3E%3Cpath fill='%23fff' d='M0 0h72v72H0z'/%3E%3Cpath d='M35.981 48.293l-13.853-10.77-3.045 2.368L36 53.048l16.917-13.157-3.064-2.387-13.872 10.789zM36 43.519l13.834-10.77 3.083-2.388L36 17.204 19.083 30.36l3.064 2.387L36 43.518z' fill='%23A0AEC0'/%3E%3C/svg%3E";
