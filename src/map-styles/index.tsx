import { fromJS } from "immutable";

import MAP_STYLE_BASIC from "./map-style-basic-v8.json";
import MAP_STYLE_SATELLITE from "./map-style-satellite-v11.json";
import MAP_STYLE_STREETS from "./map-style-streets-v11.json";

export const STYLES = [
  {
    text: "Basic",
    key: "MAP_BASIC",
    style: fromJS(MAP_STYLE_BASIC)
  },
  {
    text: "Streets",
    key: "MAP_STREETS",
    style: fromJS(MAP_STYLE_STREETS)
  },
  {
    text: "Satellite",
    key: "MAP_SATELLITE",
    style: fromJS(MAP_STYLE_SATELLITE)
  }
];
