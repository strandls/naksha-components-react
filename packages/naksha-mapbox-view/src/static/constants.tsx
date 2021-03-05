export const featureStyle: any = {
  id: "data",
  type: "fill",
  paint: {
    "fill-color": "#f03b20",
    "fill-opacity": 0.2,
  },
};

export const pointStyle: any = {
  type: "circle",
  paint: {
    "circle-radius": 8,
    "circle-color": "#f03b20",
    "circle-opacity": 0.8,
  },
  filter: ["==", ["geometry-type"], "Point"],
};
