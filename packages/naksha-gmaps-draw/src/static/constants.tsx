export const GMAP_FEATURE_TYPES = {
  POINT: "Point",
  POLYGON: "Polygon",
  LINESTRING: "LineString",
  RECTANGLE: "Rectangle",
  NONE: null,
};

export const GMAP_OPTIONS = {
  mapTypeControlOptions: {
    position: (window as any).google?.maps?.ControlPosition?.BOTTOM_LEFT,
  },
};
